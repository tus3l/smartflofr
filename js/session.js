"use strict";


(async function checkSession() {

    try {

        const { response, data } =
            await SFLoader.request(
                "../backend/api/auth/me.php",
                {
                    credentials:
                        "include"
                }
            );


        if (
            !response.ok ||
            !data.authenticated
        ) {

            void SFLoader.navigate(
                "login.html",
                { replace: true }
            );

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


        void SFLoader.navigate(
            "login.html",
            { replace: true }
        );

    }

})();