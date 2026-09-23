document.addEventListener(
    "DOMContentLoaded",
    function () {

        const params =
            new URLSearchParams(
                window.location.search
            );


        const token =
            params.get("token");

        const userId =
            params.get("userId");

        const fullName =
            params.get("fullName");

        const username =
            params.get("username");

        const email =
            params.get("email");

        const role =
            params.get("role");


        // =========================================
        // CHECK TOKEN
        // =========================================

        if (!token) {

            window.location.href =
                "login.html?oauthError=no_token";

            return;
        }


        // =========================================
        // SAVE AUTH DATA
        // =========================================

        localStorage.setItem(
            "token",
            token
        );

        localStorage.setItem(
            "loggedIn",
            "true"
        );

        localStorage.setItem(
            "userId",
            userId || ""
        );

        localStorage.setItem(
            "fullName",
            fullName || ""
        );

        localStorage.setItem(
            "username",
            username || ""
        );

        localStorage.setItem(
            "email",
            email || ""
        );

        localStorage.setItem(
            "role",
            role || "USER"
        );


        // =========================================
        // REMOVE TOKEN FROM URL
        // =========================================

        window.history.replaceState(
            {},
            document.title,
            "oauth-success.html"
        );


        // =========================================
        // GO DASHBOARD
        // =========================================

        setTimeout(
            function () {

                window.location.href =
                    "dashboard.html";

            },
            500
        );

    }
);