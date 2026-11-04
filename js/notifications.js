"use strict";

(() => {
    const POLL_INTERVAL = 15000;
    const listUrl = "../backend/api/notifications/index.php";
    const markUrl = "../backend/api/notifications/mark-read.php";
    const button = document.getElementById("notificationButton");
    const badge = document.getElementById("notificationCount");
    const panel = document.getElementById("notificationPanel");
    const closeButton = document.getElementById("closeNotifications");
    const summary = document.getElementById("notificationSummary");
    const loading = document.getElementById("notificationLoading");
    const empty = document.getElementById("emptyNotifications");
    const list = document.getElementById("notificationList");
    const errorBox = document.getElementById("notificationError");
    const errorMessage = document.getElementById("notificationErrorMessage");
    const retryButton = document.getElementById("retryNotifications");
    const markAllButton = document.getElementById("markAllNotifications");
    const newerButton = document.getElementById("newerNotifications");
    const olderButton = document.getElementById("olderNotifications");

    let before = null;
    let nextBefore = null;
    let unreadCount = 0;
    let loaded = false;
    let marking = false;
    let inFlight = null;
    let pollTimer = null;
    let lastItems = "";

    function showError(message) {
        errorMessage.textContent = message;
        errorBox.hidden = false;
    }

    function updateBadge(count) {
        unreadCount = count;
        badge.textContent = count > 99 ? "99+" : String(count);
        button.setAttribute(
            "aria-label",
            count ? `عرض التنبيهات، ${count} غير مقروء` : "عرض التنبيهات، لا توجد تنبيهات غير مقروءة"
        );
        summary.textContent = count ? `${count} تنبيه غير مقروء` : "كل التنبيهات مقروءة";
        markAllButton.hidden = count === 0;
        markAllButton.disabled = marking;
    }

    function renderNotification(item) {
        const row = document.createElement("li");
        row.className = "notification-item";
        row.classList.toggle("is-unread", !item.isRead);

        const header = document.createElement("div");
        header.className = "notification-item-header";
        const title = document.createElement("strong");
        title.textContent = item.title;
        const readState = document.createElement("span");
        readState.className = "notification-read-state";
        readState.textContent = item.isRead ? "مقروء" : "غير مقروء";
        header.append(title, readState);

        const message = document.createElement("p");
        message.textContent = item.message;

        const footer = document.createElement("div");
        footer.className = "notification-item-footer";
        const time = document.createElement("time");
        const date = new Date(item.createdAt * 1000);
        if (Number.isFinite(date.getTime())) {
            time.dateTime = date.toISOString();
            time.textContent = new Intl.DateTimeFormat("ar-SA", {
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "numeric",
                minute: "2-digit"
            }).format(date);
        } else {
            time.textContent = "الوقت غير متاح";
        }
        footer.append(time);

        if (!item.isRead) {
            const markButton = document.createElement("button");
            markButton.type = "button";
            markButton.className = "notification-read-button";
            markButton.textContent = "تحديد كمقروء";
            markButton.disabled = marking;
            markButton.addEventListener("click", () => { void markRead({ id: item.id }); });
            footer.append(markButton);
        }

        row.append(header, message, footer);
        return row;
    }

    async function refreshNotifications() {
        if (inFlight) return inFlight;

        const requestedBefore = before;
        const task = (async () => {
            try {
                const url = new URL(listUrl, location.href);
                if (requestedBefore !== null) url.searchParams.set("before", String(requestedBefore));
                const response = await fetch(url, {
                    credentials: "include",
                    cache: "no-store",
                    headers: { Accept: "application/json" }
                });
                const data = await response.json();

                if (response.status === 401) {
                    showError("انتهت الجلسة. سجل الدخول لعرض التنبيهات.");
                    void SFLoader.navigate("login.html", { replace: true });
                    return false;
                }
                if (!response.ok || !data.success) {
                    throw new Error(data.message || "تعذر تحميل التنبيهات.");
                }
                if (!Array.isArray(data.notifications) ||
                    !Number.isInteger(data.unreadCount) || data.unreadCount < 0 ||
                    (data.nextBefore !== null && !Number.isInteger(data.nextBefore))) {
                    throw new Error("استجابة التنبيهات غير صحيحة.");
                }

                loaded = true;
                loading.hidden = true;
                errorBox.hidden = true;
                updateBadge(data.unreadCount);
                nextBefore = data.nextBefore;
                newerButton.hidden = requestedBefore === null;
                olderButton.hidden = nextBefore === null;

                const signature = JSON.stringify([requestedBefore, data.notifications]);
                if (signature !== lastItems) {
                    list.replaceChildren(...data.notifications.map(renderNotification));
                    lastItems = signature;
                }
                empty.hidden = data.notifications.length !== 0 || requestedBefore !== null;
                return true;
            } catch (error) {
                console.error("Unable to load notifications:", error);
                loading.hidden = true;
                showError(error instanceof Error && !(error instanceof TypeError) && !(error instanceof SyntaxError)
                    ? error.message
                    : "تعذر تحميل التنبيهات. تحقق من الاتصال وأعد المحاولة.");
                if (!loaded) summary.textContent = "تعذر تحميل التنبيهات";
                return false;
            }
        })();

        inFlight = task;
        try {
            return await task;
        } finally {
            if (inFlight === task) inFlight = null;
        }
    }

    async function markRead(body) {
        if (marking) return;
        marking = true;
        markAllButton.disabled = true;
        list.querySelectorAll("button").forEach(item => { item.disabled = true; });

        try {
            if (inFlight) await inFlight;
            const response = await fetch(markUrl, {
                method: "POST",
                credentials: "include",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            });
            const data = await response.json();
            if (!response.ok || !data.success) {
                throw new Error(data.message || "تعذر تحديث التنبيهات.");
            }
            await refreshNotifications();
        } catch (error) {
            console.error("Unable to mark notifications as read:", error);
            showError(error instanceof Error && !(error instanceof TypeError) && !(error instanceof SyntaxError)
                ? error.message
                : "تعذر تأكيد تحديث التنبيهات. تحقق من الاتصال وأعد المحاولة.");
        } finally {
            marking = false;
            markAllButton.disabled = unreadCount === 0;
            list.querySelectorAll("button").forEach(item => { item.disabled = false; });
        }
    }

    async function changePage(target) {
        if (inFlight) await inFlight;
        const previous = before;
        before = target;
        if (!await refreshNotifications()) before = previous;
    }

    function openPanel() {
        panel.inert = false;
        panel.setAttribute("aria-hidden", "false");
        panel.classList.add("open");
        button.setAttribute("aria-expanded", "true");
        closeButton.focus();
        void refreshNotifications();
    }

    function closePanel() {
        panel.classList.remove("open");
        panel.inert = true;
        panel.setAttribute("aria-hidden", "true");
        button.setAttribute("aria-expanded", "false");
        button.focus();
    }

    function startPolling() {
        if (pollTimer !== null) return;
        pollTimer = setInterval(() => {
            if (!document.hidden && !marking) void refreshNotifications();
        }, POLL_INTERVAL);
    }

    button.addEventListener("click", openPanel);
    closeButton.addEventListener("click", closePanel);
    retryButton.addEventListener("click", () => { void refreshNotifications(); });
    markAllButton.addEventListener("click", () => { void markRead({ all: true }); });
    newerButton.addEventListener("click", () => { void changePage(null); });
    olderButton.addEventListener("click", () => {
        if (nextBefore !== null) void changePage(nextBefore);
    });
    document.addEventListener("keydown", event => {
        if (event.key === "Escape" && panel.classList.contains("open")) closePanel();
    });
    document.addEventListener("visibilitychange", () => {
        if (!document.hidden) void refreshNotifications();
    });
    window.addEventListener("online", () => { void refreshNotifications(); });
    window.addEventListener("pagehide", () => {
        clearInterval(pollTimer);
        pollTimer = null;
    });
    window.addEventListener("pageshow", event => {
        if (event.persisted) {
            startPolling();
            void refreshNotifications();
        }
    });

    startPolling();
    void refreshNotifications();
})();
