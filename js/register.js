// =====================================================
// EVEN - REGISTER
// =====================================================

document.addEventListener("DOMContentLoaded", () => {

    const body = document.body;

    const themeBtn =
        document.getElementById("themeBtn");

    const registerForm =
        document.getElementById("registerForm");

    const password =
        document.getElementById("password");

    const confirmPassword =
        document.getElementById("confirmPassword");

    const togglePassword =
        document.getElementById("togglePassword");

    const toggleConfirm =
        document.getElementById("toggleConfirm");

    const strengthBar =
        document.getElementById("strengthBar");

    const toast =
        document.getElementById("toast");

    const preloader =
        document.getElementById("preloader");

    const loader =
        document.getElementById("loader");

    const btnText =
        document.getElementById("btnText");

    const uploadBtn =
        document.getElementById("uploadBtn");

    const profileImage =
        document.getElementById("profileImage");

    const previewImage =
        document.getElementById("previewImage");


    // =================================================
    // PRELOADER
    // =================================================

    function hidePreloader() {

        if (!preloader) return;

        preloader.style.opacity = "0";
        preloader.style.visibility = "hidden";
        preloader.style.pointerEvents = "none";

        setTimeout(() => {

            preloader.style.display = "none";

        }, 500);
    }


    window.addEventListener("load", () => {

        setTimeout(hidePreloader, 800);

    });


    setTimeout(hidePreloader, 3000);


    // =================================================
    // THEME
    // =================================================

    if (
        localStorage.getItem("theme") === "dark"
    ) {

        body.classList.add("dark");

        if (themeBtn) {

            themeBtn.innerHTML =
                '<i class="fa-solid fa-sun"></i>';
        }
    }


    if (themeBtn) {

        themeBtn.addEventListener(
            "click",
            () => {

                body.classList.toggle("dark");

                const dark =
                    body.classList.contains("dark");

                localStorage.setItem(
                    "theme",
                    dark ? "dark" : "light"
                );

                themeBtn.innerHTML =
                    dark
                        ? '<i class="fa-solid fa-sun"></i>'
                        : '<i class="fa-solid fa-moon"></i>';
            }
        );
    }


    // =================================================
    // PASSWORD TOGGLE
    // =================================================

    if (togglePassword && password) {

        togglePassword.addEventListener(
            "click",
            () => {

                const show =
                    password.type === "password";

                password.type =
                    show ? "text" : "password";

                togglePassword.innerHTML =
                    show
                        ? '<i class="fa-solid fa-eye-slash"></i>'
                        : '<i class="fa-solid fa-eye"></i>';
            }
        );
    }


    // =================================================
    // CONFIRM PASSWORD TOGGLE
    // =================================================

    if (toggleConfirm && confirmPassword) {

        toggleConfirm.addEventListener(
            "click",
            () => {

                const show =
                    confirmPassword.type === "password";

                confirmPassword.type =
                    show ? "text" : "password";

                toggleConfirm.innerHTML =
                    show
                        ? '<i class="fa-solid fa-eye-slash"></i>'
                        : '<i class="fa-solid fa-eye"></i>';
            }
        );
    }


    // =================================================
    // PASSWORD STRENGTH
    // =================================================

    if (password && strengthBar) {

        password.addEventListener(
            "input",
            () => {

                let score = 0;

                const value =
                    password.value;

                if (value.length >= 8)
                    score++;

                if (/[A-Z]/.test(value))
                    score++;

                if (/[0-9]/.test(value))
                    score++;

                if (/[^A-Za-z0-9]/.test(value))
                    score++;


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


    // =================================================
    // PROFILE IMAGE
    // =================================================

    if (uploadBtn && profileImage) {

        uploadBtn.addEventListener(
            "click",
            () => {

                profileImage.click();

            }
        );
    }


    if (profileImage && previewImage) {

        profileImage.addEventListener(
            "change",
            () => {

                const file =
                    profileImage.files[0];

                if (!file) return;


                if (
                    !file.type.startsWith("image/")
                ) {

                    showToast(
                        "Please select an image.",
                        false
                    );

                    return;
                }


                const reader =
                    new FileReader();


                reader.onload = (event) => {

                    previewImage.src =
                        event.target.result;
                };


                reader.readAsDataURL(file);
            }
        );
    }


    // =================================================
    // TOAST
    // =================================================

    function showToast(
        message,
        success = true
    ) {

        if (!toast) return;

        toast.textContent =
            message;

        toast.style.background =
            success
                ? "#22c55e"
                : "#ef4444";

        toast.classList.add("show");

        setTimeout(() => {

            toast.classList.remove("show");

        }, 3000);
    }


    // =================================================
    // VALIDATION
    // =================================================

    function validEmail(email) {

        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            .test(email);
    }


    function validPhone(phone) {

        return /^[0-9]{10}$/
            .test(phone);
    }


    function validUsername(username) {

        return /^[a-zA-Z0-9_]{3,30}$/
            .test(username);
    }


    // =================================================
    // REGISTER
    // =================================================

    if (!registerForm) return;


    registerForm.addEventListener(
        "submit",
        async (event) => {

            event.preventDefault();


            // =========================================
            // GET VALUES
            // =========================================

            const fullName =
                document
                    .getElementById("fullname")
                    .value
                    .trim();


            const username =
                document
                    .getElementById("username")
                    .value
                    .trim();


            const email =
                document
                    .getElementById("email")
                    .value
                    .trim()
                    .toLowerCase();


            const phone =
                document
                    .getElementById("phone")
                    .value
                    .trim();


            const pass =
                password.value;


            const confirm =
                confirmPassword.value;


            const terms =
                document
                    .getElementById("terms")
                    .checked;


            // =========================================
            // VALIDATION
            // =========================================

            if (fullName.length < 2) {

                showToast(
                    "Please enter your full name.",
                    false
                );

                return;
            }


            if (!validUsername(username)) {

                showToast(
                    "Username must contain 3-30 letters, numbers or underscore.",
                    false
                );

                return;
            }


            if (!validEmail(email)) {

                showToast(
                    "Please enter a valid email.",
                    false
                );

                return;
            }


            if (!validPhone(phone)) {

                showToast(
                    "Phone number must contain exactly 10 digits.",
                    false
                );

                return;
            }


            if (pass.length < 8) {

                showToast(
                    "Password must be at least 8 characters.",
                    false
                );

                return;
            }


            if (pass !== confirm) {

                showToast(
                    "Passwords do not match.",
                    false
                );

                return;
            }


            if (!terms) {

                showToast(
                    "Please accept the Terms & Conditions.",
                    false
                );

                return;
            }


            // =========================================
            // LOADING
            // =========================================

            const registerButton =
                registerForm.querySelector(
                    ".register-btn"
                );


            if (registerButton) {
                registerButton.disabled = true;
            }


            if (btnText) {
                btnText.textContent =
                    "Creating Account...";
            }


            if (loader) {
                loader.style.display =
                    "inline-block";
            }


            // =========================================
            // BACKEND REQUEST
            // =========================================

            try {

                const data =
                    await Api.post(
                        "/auth/register",
                        {
                            fullName: fullName,
                            username: username,
                            email: email,
                            phone: phone,
                            password: pass,
                            role: "USER"
                        }
                    );


                console.log(
                    "REGISTRATION SUCCESS:",
                    data
                );


                // =====================================
                // SUCCESS
                // =====================================

                showToast(
                    "Account Created Successfully! 🎉",
                    true
                );


                if (btnText) {

                    btnText.textContent =
                        "Account Created!";
                }


                if (loader) {

                    loader.style.display =
                        "none";
                }


                // =====================================
                // REDIRECT TO LOGIN
                // =====================================

                setTimeout(() => {

                    window.location.href =
                        "login.html";

                }, 1200);


            } catch (error) {

                console.error(
                    "REGISTRATION ERROR:",
                    error
                );


                if (loader) {

                    loader.style.display =
                        "none";
                }


                if (btnText) {

                    btnText.textContent =
                        "Create Account";
                }


                if (registerButton) {

                    registerButton.disabled =
                        false;
                }


                showToast(
                    error.message ||
                    "Registration failed.",
                    false
                );
            }
        }
    );
});