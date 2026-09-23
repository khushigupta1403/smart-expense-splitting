
document.addEventListener("DOMContentLoaded", () => {

    const body = document.body;

    const themeToggle = document.getElementById("themeToggle");
    const quickTheme = document.getElementById("quickTheme");
    const compactMode = document.getElementById("compactMode");

    const currency = document.getElementById("currency");
    const splitMethod = document.getElementById("splitMethod");
    const category = document.getElementById("category");
    const precision = document.getElementById("precision");

    const privacy = document.getElementById("privacy");

    const expenseNotifications =
        document.getElementById("expenseNotifications");

    const paymentNotifications =
        document.getElementById("paymentNotifications");

    const groupNotifications =
        document.getElementById("groupNotifications");

    const weeklySummary =
        document.getElementById("weeklySummary");

    const saveSettings =
        document.getElementById("saveSettings");

    const logoutButton =
        document.getElementById("logoutButton");

    const logoutLink =
        document.getElementById("logoutLink");

    const changePassword =
        document.getElementById("changePassword");

    const twoFactor =
        document.getElementById("twoFactor");

    const exportData =
        document.getElementById("exportData");

    const generateReport =
        document.getElementById("generateReport");

    const deleteAccount =
        document.getElementById("deleteAccount");

    const toast =
        document.getElementById("toast");

    const toastTitle =
        document.getElementById("toastTitle");

    const toastText =
        document.getElementById("toastText");

    const closeToast =
        document.getElementById("closeToast");


    /* =========================
       STORAGE
    ========================= */

    const STORAGE_KEY = "evenSettings";


    const defaultSettings = {
        darkMode: false,
        compactMode: false,

        currency: "INR",
        splitMethod: "equal",
        category: "Food & Dining",
        precision: "2",

        privacy: false,

        expenseNotifications: true,
        paymentNotifications: true,
        groupNotifications: true,
        weeklySummary: false
    };


    function getSettings() {

        try {

            const saved =
                localStorage.getItem(STORAGE_KEY);

            if (!saved) {
                return { ...defaultSettings };
            }

            return {
                ...defaultSettings,
                ...JSON.parse(saved)
            };

        } catch (error) {

            console.error(
                "Unable to load settings:",
                error
            );

            return { ...defaultSettings };
        }
    }


    function saveToStorage() {

        const settings = {

            darkMode:
                themeToggle.checked,

            compactMode:
                compactMode.checked,

            currency:
                currency.value,

            splitMethod:
                splitMethod.value,

            category:
                category.value,

            precision:
                precision.value,

            privacy:
                privacy.checked,

            expenseNotifications:
                expenseNotifications.checked,

            paymentNotifications:
                paymentNotifications.checked,

            groupNotifications:
                groupNotifications.checked,

            weeklySummary:
                weeklySummary.checked
        };

        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(settings)
        );
    }


    /* =========================
       LOAD SETTINGS
    ========================= */

    function loadSettings() {

        const settings = getSettings();

        themeToggle.checked =
            settings.darkMode;

        compactMode.checked =
            settings.compactMode;

        currency.value =
            settings.currency;

        splitMethod.value =
            settings.splitMethod;

        category.value =
            settings.category;

        precision.value =
            settings.precision;

        privacy.checked =
            settings.privacy;

        expenseNotifications.checked =
            settings.expenseNotifications;

        paymentNotifications.checked =
            settings.paymentNotifications;

        groupNotifications.checked =
            settings.groupNotifications;

        weeklySummary.checked =
            settings.weeklySummary;

        applyTheme();
        applyCompactMode();
    }


    /* =========================
       THEME
    ========================= */

    function applyTheme() {

        const dark =
            themeToggle.checked;

        body.classList.toggle(
            "dark",
            dark
        );

        const icon =
            quickTheme.querySelector("i");

        if (dark) {

            icon.className =
                "fa-solid fa-sun";

            quickTheme.title =
                "Switch to light mode";

        } else {

            icon.className =
                "fa-solid fa-moon";

            quickTheme.title =
                "Switch to dark mode";
        }
    }


    themeToggle.addEventListener(
        "change",
        () => {

            applyTheme();
            saveToStorage();

            showToast(
                "Appearance Updated",
                themeToggle.checked
                    ? "Dark mode enabled."
                    : "Light mode enabled."
            );
        }
    );


    quickTheme.addEventListener(
        "click",
        () => {

            themeToggle.checked =
                !themeToggle.checked;

            applyTheme();
            saveToStorage();

            showToast(
                "Theme Changed",
                themeToggle.checked
                    ? "Dark mode enabled."
                    : "Light mode enabled."
            );
        }
    );


    /* =========================
       COMPACT MODE
    ========================= */

    function applyCompactMode() {

        body.classList.toggle(
            "compact",
            compactMode.checked
        );
    }


    compactMode.addEventListener(
        "change",
        () => {

            applyCompactMode();
            saveToStorage();

            showToast(
                "Display Updated",
                compactMode.checked
                    ? "Compact mode enabled."
                    : "Compact mode disabled."
            );
        }
    );


    /* =========================
       AUTO SAVE TOGGLES
    ========================= */

    const autoSaveControls = [

        privacy,

        expenseNotifications,
        paymentNotifications,
        groupNotifications,
        weeklySummary,

        currency,
        splitMethod,
        category,
        precision
    ];


    autoSaveControls.forEach(control => {

        control.addEventListener(
            "change",
            () => {

                saveToStorage();

                showToast(
                    "Preference Updated",
                    "Your preference has been saved."
                );
            }
        );

    });


    /* =========================
       SAVE BUTTON
    ========================= */

    saveSettings.addEventListener(
        "click",
        () => {

            saveToStorage();

            saveSettings.innerHTML =
                '<i class="fa-solid fa-check"></i> Saved';

            showToast(
                "Settings Saved",
                "Your EVEN preferences were saved successfully."
            );

            setTimeout(() => {

                saveSettings.innerHTML =
                    '<i class="fa-solid fa-check"></i> Save Changes';

            }, 1800);
        }
    );


    /* =========================
       PASSWORD
    ========================= */

    changePassword.addEventListener(
        "click",
        () => {

            showToast(
                "Password",
                "Password management is ready to connect with your backend."
            );

        }
    );


    /* =========================
       TWO FACTOR
    ========================= */

    twoFactor.addEventListener(
        "click",
        () => {

            if (
                twoFactor.textContent
                    .trim()
                    .toLowerCase()
                    .includes("enable")
            ) {

                twoFactor.textContent =
                    "Enabled";

                showToast(
                    "Security Enabled",
                    "Two-factor authentication has been enabled."
                );

            } else {

                twoFactor.textContent =
                    "Enable";

                showToast(
                    "Security Updated",
                    "Two-factor authentication has been disabled."
                );
            }
        }
    );


    /* =========================
       EXPORT DATA
    ========================= */

    exportData.addEventListener(
        "click",
        () => {

            const settings =
                localStorage.getItem(STORAGE_KEY);

            const data = {

                application:
                    "EVEN Smart Expense Splitting",

                exportedAt:
                    new Date().toISOString(),

                settings:
                    settings
                        ? JSON.parse(settings)
                        : defaultSettings
            };


            const blob =
                new Blob(
                    [
                        JSON.stringify(
                            data,
                            null,
                            2
                        )
                    ],
                    {
                        type: "application/json"
                    }
                );


            const url =
                URL.createObjectURL(blob);


            const link =
                document.createElement("a");

            link.href = url;

            link.download =
                "even-settings-export.json";

            document.body.appendChild(link);

            link.click();

            link.remove();

            URL.revokeObjectURL(url);


            showToast(
                "Export Complete",
                "Your EVEN settings were exported."
            );
        }
    );


    /* =========================
       REPORT
    ========================= */

    generateReport.addEventListener(
        "click",
        () => {

            showToast(
                "Report",
                "Report generation can now be connected to your reports API."
            );
        }
    );


    /* =========================
       LOGOUT
    ========================= */

    function logout() {

        const confirmed =
            confirm(
                "Are you sure you want to logout from EVEN?"
            );

        if (!confirmed) {
            return;
        }


        localStorage.removeItem("token");
        localStorage.removeItem("jwt");
        localStorage.removeItem("user");

        window.location.href =
            "login.html";
    }


    logoutButton.addEventListener(
        "click",
        logout
    );


    logoutLink.addEventListener(
        "click",
        event => {

            event.preventDefault();

            logout();
        }
    );


    /* =========================
       DELETE ACCOUNT
    ========================= */

    deleteAccount.addEventListener(
        "click",
        () => {

            const confirmed =
                confirm(
                    "Delete your EVEN account permanently?\n\nThis action cannot be undone."
                );

            if (!confirmed) {
                return;
            }


            showToast(
                "Account Deletion",
                "Connect this action to your Spring Boot delete-account API."
            );
        }
    );


    /* =========================
       TOAST
    ========================= */

    let toastTimer;


    function showToast(
        title,
        message
    ) {

        toastTitle.textContent =
            title;

        toastText.textContent =
            message;

        toast.classList.add("show");

        clearTimeout(toastTimer);

        toastTimer =
            setTimeout(() => {

                toast.classList.remove("show");

            }, 3500);
    }


    closeToast.addEventListener(
        "click",
        () => {

            toast.classList.remove(
                "show"
            );
        }
    );


    /* =========================
       SETTINGS NAVIGATION
    ========================= */

    const navLinks =
        document.querySelectorAll(
            ".setting-nav-link"
        );


    navLinks.forEach(link => {

        link.addEventListener(
            "click",
            () => {

                navLinks.forEach(item => {

                    item.classList.remove(
                        "active"
                    );

                });

                link.classList.add(
                    "active"
                );
            }
        );

    });


    /* =========================
       ACTIVE SECTION ON SCROLL
    ========================= */

    const sections =
        document.querySelectorAll(
            ".settings-card"
        );


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) {
                        return;
                    }

                    const id =
                        entry.target.id;

                    navLinks.forEach(link => {

                        link.classList.toggle(
                            "active",
                            link.getAttribute("href")
                                === `#${id}`
                        );

                    });

                });

            },
            {
                rootMargin:
                    "-20% 0px -70% 0px"
            }
        );


    sections.forEach(section => {

        observer.observe(section);

    });


    /* =========================
       INITIALIZE
    ========================= */

    loadSettings();

});

