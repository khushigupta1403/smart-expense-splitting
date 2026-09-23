/* =====================================================
   EVEN DASHBOARD JAVASCRIPT
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    /* =================================================
       THEME TOGGLE
    ================================================= */

    const themeBtn = document.getElementById("themeBtn");
    const themeIcon = document.getElementById("themeIcon");

    const savedTheme = localStorage.getItem("even-theme");

    if (savedTheme === "dark") {

        document.body.classList.add("dark");

        if (themeIcon) {
            themeIcon.className = "fa-solid fa-sun";
        }

    } else {

        document.body.classList.remove("dark");

        if (themeIcon) {
            themeIcon.className = "fa-solid fa-moon";
        }
    }


    if (themeBtn) {

        themeBtn.addEventListener("click", function (event) {

            event.preventDefault();

            document.body.classList.toggle("dark");

            const isDark =
                document.body.classList.contains("dark");

            localStorage.setItem(
                "even-theme",
                isDark ? "dark" : "light"
            );

            if (themeIcon) {

                themeIcon.className = isDark
                    ? "fa-solid fa-sun"
                    : "fa-solid fa-moon";
            }

            showToast(
                isDark
                    ? "Dark mode enabled 🌙"
                    : "Light mode enabled ☀️"
            );

            updateCharts();

        });

    }


    /* =================================================
       MOBILE SIDEBAR
    ================================================= */

    const mobileMenu =
        document.getElementById("mobileMenu");

    const sidebar =
        document.getElementById("sidebar");

    if (mobileMenu && sidebar) {

        mobileMenu.addEventListener("click", function () {

            sidebar.classList.toggle("open");

        });

    }


    /* =================================================
       NOTIFICATIONS
    ================================================= */

    const notificationBtn =
        document.getElementById("notificationBtn");

    const notificationPanel =
        document.getElementById("notificationPanel");

    if (notificationBtn) {

        notificationBtn.addEventListener(
            "click",
            function (event) {

                event.stopPropagation();

                notificationPanel.classList.toggle("show");

                profileMenu.classList.remove("show");

            }
        );

    }


    /* =================================================
       PROFILE MENU
    ================================================= */

    const profileBtn =
        document.getElementById("profileBtn");

    const profileMenu =
        document.getElementById("profileMenu");

    if (profileBtn) {

        profileBtn.addEventListener(
            "click",
            function (event) {

                event.stopPropagation();

                profileMenu.classList.toggle("show");

                if (notificationPanel) {
                    notificationPanel.classList.remove("show");
                }

            }
        );

    }


    document.addEventListener("click", function () {

        if (notificationPanel) {
            notificationPanel.classList.remove("show");
        }

        if (profileMenu) {
            profileMenu.classList.remove("show");
        }

    });


    /* =================================================
       SEARCH
    ================================================= */

    const searchInput =
        document.getElementById("searchInput");

    if (searchInput) {

        searchInput.addEventListener(
            "input",
            function () {

                const search =
                    this.value.toLowerCase().trim();

                const rows =
                    document.querySelectorAll(".expense-row");

                rows.forEach(function (row) {

                    const text =
                        row.textContent.toLowerCase();

                    if (text.includes(search)) {

                        row.style.display = "";

                    } else {

                        row.style.display = "none";

                    }

                });

            }
        );

    }


    /* =================================================
       CHARTS
    ================================================= */

    createExpenseChart();

    createMonthlyChart();


    /* =================================================
       ANIMATED NUMBERS
    ================================================= */

    animateNumber(
        "totalBalance",
        12450,
        "₹"
    );

    animateNumber(
        "youOwe",
        2850,
        "₹"
    );

    animateNumber(
        "youGet",
        6200,
        "₹"
    );

    animateNumber(
        "thisMonth",
        18500,
        "₹"
    );

});


/* =====================================================
   EXPENSE DOUGHNUT
===================================================== */

let expenseChart = null;

function createExpenseChart() {

    const canvas =
        document.getElementById("expenseChart");

    if (!canvas) return;

    const isDark =
        document.body.classList.contains("dark");

    const textColor =
        isDark ? "#f5f5fa" : "#202033";

    expenseChart =
        new Chart(canvas, {

            type: "doughnut",

            data: {

                labels: [
                    "Food",
                    "Travel",
                    "Shopping",
                    "Bills"
                ],

                datasets: [{

                    data: [
                        35,
                        25,
                        20,
                        20
                    ],

                    backgroundColor: [
                        "#8d7cf0",
                        "#6da8f7",
                        "#e98fb2",
                        "#65c99b"
                    ],

                    borderWidth: 0,

                    hoverOffset: 7
                }]

            },

            options: {

                responsive: true,

                maintainAspectRatio: false,

                cutout: "73%",

                plugins: {

                    legend: {
                        display: false
                    },

                    tooltip: {

                        backgroundColor:
                            isDark
                                ? "#292938"
                                : "#252437",

                        titleColor: "#fff",

                        bodyColor: "#fff",

                        padding: 10,

                        displayColors: true
                    }

                },

                animation: {

                    animateRotate: true,

                    duration: 1200
                }

            }

        });

}


/* =====================================================
   MONTHLY CHART
===================================================== */

let monthlyChart = null;

function createMonthlyChart() {

    const canvas =
        document.getElementById("monthlyChart");

    if (!canvas) return;

    const isDark =
        document.body.classList.contains("dark");

    const gridColor =
        isDark
            ? "rgba(255,255,255,.06)"
            : "rgba(60,60,90,.07)";

    const textColor =
        isDark
            ? "#9b9bad"
            : "#85859a";

    monthlyChart =
        new Chart(canvas, {

            type: "line",

            data: {

                labels: [
                    "Jan",
                    "Feb",
                    "Mar",
                    "Apr",
                    "May",
                    "Jun",
                    "Jul",
                    "Aug"
                ],

                datasets: [{

                    label: "Spending",

                    data: [
                        10800,
                        12500,
                        9850,
                        14200,
                        16800,
                        21400,
                        15100,
                        18500
                    ],

                    borderColor: "#7867e8",

                    backgroundColor:
                        "rgba(120,103,232,.10)",

                    fill: true,

                    tension: .4,

                    borderWidth: 2.5,

                    pointRadius: 3,

                    pointHoverRadius: 6,

                    pointBackgroundColor:
                        "#7867e8"
                }]

            },

            options: {

                responsive: true,

                maintainAspectRatio: false,

                plugins: {

                    legend: {
                        display: false
                    }

                },

                scales: {

                    x: {

                        grid: {
                            display: false
                        },

                        ticks: {
                            color: textColor,
                            font: {
                                size: 9
                            }
                        }

                    },

                    y: {

                        beginAtZero: true,

                        grid: {
                            color: gridColor
                        },

                        border: {
                            display: false
                        },

                        ticks: {

                            color: textColor,

                            font: {
                                size: 8
                            },

                            callback: function (value) {

                                return "₹" +
                                    (value / 1000) +
                                    "K";

                            }

                        }

                    }

                },

                interaction: {

                    intersect: false,

                    mode: "index"

                },

                animation: {

                    duration: 1200,

                    easing: "easeOutQuart"

                }

            }

        });

}


/* =====================================================
   UPDATE CHARTS AFTER THEME
===================================================== */

function updateCharts() {

    if (expenseChart) {

        const isDark =
            document.body.classList.contains("dark");

        expenseChart.options.plugins.tooltip.backgroundColor =
            isDark ? "#292938" : "#252437";

        expenseChart.update();

    }

    if (monthlyChart) {

        const isDark =
            document.body.classList.contains("dark");

        monthlyChart.options.scales.x.ticks.color =
            isDark ? "#9b9bad" : "#85859a";

        monthlyChart.options.scales.y.ticks.color =
            isDark ? "#9b9bad" : "#85859a";

        monthlyChart.options.scales.y.grid.color =
            isDark
                ? "rgba(255,255,255,.06)"
                : "rgba(60,60,90,.07)";

        monthlyChart.update();

    }

}


/* =====================================================
   ANIMATED NUMBERS
===================================================== */

function animateNumber(
    elementId,
    target,
    prefix
) {

    const element =
        document.getElementById(elementId);

    if (!element) return;

    let current = 0;

    const duration = 900;

    const start =
        performance.now();

    function update(time) {

        const progress =
            Math.min(
                (time - start) / duration,
                1
            );

        current =
            Math.floor(
                progress * target
            );

        element.textContent =
            prefix +
            current.toLocaleString("en-IN");

        if (progress < 1) {

            requestAnimationFrame(update);

        }

    }

    requestAnimationFrame(update);

}


/* =====================================================
   EXPORT
===================================================== */

function exportDashboard() {

    const report = `

EVEN - SMART EXPENSE SUMMARY
=============================

User: Khushi Gupta
Date: ${new Date().toLocaleDateString()}

Total Balance: ₹12,450
You Owe: ₹2,850
You Get: ₹6,200
This Month: ₹18,500

Recent Expenses
---------------

Pizza Night       ₹850
Movie Tickets     ₹1,200
Goa Hotel         ₹6,400
Coffee            ₹320

Generated by EVEN
Smart Expense Splitting

`;

    const blob =
        new Blob(
            [report],
            {
                type: "text/plain"
            }
        );

    const url =
        URL.createObjectURL(blob);

    const link =
        document.createElement("a");

    link.href = url;

    link.download =
        "EVEN-Expense-Report.txt";

    link.click();

    URL.revokeObjectURL(url);

    showToast(
        "Report exported successfully ✓"
    );

}


/* =====================================================
   TOAST
===================================================== */

function showToast(message) {

    const toast =
        document.getElementById("toast");

    if (!toast) return;

    toast.textContent = message;

    toast.classList.add("show");

    setTimeout(function () {

        toast.classList.remove("show");

    }, 2500);

}


/* =====================================================
   LOGOUT
===================================================== */

function logout() {

    localStorage.removeItem("token");

    localStorage.removeItem("user");

}