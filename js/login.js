/* =========================================================
   EVEN - LOGIN JAVASCRIPT
   ========================================================= */


document.addEventListener("DOMContentLoaded", function () {


    /* =====================================================
       ELEMENTS
    ====================================================== */

    const preloader =
        document.getElementById("preloader");

    const loginForm =
        document.getElementById("loginForm");

    const emailInput =
        document.getElementById("email");

    const passwordInput =
        document.getElementById("password");

    const togglePassword =
        document.getElementById("togglePassword");

    const loginButton =
        document.getElementById("loginButton");

    const btnText =
        document.getElementById("btnText");

    const loader =
        document.getElementById("loader");

    const toast =
        document.getElementById("toast");

    const strengthBar =
        document.getElementById("strengthBar");

    const themeBtn =
        document.getElementById("themeBtn");

    const forgotPassword =
        document.getElementById("forgotPassword");

    const remember =
        document.getElementById("remember");



    /* =====================================================
       PRELOADER
    ====================================================== */

    setTimeout(function () {

        if (!preloader) {
            return;
        }

        preloader.style.opacity = "0";

        preloader.style.visibility =
            "hidden";


        setTimeout(function () {

            preloader.style.display =
                "none";

        }, 500);

    }, 900);



    /* =====================================================
       TOAST
    ====================================================== */

    function showToast(
        message,
        type = "error"
    ) {

        if (!toast) {
            return;
        }


        toast.textContent =
            message;


        toast.classList.remove(
            "show",
            "success",
            "error",
            "warning"
        );


        if (type === "success") {

            toast.style.background =
                "#22c55e";

        }

        else if (type === "warning") {

            toast.style.background =
                "#f59e0b";

        }

        else {

            toast.style.background =
                "#ef4444";

        }


        toast.classList.add("show");


        setTimeout(function () {

            toast.classList.remove(
                "show"
            );

        }, 3000);

    }



    /* =====================================================
       PASSWORD SHOW / HIDE
    ====================================================== */

    if (
        togglePassword &&
        passwordInput
    ) {

        togglePassword.addEventListener(
            "click",
            function () {


                if (
                    passwordInput.type ===
                    "password"
                ) {


                    passwordInput.type =
                        "text";


                    togglePassword.innerHTML =
                        '<i class="fa-solid fa-eye-slash"></i>';


                    togglePassword.setAttribute(
                        "aria-label",
                        "Hide password"
                    );

                }

                else {


                    passwordInput.type =
                        "password";


                    togglePassword.innerHTML =
                        '<i class="fa-solid fa-eye"></i>';


                    togglePassword.setAttribute(
                        "aria-label",
                        "Show password"
                    );

                }

            }
        );

    }



    /* =====================================================
       PASSWORD STRENGTH
    ====================================================== */

    if (
        passwordInput &&
        strengthBar
    ) {

        passwordInput.addEventListener(
            "input",
            function () {


                const password =
                    passwordInput.value;


                let score = 0;


                if (
                    password.length >= 8
                ) {

                    score++;

                }


                if (
                    /[A-Z]/.test(password)
                ) {

                    score++;

                }


                if (
                    /[0-9]/.test(password)
                ) {

                    score++;

                }


                if (
                    /[^A-Za-z0-9]/.test(password)
                ) {

                    score++;

                }


                const widths = [

                    "0%",

                    "25%",

                    "50%",

                    "75%",

                    "100%"

                ];


                const colors = [

                    "#e5e7eb",

                    "#ef4444",

                    "#f59e0b",

                    "#3b82f6",

                    "#22c55e"

                ];


                strengthBar.style.width =
                    widths[score];


                strengthBar.style.background =
                    colors[score];

            }
        );

    }



    /* =====================================================
       THEME
    ====================================================== */

    if (themeBtn) {


        themeBtn.addEventListener(
            "click",
            function () {


                document.body.classList.toggle(
                    "dark"
                );


                const icon =
                    themeBtn.querySelector("i");


                const isDark =
                    document.body.classList.contains(
                        "dark"
                    );


                if (isDark) {


                    if (icon) {

                        icon.className =
                            "fa-solid fa-sun";

                    }


                    localStorage.setItem(
                        "theme",
                        "dark"
                    );

                }

                else {


                    if (icon) {

                        icon.className =
                            "fa-solid fa-moon";

                    }


                    localStorage.setItem(
                        "theme",
                        "light"
                    );

                }

            }
        );



        /* Load saved theme */

        const savedTheme =
            localStorage.getItem(
                "theme"
            );


        if (
            savedTheme ===
            "dark"
        ) {


            document.body.classList.add(
                "dark"
            );


            const icon =
                themeBtn.querySelector("i");


            if (icon) {

                icon.className =
                    "fa-solid fa-sun";

            }

        }

    }



    /* =====================================================
       FORGOT PASSWORD
    ====================================================== */

    if (forgotPassword) {


        forgotPassword.addEventListener(
            "click",
            function (event) {

                event.preventDefault();


                showToast(
                    "Password recovery will be available soon.",
                    "warning"
                );

            }
        );

    }



    /* =====================================================
       REMEMBER ME
    ====================================================== */

    if (remember) {


        const rememberedEmail =
            localStorage.getItem(
                "rememberedEmail"
            );


        if (rememberedEmail) {

            emailInput.value =
                rememberedEmail;

            remember.checked =
                true;

        }


        remember.addEventListener(
            "change",
            function () {


                if (
                    remember.checked &&
                    emailInput
                ) {


                    localStorage.setItem(
                        "rememberedEmail",
                        emailInput.value
                            .trim()
                            .toLowerCase()
                    );

                }

                else {

                    localStorage.removeItem(
                        "rememberedEmail"
                    );

                }

            }
        );

    }



    /* =====================================================
       LOGIN FORM CHECK
    ====================================================== */

    if (!loginForm) {

        console.error(
            "EVEN: loginForm not found."
        );

        return;

    }



    /* =====================================================
       LOGIN SUBMIT
    ====================================================== */

    loginForm.addEventListener(
        "submit",
        async function (event) {


            event.preventDefault();



            /* =================================================
               READ INPUT
            ================================================== */

            const email =
                emailInput.value
                    .trim()
                    .toLowerCase();


            const password =
                passwordInput.value;



            /* =================================================
               EMAIL VALIDATION
            ================================================== */

            if (!email) {

                showToast(
                    "Please enter your email.",
                    "error"
                );


                emailInput.focus();

                return;

            }


            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


            if (
                !emailPattern.test(email)
            ) {

                showToast(
                    "Please enter a valid email address.",
                    "error"
                );


                emailInput.focus();

                return;

            }



            /* =================================================
               PASSWORD VALIDATION
            ================================================== */

            if (!password) {

                showToast(
                    "Please enter your password.",
                    "error"
                );


                passwordInput.focus();

                return;

            }



            /* =================================================
               BUTTON LOADING
            ================================================== */

            if (loginButton) {

                loginButton.disabled =
                    true;

            }


            if (btnText) {

                btnText.textContent =
                    "Logging in...";

            }


            if (loader) {

                loader.style.display =
                    "inline-block";

            }



            try {


                /* =================================================
                   CHECK API OBJECT
                ================================================== */

                if (
                    typeof Api ===
                    "undefined"
                ) {

                    throw new Error(
                        "API connection is not loaded. Check js/api.js."
                    );

                }



                console.log(
                    "================================="
                );

                console.log(
                    "EVEN LOGIN"
                );

                console.log(
                    "Email:",
                    email
                );

                console.log(
                    "Sending request to backend..."
                );



                /* =================================================
                   LOGIN REQUEST
                ================================================== */

                const data =
                    await Api.post(
                        "/auth/login",
                        {
                            email: email,
                            password: password
                        }
                    );


                console.log(
                    "LOGIN RESPONSE:",
                    data
                );



                /* =================================================
                   TOKEN CHECK
                ================================================== */

                if (
                    !data ||
                    !data.token
                ) {

                    throw new Error(
                        "Login successful but JWT token was not returned."
                    );

                }



                /* =================================================
                   SAVE JWT
                ================================================== */

                localStorage.setItem(
                    "token",
                    data.token
                );


                localStorage.setItem(
                    "loggedIn",
                    "true"
                );



                /* =================================================
                   SAVE USER DATA
                ================================================== */

                localStorage.setItem(
                    "userId",
                    data.userId || ""
                );


                localStorage.setItem(
                    "fullName",
                    data.fullName || ""
                );


                localStorage.setItem(
                    "username",
                    data.username || ""
                );


                localStorage.setItem(
                    "email",
                    data.email || email
                );


                localStorage.setItem(
                    "role",
                    data.role || "USER"
                );



                /* =================================================
                   REMEMBER EMAIL
                ================================================== */

                if (
                    remember &&
                    remember.checked
                ) {

                    localStorage.setItem(
                        "rememberedEmail",
                        email
                    );

                }

                else {

                    localStorage.removeItem(
                        "rememberedEmail"
                    );

                }



                /* =================================================
                   SUCCESS
                ================================================== */

                showToast(
                    "Login successful! Opening dashboard...",
                    "success"
                );


                console.log(
                    "JWT saved successfully."
                );



                /* =================================================
                   REDIRECT
                ================================================== */

                setTimeout(
                    function () {

                        window.location.href =
                            "dashboard.html";

                    },
                    800
                );


            }


            catch (error) {


                /* =================================================
                   LOGIN ERROR
                ================================================== */

                console.error(
                    "EVEN LOGIN ERROR:",
                    error
                );


                let message =
                    "Invalid email or password.";


                if (
                    error &&
                    error.message
                ) {

                    message =
                        error.message;

                }


                showToast(
                    message,
                    "error"
                );



                /* =================================================
                   RESTORE BUTTON
                ================================================== */

                if (loginButton) {

                    loginButton.disabled =
                        false;

                }


                if (btnText) {

                    btnText.textContent =
                        "Login";

                }


                if (loader) {

                    loader.style.display =
                        "none";

                }

            }

        }
    );

});