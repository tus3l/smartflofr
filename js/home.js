"use strict";


const userWelcomeName =
    document.getElementById(
        "userWelcomeName"
    );


const savedName =
    sessionStorage.getItem(
        "smartLostFoundUserName"
    );


if (savedName) {

    userWelcomeName.textContent =
        savedName;

}


/* ==============================
   أزرار البلاغات
============================== */

document
    .getElementById(
        "lostButton"
    )
    .addEventListener(
        "click",
        (event) => {

            event.preventDefault();

            /*
             لاحقاً:
             window.location.href = "lost-report.html?v=20261006-3";
            */

          window.location.href =
    "lost-report.html?v=20261006-3";

        }
    );


document
    .getElementById(
        "foundButton"
    )
    .addEventListener(
        "click",
        (event) => {

            event.preventDefault();

            /*
             لاحقاً:
             window.location.href = "found-report.html?v=20261006-3";
            */

 window.location.href =
     "found-report.html?v=20261006-3";

        }
    );


/* ==============================
   الدعم
============================== */

const supportModal =
    document.getElementById(
        "supportModal"
    );


const supportButton =
    document.getElementById(
        "supportButton"
    );


const closeSupportModal =
    document.getElementById(
        "closeSupportModal"
    );


supportButton.addEventListener(
    "click",
    () => {

        supportModal.classList.add(
            "open"
        );

    }
);


closeSupportModal.addEventListener(
    "click",
    () => {

        supportModal.classList.remove(
            "open"
        );

    }
);


supportModal.addEventListener(
    "click",
    (event) => {

        if (
            event.target === supportModal
        ) {

            supportModal.classList.remove(
                "open"
            );

        }

    }
);


/* ==============================
   نموذج الدعم
============================== */

document
    .getElementById(
        "supportForm"
    )
    .addEventListener(
        "submit",
        (event) => {

            event.preventDefault();


            alert(
                "تم استلام رسالتك، سيتم ربطها بقاعدة البيانات لاحقاً."
            );


            event.target.reset();


            supportModal.classList.remove(
                "open"
            );

        }
    );


/* ==============================
   التنبيهات
============================== */

const notificationButton =
    document.getElementById(
        "notificationButton"
    );


const notificationPanel =
    document.getElementById(
        "notificationPanel"
    );


const closeNotifications =
    document.getElementById(
        "closeNotifications"
    );


notificationButton.addEventListener(
    "click",
    () => {

        notificationPanel.classList.add(
            "open"
        );

    }
);


/* ==============================
   تسجيل الخروج
============================== */

const logoutButton =
    document.getElementById(
        "logoutButton"
    );


logoutButton.addEventListener(
    "click",
    async () => {

        logoutButton.disabled = true;

        try {

            const response =
                await fetch(
                    "../backend/api/auth/logout.php",
                    {
                        method: "POST",
                        credentials: "include"
                    }
                );


            const result =
                await response.json();


            if (
                !response.ok ||
                !result.success
            ) {

                throw new Error(
                    result.message ||
                    "تعذّر تسجيل الخروج."
                );

            }


            sessionStorage.removeItem(
                "smartLostFoundUserName"
            );

            window.location.href =
                "login.html?v=20261006-3";

        } catch (error) {

            console.error(
                "Logout failed:",
                error
            );

            alert(
                error instanceof Error
                    ? error.message
                    : "تعذّر تسجيل الخروج. حاول مرة أخرى."
            );

            logoutButton.disabled = false;

        }

    }
);


closeNotifications.addEventListener(
    "click",
    () => {

        notificationPanel.classList.remove(
            "open"
        );

    }
);