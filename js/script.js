document.addEventListener("DOMContentLoaded", function () {

    /* ==========================================
       DARK MODE TOGGLE
    ========================================== */

    const themeToggle = document.getElementById("themeToggle");
    const themeIcon = document.getElementById("themeIcon");

    if (!themeToggle || !themeIcon) {
        console.error("Theme toggle elements not found.");
        return;
    }


    /* ------------------------------------------
       APPLY THEME
    ------------------------------------------ */

    function applyTheme(theme) {

        if (theme === "dark") {

            document.body.classList.add("dark-mode");

            themeIcon.classList.remove("fa-moon");
            themeIcon.classList.add("fa-sun");

            themeToggle.setAttribute(
                "aria-label",
                "Switch to light mode"
            );

            themeToggle.setAttribute(
                "title",
                "Switch to light mode"
            );

        } else {

            document.body.classList.remove("dark-mode");

            themeIcon.classList.remove("fa-sun");
            themeIcon.classList.add("fa-moon");

            themeToggle.setAttribute(
                "aria-label",
                "Switch to dark mode"
            );

            themeToggle.setAttribute(
                "title",
                "Switch to dark mode"
            );
        }
    }


    /* ------------------------------------------
       LOAD SAVED THEME
    ------------------------------------------ */

    const savedTheme = localStorage.getItem("splitledger-theme");

    if (savedTheme === "dark") {
        applyTheme("dark");
    } else {
        applyTheme("light");
    }


    /* ------------------------------------------
       TOGGLE BUTTON
    ------------------------------------------ */

    themeToggle.addEventListener("click", function () {

        const isDark = document.body.classList.contains("dark-mode");

        if (isDark) {

            applyTheme("light");

            localStorage.setItem(
                "splitledger-theme",
                "light"
            );

        } else {

            applyTheme("dark");

            localStorage.setItem(
                "splitledger-theme",
                "dark"
            );
        }

    });


    /* ==========================================
       MOBILE MENU
    ========================================== */

    const mobileMenu = document.getElementById("mobileMenu");
    const navLinks = document.getElementById("navLinks");

    if (mobileMenu && navLinks) {

        mobileMenu.addEventListener("click", function () {

            navLinks.classList.toggle("show");

            const icon = mobileMenu.querySelector("i");

            if (navLinks.classList.contains("show")) {

                icon.classList.remove("fa-bars");
                icon.classList.add("fa-xmark");

            } else {

                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");

            }

        });


        /* Close mobile menu after clicking link */

        const links = navLinks.querySelectorAll("a");

        links.forEach(function (link) {

            link.addEventListener("click", function () {

                navLinks.classList.remove("show");

                const icon = mobileMenu.querySelector("i");

                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");

            });

        });

    }


    /* ==========================================
       STAT COUNTERS
    ========================================== */

    const counters = document.querySelectorAll(".counter");

    const counterObserver = new IntersectionObserver(
        function (entries, observer) {

            entries.forEach(function (entry) {

                if (!entry.isIntersecting) {
                    return;
                }

                const counter = entry.target;

                const target = Number(
                    counter.getAttribute("data-target")
                );

                let current = 0;

                const duration = 1200;

                const startTime = performance.now();


                function updateCounter(currentTime) {

                    const elapsed = currentTime - startTime;

                    const progress = Math.min(
                        elapsed / duration,
                        1
                    );

                    current = Math.floor(
                        progress * target
                    );

                    counter.textContent = current;

                    if (progress < 1) {
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                    }
                }


                requestAnimationFrame(updateCounter);

                observer.unobserve(counter);

            });

        },
        {
            threshold: 0.5
        }
    );


    counters.forEach(function (counter) {
        counterObserver.observe(counter);
    });


    /* ==========================================
       NAVBAR SCROLL EFFECT
    ========================================== */

    window.addEventListener("scroll", function () {

        const navbar = document.querySelector(".navbar");

        if (!navbar) {
            return;
        }

        if (window.scrollY > 30) {

            navbar.style.boxShadow =
                "0 18px 45px rgba(72,49,160,0.13)";

        } else {

            navbar.style.boxShadow =
                "0 15px 40px rgba(72,49,160,0.08)";
        }

    });


    console.log("Splitledger loaded successfully.");
    console.log("Dark mode toggle ready.");

});