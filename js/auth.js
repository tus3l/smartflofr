"use strict";


const API_BASE =
    "../backend/api/auth";


const authTabs =
    document.querySelectorAll(
        ".auth-tab"
    );


const authForms =
    document.querySelectorAll(
        ".auth-form"
    );


const loginForm =
    document.getElementById(
        "loginForm"
    );


const registerForm =
    document.getElementById(
        "registerForm"
    );


const authMessage =
    document.getElementById(
        "authMessage"
    );


/* =========================================
   TABS
========================================= */

authTabs.forEach(
    (tab) => {

        tab.addEventListener(
            "click",
            () => {

                authTabs.forEach(
                    item =>
                        item.classList.remove(
                            "active"
                        )
                );


                authForms.forEach(
                    form =>
                        form.classList.remove(
                            "active"
                        )
                );


                tab.classList.add(
                    "active"
                );


                document
                    .getElementById(
                        tab.dataset.target
                    )
                    .classList.add(
                        "active"
                    );


                hideMessage();

            }
        );

    }
);


/* =========================================
   PASSWORD
========================================= */

document
    .querySelectorAll(
        ".password-toggle"
    )
    .forEach(
        button => {

            button.addEventListener(
                "click",
                () => {

                    const input =
                        document.getElementById(
                            button.dataset.input
                        );


                    if (
                        input.type ===
                        "password"
                    ) {

                        input.type =
                            "text";


                        button.textContent =
                            "إخفاء";

                    } else {

                        input.type =
                            "password";


                        button.textContent =
                            "إظهار";

                    }

                }
            );

        }
    );


/* =========================================
   IDENTIFIER
========================================= */

function validateIdentifier(
    value
) {

    const emailRegex =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    const phoneRegex =
        /^(05\d{8}|\+9665\d{8}|9665\d{8})$/;


    return (
        emailRegex.test(
            value
        ) ||
        phoneRegex.test(
            value
        )
    );

}


/* =========================================
   MESSAGE
========================================= */

function showMessage(
    message,
    type = "error"
) {

    authMessage.textContent =
        message;


    authMessage.className =
        `message-box show ${type}`;

}


function hideMessage() {

    authMessage.textContent =
        "";


    authMessage.className =
        "message-box";

}


/* =========================================
   BUTTON LOADING
========================================= */

function setButtonLoading(
    button,
    loading,
    normalText
) {

    button.disabled =
        loading;


    button.textContent =
        loading
            ? "جاري التنفيذ..."
            : normalText;

}


/* =========================================
   LOGIN
========================================= */

loginForm.addEventListener(
    "submit",
    async event => {

        event.preventDefault();

        hideMessage();


        const identifier =
            document
                .getElementById(
                    "loginIdentifier"
                )
                .value
                .trim();


        const password =
            document
                .getElementById(
                    "loginPassword"
                )
                .value;


        if (
            !validateIdentifier(
                identifier
            )
        ) {

            showMessage(
                "أدخل رقم جوال سعودي أو بريد إلكتروني صحيح."
            );

            return;
        }


        const button =
            loginForm.querySelector(
                ".primary-button"
            );


        setButtonLoading(
            button,
            true,
            "تسجيل الدخول"
        );


        try {

            const response =
                await fetch(
                    `${API_BASE}/login.php`,
                    {
                        method:
                            "POST",

                        credentials:
                            "include",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body:
                            JSON.stringify({
                                identifier,
                                password
                            })
                    }
                );


            const data =
                await response.json();


            if (
                !response.ok ||
                !data.success
            ) {

                showMessage(
                    data.message ||
                    "تعذر تسجيل الدخول."
                );

                return;
            }


            showMessage(
                "تم تسجيل الدخول بنجاح.",
                "success"
            );


            /*
             * إذا Admin يروح لوحة الإدارة.
             */

            if (
                data.user.role ===
                "admin" ||
                data.user.role ===
                "moderator"
            ) {

                window.location.href =
                    "admin-dashboard.html?v=20261006-3";

                return;
            }


            window.location.href =
                "home.html?v=20261006-3";


        } catch (error) {

            console.error(
                error
            );


            showMessage(
                "تعذر الاتصال بالسيرفر. تأكد أنك فاتح المشروع عن طريق localhost."
            );

        } finally {

            setButtonLoading(
                button,
                false,
                "تسجيل الدخول"
            );

        }

    }
);


/* =========================================
   REGISTER
========================================= */

registerForm.addEventListener(
    "submit",
    async event => {

        event.preventDefault();

        hideMessage();


        const name =
            document
                .getElementById(
                    "registerName"
                )
                .value
                .trim();


        const identifier =
            document
                .getElementById(
                    "registerIdentifier"
                )
                .value
                .trim();


        const password =
            document
                .getElementById(
                    "registerPassword"
                )
                .value;


        if (
            name.length < 2
        ) {

            showMessage(
                "اكتب الاسم بشكل صحيح."
            );

            return;
        }


        if (
            !validateIdentifier(
                identifier
            )
        ) {

            showMessage(
                "أدخل رقم جوال سعودي أو بريد إلكتروني صحيح."
            );

            return;
        }


        if (
            password.length < 6
        ) {

            showMessage(
                "كلمة المرور يجب أن تكون 6 أحرف على الأقل."
            );

            return;
        }


        const button =
            registerForm.querySelector(
                ".primary-button"
            );


        setButtonLoading(
            button,
            true,
            "إنشاء الحساب"
        );


        try {

            const response =
                await fetch(
                    `${API_BASE}/register.php`,
                    {
                        method:
                            "POST",

                        credentials:
                            "include",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body:
                            JSON.stringify({
                                name,
                                identifier,
                                password
                            })
                    }
                );


            const data =
                await response.json();


            if (
                !response.ok ||
                !data.success
            ) {

                showMessage(
                    data.message ||
                    "تعذر إنشاء الحساب."
                );

                return;
            }


            showMessage(
                "تم إنشاء الحساب بنجاح.",
                "success"
            );


            window.location.href =
                "home.html?v=20261006-3";


        } catch (error) {

            console.error(
                error
            );


            showMessage(
                "تعذر الاتصال بالسيرفر. تأكد من تشغيل Apache و MySQL."
            );

        } finally {

            setButtonLoading(
                button,
                false,
                "إنشاء الحساب"
            );

        }

    }
);


/* =========================================
   FORGOT PASSWORD
========================================= */

document
    .getElementById(
        "forgotPasswordButton"
    )
    .addEventListener(
        "click",
        () => {

            showMessage(
                "استعادة كلمة المرور برمز التحقق OTP بنضيفها بعد التأكد من عمل التسجيل والدخول.",
                "success"
            );

        }
    );