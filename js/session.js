"use strict";


(async function checkSession() {

    try {

        const response =
            await fetch(
                "../backend/api/auth/me.php",
                {
                    credentials:
                        "include"
                }
            );


        const data =
            await response.json();


        if (
            !response.ok ||
            !data.authenticated
        ) {

            window.location.href =
                "login.html";

            return;
        }


        /*
         * لو الصفحة فيها اسم المستخدم.
         */

        const welcomeName =
            document.getElementById(
                "userWelcomeName"
            );


        if (
            welcomeName
        ) {

            welcomeName.textContent =
                data.user.name;

        }


    } catch (error) {

        console.error(
            "Session check failed:",
            error
        );


        window.location.href =
            "login.html";

    }

})();