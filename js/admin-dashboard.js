"use strict";


/* ======================================================
   DEMO DATA

   لاحقاً سيتم استبدال هذه البيانات بطلب API من MySQL.
====================================================== */

const reports = [

    {
        id: 208,

        type: "found",

        userName: "عباده الجهني",

        phone: "0501234567",

        email: "obadah@example.com",

        category: "إلكترونيات",

        itemType: "جوال",

        brand: "Apple",

        model: "غير معروف",

        primaryColor: "أسود",

        secondaryColor: "لا يوجد",

        description:
            "جوال أسود عليه كفر شفاف وفي الزاوية خدش بسيط.",

        distinctiveMarks:
            "يوجد كسر صغير جداً قريب من الكاميرا.",

        region: "ينبع البحر",

        neighborhood: "حي البندر",

        latitude: "24.0891234",

        longitude: "38.0618452",

        accuracy: 7,

        locationDescription:
            "مواقف بالقرب من أحد المحلات.",

        date: "2026-09-27",

        time: "08:40",

        status: "strong-match",

        bestMatch: 96,

        adminNote: "",

        matches: [

            {
                reportId: 184,

                name: "محمد عبدالله",

                title:
                    "iPhone 16 Pro Max أسود",

                region:
                    "ينبع البحر - حي البندر",

                date:
                    "2026-09-25",

                score: 96,

                analysis: {
                    category: 100,
                    type: 100,
                    brand: 100,
                    color: 100,
                    location: 95,
                    date: 90,
                    description: 88,
                    image: 92
                }
            },

            {
                reportId: 177,

                name: "خالد الجهني",

                title:
                    "iPhone 15 Pro أسود",

                region:
                    "ينبع البحر - حي الصريف",

                date:
                    "2026-09-26",

                score: 83,

                analysis: {
                    category: 100,
                    type: 100,
                    brand: 100,
                    color: 100,
                    location: 72,
                    date: 94,
                    description: 79,
                    image: 71
                }
            },

            {
                reportId: 163,

                name: "سعد الحربي",

                title:
                    "جوال Apple أسود",

                region:
                    "ينبع الصناعية",

                date:
                    "2026-09-25",

                score: 71,

                analysis: {
                    category: 100,
                    type: 100,
                    brand: 100,
                    color: 100,
                    location: 31,
                    date: 85,
                    description: 65,
                    image: 55
                }
            }

        ]
    },


    {
        id: 207,

        type: "lost",

        userName: "محمد عبدالله",

        phone: "0551112233",

        email: "mohammed@example.com",

        category: "إلكترونيات",

        itemType: "جوال",

        brand: "Apple",

        model: "iPhone 16 Pro Max",

        primaryColor: "أسود",

        secondaryColor: "لا يوجد",

        description:
            "ايفون أسود كفر شفاف، يوجد خدش بسيط.",

        distinctiveMarks:
            "كسر صغير بجانب عدسة الكاميرا.",

        region: "ينبع البحر",

        neighborhood: "حي البندر",

        latitude: "24.0894000",

        longitude: "38.0621000",

        accuracy: 12,

        locationDescription:
            "قرب مواقف المحلات.",

        date: "2026-09-25",

        time: "20:20",

        status: "contact",

        bestMatch: 96,

        adminNote:
            "التطابق مع البلاغ 208 قوي جداً.",

        matches: [

            {
                reportId: 208,

                name: "عباده الجهني",

                title:
                    "جوال Apple أسود معثور عليه",

                region:
                    "ينبع البحر - حي البندر",

                date:
                    "2026-09-27",

                score: 96,

                analysis: {
                    category: 100,
                    type: 100,
                    brand: 100,
                    color: 100,
                    location: 95,
                    date: 90,
                    description: 88,
                    image: 92
                }
            }

        ]
    },


    {
        id: 206,

        type: "lost",

        userName: "أحمد الحربي",

        phone: "0569001122",

        email: "",

        category: "حيوانات",

        itemType: "طائر",

        brand: "بادجي",

        model: "غير محدد",

        primaryColor: "أزرق",

        secondaryColor: "أبيض",

        description:
            "بادجي أزرق وأبيض صغير ومتعود على الناس.",

        distinctiveMarks:
            "حلقة صغيرة في الرجل.",

        region: "ينبع الصناعية",

        neighborhood: "حي الفيصل",

        latitude: null,

        longitude: null,

        accuracy: null,

        locationDescription:
            "قرب المنزل.",

        date: "2026-09-26",

        time: "16:00",

        status: "new",

        bestMatch: 88,

        adminNote: "",

        matches: [

            {
                reportId: 199,

                name: "ناصر الشريف",

                title:
                    "طائر بادجي أزرق معثور",

                region:
                    "ينبع الصناعية",

                date:
                    "2026-09-26",

                score: 88,

                analysis: {
                    category: 100,
                    type: 100,
                    brand: 100,
                    color: 92,
                    location: 88,
                    date: 100,
                    description: 80,
                    image: 75
                }
            }

        ]
    },


    {
        id: 205,

        type: "found",

        userName: "فهد العتيبي",

        phone: "0532221188",

        email: "",

        category: "مفاتيح",

        itemType: "مفتاح سيارة",

        brand: "Toyota",

        model: "غير معروف",

        primaryColor: "أسود",

        secondaryColor: "فضي",

        description:
            "مفتاح سيارة مع تعليقة سوداء.",

        distinctiveMarks:
            "يوجد خدش على التعليقة.",

        region: "ينبع البحر",

        neighborhood: "حي الصريف",

        latitude: null,

        longitude: null,

        accuracy: null,

        locationDescription:
            "قرب ممشى الحي.",

        date: "2026-09-27",

        time: "06:40",

        status: "review",

        bestMatch: 64,

        adminNote: "",

        matches: [

            {
                reportId: 191,

                name: "عبدالله سالم",

                title:
                    "مفتاح تويوتا",

                region:
                    "ينبع البحر",

                date:
                    "2026-09-24",

                score: 64,

                analysis: {
                    category: 100,
                    type: 100,
                    brand: 80,
                    color: 90,
                    location: 64,
                    date: 58,
                    description: 50,
                    image: 0
                }
            }

        ]
    },


    {
        id: 204,

        type: "lost",

        userName: "سارة محمد",

        phone: "0540007788",

        email: "sara@example.com",

        category: "محافظ وحقائب",

        itemType: "محفظة",

        brand: "غير محدد",

        model: "غير محدد",

        primaryColor: "بني",

        secondaryColor: "ذهبي",

        description:
            "محفظة جلدية صغيرة بنية.",

        distinctiveMarks:
            "يوجد حرف S صغير داخلها.",

        region: "ينبع البحر",

        neighborhood: "حي الشاطئ",

        latitude: null,

        longitude: null,

        accuracy: null,

        locationDescription:
            "قرب أحد المقاهي.",

        date: "2026-09-24",

        time: "21:30",

        status: "verification",

        bestMatch: 91,

        adminNote:
            "تم التواصل مع الطرفين.",

        matches: [

            {
                reportId: 194,

                name: "ريم الجهني",

                title:
                    "محفظة بنية معثور عليها",

                region:
                    "ينبع البحر - حي الشاطئ",

                date:
                    "2026-09-25",

                score: 91,

                analysis: {
                    category: 100,
                    type: 100,
                    brand: 50,
                    color: 100,
                    location: 96,
                    date: 96,
                    description: 91,
                    image: 87
                }
            }

        ]
    },


    {
        id: 203,

        type: "found",

        userName: "راشد الجهني",

        phone: "0508899221",

        email: "",

        category: "أوراق ومستندات",

        itemType: "بطاقة بنكية",

        brand: "غير محدد",

        model: "غير محدد",

        primaryColor: "أزرق",

        secondaryColor: null,

        description:
            "بطاقة بنكية تم العثور عليها.",

        distinctiveMarks:
            "المعلومات مخفية عن العامة.",

        region: "ينبع الصناعية",

        neighborhood: "حي خالد",

        latitude: null,

        longitude: null,

        accuracy: null,

        locationDescription:
            "بالقرب من متجر.",

        date: "2026-09-25",

        time: "14:10",

        status: "completed",

        bestMatch: 99,

        adminNote:
            "تم التسليم لصاحب البطاقة.",

        matches: []

    }

];


/* ======================================================
   STATE
====================================================== */

let currentTypeFilter =
    "all";


let currentStatusFilter =
    "all";


let searchValue =
    "";


/* ======================================================
   STATUS LABELS
====================================================== */

const statusLabels = {

    "new":
        "جديد",

    "review":
        "قيد المراجعة",

    "strong-match":
        "تطابق قوي",

    "contact":
        "بانتظار التواصل",

    "verification":
        "جاري التحقق",

    "completed":
        "تم التسليم"

};


/* ======================================================
   INITIALIZE
====================================================== */

renderDashboard();


/* ======================================================
   MAIN RENDER
====================================================== */

function renderDashboard() {

    renderStatistics();

    renderTopMatches();

    renderReports();

    renderSidebarCounts();

}


/* ======================================================
   STATISTICS
====================================================== */

function renderStatistics() {

    const lost =
        reports.filter(
            report =>
                report.type === "lost"
        ).length;


    const found =
        reports.filter(
            report =>
                report.type === "found"
        ).length;


    const strong =
        reports.filter(
            report =>
                report.bestMatch >= 85 &&
                report.status !== "completed"
        ).length;


    const completed =
        reports.filter(
            report =>
                report.status === "completed"
        ).length;


    document
        .getElementById(
            "lostCount"
        )
        .textContent =
        lost;


    document
        .getElementById(
            "foundCount"
        )
        .textContent =
        found;


    document
        .getElementById(
            "strongMatchCount"
        )
        .textContent =
        strong;


    document
        .getElementById(
            "completedCount"
        )
        .textContent =
        completed;

}


/* ======================================================
   SIDEBAR COUNTS
====================================================== */

function renderSidebarCounts() {

    const strong =
        reports.filter(
            report =>
                report.bestMatch >= 85 &&
                report.status !== "completed"
        ).length;


    const newReports =
        reports.filter(
            report =>
                report.status === "new"
        ).length;


    document
        .getElementById(
            "strongMatchNavCount"
        )
        .textContent =
        strong;


    document
        .getElementById(
            "newReportsNavCount"
        )
        .textContent =
        newReports;

}


/* ======================================================
   TOP MATCHES
====================================================== */

function renderTopMatches() {

    const container =
        document.getElementById(
            "topMatchesGrid"
        );


    const topReports =
        [...reports]

            .filter(
                report =>
                    report.bestMatch >= 70 &&
                    report.matches.length > 0 &&
                    report.status !== "completed"
            )

            .sort(
                (a, b) =>
                    b.bestMatch -
                    a.bestMatch
            )

            .slice(
                0,
                3
            );


    container.innerHTML =
        topReports.map(
            report => {

                const match =
                    report.matches[0];


                return `

                    <article
                        class="top-match-card"
                        data-report-id="${report.id}"
                    >

                        <div class="match-card-top">

                            <span class="match-percent">
                                ${report.bestMatch}%
                            </span>

                            <span class="match-strength">
                                ${getMatchStrength(report.bestMatch)}
                            </span>

                        </div>


                        <h3>
                            ${escapeHTML(report.itemType)}
                            -
                            ${escapeHTML(report.primaryColor)}
                        </h3>


                        <p>
                            بلاغ #${report.id}
                            يتطابق مع بلاغ
                            #${match.reportId}
                            الخاص بـ
                            ${escapeHTML(match.name)}
                        </p>


                        <div class="match-progress">

                            <div
                                style="width:${report.bestMatch}%"
                            ></div>

                        </div>

                    </article>

                `;

            }
        ).join("");


    container
        .querySelectorAll(
            ".top-match-card"
        )
        .forEach(
            card => {

                card.addEventListener(
                    "click",
                    () => {

                        openReportDetails(
                            Number(
                                card.dataset.reportId
                            )
                        );

                    }
                );

            }
        );

}


/* ======================================================
   REPORT FILTER
====================================================== */

function getFilteredReports() {

    return reports.filter(
        report => {

            const matchesType =
                currentTypeFilter === "all" ||
                report.type === currentTypeFilter;


            const matchesStatus =
                currentStatusFilter === "all" ||

                report.status ===
                    currentStatusFilter ||

                (
                    currentStatusFilter ===
                    "strong-match" &&
                    report.bestMatch >= 85
                );


            const haystack = `

                ${report.id}
                ${report.userName}
                ${report.phone}
                ${report.email}
                ${report.category}
                ${report.itemType}
                ${report.brand}
                ${report.model}
                ${report.primaryColor}
                ${report.region}
                ${report.neighborhood}

            `
                .toLowerCase();


            const matchesSearch =
                haystack.includes(
                    searchValue.toLowerCase()
                );


            return (
                matchesType &&
                matchesStatus &&
                matchesSearch
            );

        }
    );

}


/* ======================================================
   REPORTS
====================================================== */

function renderReports() {

    const filtered =
        getFilteredReports();


    renderDesktopReports(
        filtered
    );


    renderMobileReports(
        filtered
    );

}


/* ======================================================
   DESKTOP REPORTS
====================================================== */

function renderDesktopReports(
    data
) {

    const body =
        document.getElementById(
            "reportsTableBody"
        );


    const empty =
        document.getElementById(
            "emptyReports"
        );


    if (
        data.length === 0
    ) {

        body.innerHTML =
            "";


        empty.style.display =
            "block";


        return;

    }


    empty.style.display =
        "none";


    body.innerHTML =
        data.map(
            report => `

                <tr class="report-row">

                    <td class="report-number">
                        #${report.id}
                    </td>


                    <td>

                        <span
                            class="
                                report-type-badge
                                ${report.type}
                            "
                        >
                            ${
                                report.type ===
                                "lost"

                                    ? "فاقد"

                                    : "عاثر"
                            }
                        </span>

                    </td>


                    <td class="person-cell">

                        <strong>
                            ${escapeHTML(report.userName)}
                        </strong>

                        <span>
                            ${escapeHTML(report.phone)}
                        </span>

                    </td>


                    <td>
                        ${escapeHTML(report.category)}
                    </td>


                    <td>
                        ${escapeHTML(report.itemType)}
                    </td>


                    <td>
                        ${escapeHTML(report.brand || "-")}
                    </td>


                    <td>

                        ${escapeHTML(report.region)}

                        <br>

                        <small>
                            ${escapeHTML(report.neighborhood || "")}
                        </small>

                    </td>


                    <td>

                        ${renderMatchScore(
                            report.bestMatch
                        )}

                    </td>


                    <td>

                        <span
                            class="
                                status-badge
                                status-${report.status}
                            "
                        >
                            ${
                                statusLabels[
                                    report.status
                                ] || report.status
                            }
                        </span>

                    </td>


                    <td>
                        ${formatDate(report.date)}
                    </td>


                    <td>

                        <button
                            type="button"
                            class="open-report-button"
                            data-report-id="${report.id}"
                        >
                            فتح
                        </button>

                    </td>

                </tr>

            `
        ).join("");


    body
        .querySelectorAll(
            ".open-report-button"
        )
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    () => {

                        openReportDetails(
                            Number(
                                button.dataset.reportId
                            )
                        );

                    }
                );

            }
        );

}


/* ======================================================
   MOBILE REPORTS
====================================================== */

function renderMobileReports(
    data
) {

    const container =
        document.getElementById(
            "mobileReportList"
        );


    if (
        data.length === 0
    ) {

        container.innerHTML = `

            <div class="empty-table"
                 style="display:block;">

                لا توجد بلاغات.

            </div>

        `;

        return;

    }


    container.innerHTML =
        data.map(
            report => `

                <article
                    class="mobile-report-card"
                    data-report-id="${report.id}"
                >

                    <div class="mobile-report-top">

                        <span
                            class="
                                report-type-badge
                                ${report.type}
                            "
                        >
                            ${
                                report.type ===
                                "lost"

                                    ? "فاقد"

                                    : "عاثر"
                            }
                        </span>


                        ${
                            renderMatchScore(
                                report.bestMatch
                            )
                        }

                    </div>


                    <h3>
                        ${escapeHTML(report.userName)}
                    </h3>


                    <div class="mobile-report-meta">

                        ${escapeHTML(report.category)}
                        •
                        ${escapeHTML(report.itemType)}
                        •
                        ${escapeHTML(report.brand)}

                        <br>

                        ${escapeHTML(report.region)}
                        -
                        ${escapeHTML(report.neighborhood)}

                    </div>

                </article>

            `
        ).join("");


    container
        .querySelectorAll(
            ".mobile-report-card"
        )
        .forEach(
            card => {

                card.addEventListener(
                    "click",
                    () => {

                        openReportDetails(
                            Number(
                                card.dataset.reportId
                            )
                        );

                    }
                );

            }
        );

}


/* ======================================================
   MATCH SCORE
====================================================== */

function renderMatchScore(
    score
) {

    if (
        !score
    ) {

        return `

            <span class="table-match none">
                لا يوجد
            </span>

        `;

    }


    const className =
        score >= 85

            ? "high"

            : score >= 65

                ? "medium"

                : "none";


    return `

        <span class="table-match ${className}">
            ${score}%
        </span>

    `;

}


/* ======================================================
   OPEN REPORT
====================================================== */

function openReportDetails(
    reportId
) {

    const report =
        reports.find(
            item =>
                item.id ===
                reportId
        );


    if (!report) {
        return;
    }


    document
        .getElementById(
            "detailsReportId"
        )
        .textContent =
        `بلاغ #${report.id}`;


    document
        .getElementById(
            "detailsTitle"
        )
        .textContent =

        report.type ===
        "lost"

            ? "تفاصيل بلاغ فاقد"

            : "تفاصيل بلاغ عاثر";


    const detailsBody =
        document.getElementById(
            "detailsBody"
        );


    detailsBody.innerHTML = `

        ${renderSmartMatchesSection(report)}

        ${renderOwnerSection(report)}

        ${renderItemSection(report)}

        ${renderLocationSection(report)}

        ${renderStatusSection(report)}

        ${renderAdminNotesSection(report)}

    `;


    bindReportDetailActions(
        report
    );


    document
        .getElementById(
            "reportOverlay"
        )
        .classList.add(
            "open"
        );


    document
        .getElementById(
            "reportDetailsPanel"
        )
        .classList.add(
            "open"
        );

}


/* ======================================================
   TOP 3 SMART MATCHES
====================================================== */

function renderSmartMatchesSection(
    report
) {

    let oppositeWord =
        report.type === "found"

            ? "مفقودات"

            : "معثورات";


    let html = `

        <section class="details-section">

            <div class="details-section-title">

                <h3>
                    🧠 أفضل 3 ${oppositeWord} مطابقة
                </h3>

                ${
                    report.bestMatch

                        ? `
                            <span class="match-strength">
                                أقوى تطابق ${report.bestMatch}%
                            </span>
                        `

                        : ""
                }

            </div>

            <div class="smart-match-list">

    `;


    if (
        !report.matches ||
        report.matches.length === 0
    ) {

        html += `

            <div class="detail-box full-detail">

                <span>
                    النظام
                </span>

                <strong>
                    لا يوجد تطابق مناسب حتى الآن.
                </strong>

            </div>

        `;

    } else {

        report.matches
            .slice(
                0,
                3
            )
            .forEach(
                (match, index) => {

                    html += `

                        <article class="smart-match-item">

                            <div class="smart-match-header">

                                <div>

                                    <strong>
                                        #${index + 1}
                                        ${escapeHTML(match.name)}
                                    </strong>

                                    <div class="smart-match-meta">
                                        بلاغ #${match.reportId}
                                        •
                                        ${escapeHTML(match.title)}
                                        •
                                        ${escapeHTML(match.region)}
                                    </div>

                                </div>


                                <span class="smart-match-score">
                                    ${match.score}%
                                </span>

                            </div>


                            <div class="smart-match-analysis">

                                ${analysisBox(
                                    "القسم",
                                    match.analysis.category
                                )}

                                ${analysisBox(
                                    "النوع",
                                    match.analysis.type
                                )}

                                ${analysisBox(
                                    "الماركة",
                                    match.analysis.brand
                                )}

                                ${analysisBox(
                                    "اللون",
                                    match.analysis.color
                                )}

                                ${analysisBox(
                                    "الموقع",
                                    match.analysis.location
                                )}

                                ${analysisBox(
                                    "التاريخ",
                                    match.analysis.date
                                )}

                                ${analysisBox(
                                    "الوصف",
                                    match.analysis.description
                                )}

                                ${analysisBox(
                                    "الصورة",
                                    match.analysis.image
                                )}

                            </div>


                            <button
                                type="button"
                                class="match-open-button"
                                data-match-report="${match.reportId}"
                            >
                                فتح البلاغ المطابق
                            </button>

                        </article>

                    `;

                }
            );

    }


    html += `

            </div>

        </section>

    `;


    return html;

}


/* ======================================================
   OWNER
====================================================== */

function renderOwnerSection(
    report
) {

    return `

        <section class="details-section">

            <div class="details-section-title">

                <h3>
                    👤 صاحب البلاغ
                </h3>


                <span
                    class="
                        report-type-badge
                        ${report.type}
                    "
                >
                    ${
                        report.type ===
                        "lost"

                            ? "فاقد"

                            : "عاثر"
                    }
                </span>

            </div>


            <div class="details-grid">


                ${detailBox(
                    "الاسم",
                    report.userName
                )}


                ${detailBox(
                    "رقم الجوال",
                    report.phone
                )}


                ${detailBox(
                    "البريد الإلكتروني",
                    report.email ||
                    "غير مسجل"
                )}


                ${detailBox(
                    "رقم البلاغ",
                    `#${report.id}`
                )}


            </div>


            <div class="contact-actions">

                <button
                    type="button"
                    class="contact-button call-button"
                    id="callUserButton"
                >
                    📞 اتصال
                </button>


                <button
                    type="button"
                    class="contact-button whatsapp-button"
                    id="whatsappUserButton"
                >
                    💬 واتساب
                </button>

            </div>

        </section>

    `;

}


/* ======================================================
   ITEM
====================================================== */

function renderItemSection(
    report
) {

    return `

        <section class="details-section">

            <div class="details-section-title">

                <h3>
                    📦 معلومات الغرض
                </h3>

            </div>


            <div class="details-grid">


                ${detailBox(
                    "القسم",
                    report.category
                )}


                ${detailBox(
                    "النوع",
                    report.itemType
                )}


                ${detailBox(
                    "الماركة / النوع",
                    report.brand ||
                    "غير محدد"
                )}


                ${detailBox(
                    "الموديل",
                    report.model ||
                    "غير محدد"
                )}


                ${detailBox(
                    "اللون الأساسي",
                    report.primaryColor ||
                    "-"
                )}


                ${detailBox(
                    "اللون الثانوي",
                    report.secondaryColor ||
                    "لا يوجد"
                )}


                ${detailBox(
                    "الوصف",
                    report.description ||
                    "لا يوجد",
                    true
                )}


                ${detailBox(
                    "علامة مميزة 🔒",
                    report.distinctiveMarks ||
                    "لا يوجد",
                    true
                )}


            </div>

        </section>

    `;

}


/* ======================================================
   LOCATION
====================================================== */

function renderLocationSection(
    report
) {

    return `

        <section class="details-section">

            <div class="details-section-title">

                <h3>
                    📍 الموقع والتاريخ
                </h3>

            </div>


            <div class="details-grid">


                ${detailBox(
                    "المنطقة",
                    report.region
                )}


                ${detailBox(
                    "الحي",
                    report.neighborhood ||
                    "-"
                )}


                ${detailBox(
                    "التاريخ",
                    formatDate(
                        report.date
                    )
                )}


                ${detailBox(
                    "الوقت",
                    report.time ||
                    "-"
                )}


                ${detailBox(
                    "Latitude",
                    report.latitude ||
                    "غير محدد"
                )}


                ${detailBox(
                    "Longitude",
                    report.longitude ||
                    "غير محدد"
                )}


                ${detailBox(
                    "دقة GPS",
                    report.accuracy

                        ? `±${report.accuracy} متر`

                        : "لم يستخدم GPS"
                )}


                ${detailBox(
                    "وصف الموقع",
                    report.locationDescription ||
                    "-",
                    true
                )}


            </div>

        </section>

    `;

}


/* ======================================================
   STATUS
====================================================== */

function renderStatusSection(
    report
) {

    const statuses = [

        [
            "new",
            "جديد"
        ],

        [
            "review",
            "قيد المراجعة"
        ],

        [
            "strong-match",
            "تطابق قوي"
        ],

        [
            "contact",
            "بانتظار التواصل"
        ],

        [
            "verification",
            "جاري التحقق"
        ],

        [
            "completed",
            "تم التسليم"
        ]

    ];


    return `

        <section class="details-section">

            <div class="details-section-title">

                <h3>
                    ⚙️ حالة البلاغ
                </h3>


                <span
                    class="
                        status-badge
                        status-${report.status}
                    "
                >
                    ${
                        statusLabels[
                            report.status
                        ]
                    }
                </span>

            </div>


            <div class="status-control-grid">

                ${
                    statuses.map(
                        ([value, label]) => `

                            <button
                                type="button"
                                class="status-action"
                                data-status="${value}"
                            >
                                ${label}
                            </button>

                        `
                    ).join("")
                }

            </div>

        </section>

    `;

}


/* ======================================================
   NOTES
====================================================== */

function renderAdminNotesSection(
    report
) {

    return `

        <section class="details-section">

            <div class="details-section-title">

                <h3>
                    📝 ملاحظات الإدارة
                </h3>

            </div>


            <textarea
                class="admin-note-area"
                id="adminNoteArea"
                placeholder="اكتب ملاحظة داخلية لا يراها المستخدم..."
            >${escapeHTML(report.adminNote || "")}</textarea>


            <button
                type="button"
                class="admin-note-save"
                id="saveAdminNoteButton"
            >
                حفظ الملاحظة
            </button>

        </section>

    `;

}


/* ======================================================
   BIND DETAILS
====================================================== */

function bindReportDetailActions(
    report
) {

    const callButton =
        document.getElementById(
            "callUserButton"
        );


    if (callButton) {

        callButton.addEventListener(
            "click",
            () => {

                window.location.href =
                    `tel:${report.phone}`;

            }
        );

    }


    const whatsappButton =
        document.getElementById(
            "whatsappUserButton"
        );


    if (whatsappButton) {

        whatsappButton.addEventListener(
            "click",
            () => {

                const phone =
                    normalizeSaudiPhone(
                        report.phone
                    );


                window.open(
                    `https://wa.me/${phone}`,
                    "_blank",
                    "noopener,noreferrer"
                );

            }
        );

    }


    document
        .querySelectorAll(
            ".status-action"
        )
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    () => {

                        report.status =
                            button.dataset.status;


                        showToast(
                            `تم تغيير حالة البلاغ إلى: ${
                                statusLabels[
                                    report.status
                                ]
                            }`
                        );


                        openReportDetails(
                            report.id
                        );


                        renderDashboard();

                    }
                );

            }
        );


    const saveNote =
        document.getElementById(
            "saveAdminNoteButton"
        );


    if (saveNote) {

        saveNote.addEventListener(
            "click",
            () => {

                report.adminNote =
                    document
                        .getElementById(
                            "adminNoteArea"
                        )
                        .value
                        .trim();


                showToast(
                    "تم حفظ الملاحظة."
                );

            }
        );

    }


    document
        .querySelectorAll(
            ".match-open-button"
        )
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    () => {

                        const targetId =
                            Number(
                                button.dataset.matchReport
                            );


                        const exists =
                            reports.some(
                                item =>
                                    item.id ===
                                    targetId
                            );


                        if (exists) {

                            openReportDetails(
                                targetId
                            );

                        } else {

                            showToast(
                                "البلاغ المطابق تجريبي وغير موجود في القائمة الحالية."
                            );

                        }

                    }
                );

            }
        );

}


/* ======================================================
   CLOSE DETAILS
====================================================== */

function closeDetails() {

    document
        .getElementById(
            "reportOverlay"
        )
        .classList.remove(
            "open"
        );


    document
        .getElementById(
            "reportDetailsPanel"
        )
        .classList.remove(
            "open"
        );

}


document
    .getElementById(
        "closeReportDetails"
    )
    .addEventListener(
        "click",
        closeDetails
    );


document
    .getElementById(
        "reportOverlay"
    )
    .addEventListener(
        "click",
        closeDetails
    );


/* ======================================================
   FILTER EVENTS
====================================================== */

document
    .getElementById(
        "reportsSearch"
    )
    .addEventListener(
        "input",
        event => {

            searchValue =
                event.target.value.trim();


            renderReports();

        }
    );


document
    .getElementById(
        "reportTypeFilter"
    )
    .addEventListener(
        "change",
        event => {

            currentTypeFilter =
                event.target.value;


            renderReports();

        }
    );


document
    .getElementById(
        "reportStatusFilter"
    )
    .addEventListener(
        "change",
        event => {

            currentStatusFilter =
                event.target.value;


            renderReports();

        }
    );


/* ======================================================
   SIDEBAR FILTERS
====================================================== */

document
    .querySelectorAll(
        ".admin-nav-item"
    )
    .forEach(
        button => {

            button.addEventListener(
                "click",
                () => {

                    document
                        .querySelectorAll(
                            ".admin-nav-item"
                        )
                        .forEach(
                            item =>
                                item.classList.remove(
                                    "active"
                                )
                        );


                    button.classList.add(
                        "active"
                    );


                    if (
                        button.dataset.filterType
                    ) {

                        currentTypeFilter =
                            button.dataset.filterType;


                        currentStatusFilter =
                            "all";


                        document
                            .getElementById(
                                "reportTypeFilter"
                            )
                            .value =
                            currentTypeFilter;


                        document
                            .getElementById(
                                "reportStatusFilter"
                            )
                            .value =
                            "all";

                    }


                    if (
                        button.dataset.filterStatus
                    ) {

                        currentStatusFilter =
                            button.dataset.filterStatus;


                        currentTypeFilter =
                            "all";


                        document
                            .getElementById(
                                "reportTypeFilter"
                            )
                            .value =
                            "all";


                        document
                            .getElementById(
                                "reportStatusFilter"
                            )
                            .value =
                            currentStatusFilter;

                    }


                    renderReports();


                    closeSidebarMobile();

                }
            );

        }
    );


/* ======================================================
   SHOW STRONG MATCHES
====================================================== */

document
    .getElementById(
        "showStrongMatchesButton"
    )
    .addEventListener(
        "click",
        () => {

            currentTypeFilter =
                "all";


            currentStatusFilter =
                "strong-match";


            document
                .getElementById(
                    "reportTypeFilter"
                )
                .value =
                "all";


            document
                .getElementById(
                    "reportStatusFilter"
                )
                .value =
                "strong-match";


            renderReports();


            document
                .querySelector(
                    ".reports-section"
                )
                .scrollIntoView({
                    behavior: "smooth"
                });

        }
    );


/* ======================================================
   REFRESH
====================================================== */

document
    .getElementById(
        "refreshButton"
    )
    .addEventListener(
        "click",
        () => {

            renderDashboard();


            showToast(
                "تم تحديث البيانات."
            );

        }
    );


/* ======================================================
   MOBILE SIDEBAR
====================================================== */

const sidebar =
    document.getElementById(
        "adminSidebar"
    );


document
    .getElementById(
        "sidebarToggle"
    )
    .addEventListener(
        "click",
        () => {

            sidebar.classList.toggle(
                "open"
            );

        }
    );


function closeSidebarMobile() {

    sidebar.classList.remove(
        "open"
    );

}


/* ======================================================
   HELPERS
====================================================== */

function analysisBox(
    label,
    value
) {

    return `

        <div class="analysis-item">

            <span>
                ${label}
            </span>

            <strong>
                ${value ?? 0}%
            </strong>

        </div>

    `;

}


function detailBox(
    label,
    value,
    full = false
) {

    return `

        <div
            class="
                detail-box
                ${full ? "full-detail" : ""}
            "
        >

            <span>
                ${escapeHTML(label)}
            </span>

            <strong>
                ${escapeHTML(
                    String(
                        value ?? "-"
                    )
                )}
            </strong>

        </div>

    `;

}


function getMatchStrength(
    score
) {

    if (
        score >= 90
    ) {

        return "تطابق ممتاز";

    }


    if (
        score >= 80
    ) {

        return "تطابق قوي";

    }


    if (
        score >= 65
    ) {

        return "تطابق محتمل";

    }


    return "تطابق ضعيف";

}


function formatDate(
    date
) {

    if (!date) {
        return "-";
    }


    const value =
        new Date(
            `${date}T00:00:00`
        );


    return value.toLocaleDateString(
        "ar-SA",
        {
            year: "numeric",
            month: "short",
            day: "numeric"
        }
    );

}


function normalizeSaudiPhone(
    phone
) {

    let clean =
        String(phone)
            .replace(/\D/g, "");


    if (
        clean.startsWith("05")
    ) {

        clean =
            "966" +
            clean.substring(1);

    }


    if (
        clean.startsWith("5") &&
        clean.length === 9
    ) {

        clean =
            "966" +
            clean;

    }


    return clean;

}


let toastTimeout;


function showToast(
    message
) {

    const toast =
        document.getElementById(
            "adminToast"
        );


    clearTimeout(
        toastTimeout
    );


    toast.textContent =
        message;


    toast.classList.add(
        "show"
    );


    toastTimeout =
        setTimeout(
            () => {

                toast.classList.remove(
                    "show"
                );

            },
            2500
        );

}


function escapeHTML(
    value
) {

    return String(value)

        .replaceAll(
            "&",
            "&amp;"
        )

        .replaceAll(
            "<",
            "&lt;"
        )

        .replaceAll(
            ">",
            "&gt;"
        )

        .replaceAll(
            '"',
            "&quot;"
        )

        .replaceAll(
            "'",
            "&#039;"
        );

}