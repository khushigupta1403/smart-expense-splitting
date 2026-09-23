/* =========================================================
   EVEN - EXPENSES PAGE
   Complete Frontend JavaScript
========================================================= */

const EXPENSE_STORAGE_KEY = "even_expenses";


/* =========================================================
   DEFAULT DATA
========================================================= */

const DEFAULT_EXPENSES = [
    {
        id: 1,
        title: "Beach Shack Dinner",
        amount: 2400,
        category: "Food",
        group: "Goa Trip",
        paidBy: "You",
        members: 4,
        payment: "UPI",
        notes: "Dinner with friends",
        date: "2026-08-07"
    },
    {
        id: 2,
        title: "Hotel Booking",
        amount: 5600,
        category: "Travel",
        group: "Goa Trip",
        paidBy: "Rahul",
        members: 4,
        payment: "Card",
        notes: "Two nights hotel",
        date: "2026-08-06"
    },
    {
        id: 3,
        title: "Movie Tickets",
        amount: 1200,
        category: "Other",
        group: "Weekend",
        paidBy: "You",
        members: 3,
        payment: "UPI",
        notes: "Weekend movie",
        date: "2026-08-05"
    },
    {
        id: 4,
        title: "Grocery Shopping",
        amount: 1850,
        category: "Shopping",
        group: "Flatmates",
        paidBy: "Priya",
        members: 3,
        payment: "UPI",
        notes: "",
        date: "2026-08-03"
    }
];


/* =========================================================
   PAGE LOAD
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    initializeExpenses();

    loadGroupFilter();

    renderExpenses();

    updateSummary();

    setupModal();

});


/* =========================================================
   INITIALIZE STORAGE
========================================================= */

function initializeExpenses() {

    const savedExpenses =
        localStorage.getItem(EXPENSE_STORAGE_KEY);

    if (!savedExpenses) {

        localStorage.setItem(
            EXPENSE_STORAGE_KEY,
            JSON.stringify(DEFAULT_EXPENSES)
        );
    }
}


/* =========================================================
   GET EXPENSES
========================================================= */

function getExpenses() {

    const savedExpenses =
        localStorage.getItem(EXPENSE_STORAGE_KEY);

    if (!savedExpenses) {

        return [];
    }

    try {

        const expenses =
            JSON.parse(savedExpenses);

        return Array.isArray(expenses)
            ? expenses
            : [];

    } catch (error) {

        console.error(
            "Error loading expenses:",
            error
        );

        return [];
    }
}


/* =========================================================
   SAVE EXPENSES
========================================================= */

function saveExpenses(expenses) {

    localStorage.setItem(
        EXPENSE_STORAGE_KEY,
        JSON.stringify(expenses)
    );
}


/* =========================================================
   RENDER EXPENSES
========================================================= */

function renderExpenses() {

    const expenseList =
        document.getElementById("expenseList");

    if (!expenseList) {
        return;
    }


    let expenses =
        getExpenses();


    /* CATEGORY */

    const categoryFilter =
        document.getElementById("categoryFilter");

    const selectedCategory =
        categoryFilter
            ? categoryFilter.value
            : "All Categories";


    if (selectedCategory !== "All Categories") {

        expenses = expenses.filter(function (expense) {

            return expense.category === selectedCategory;

        });
    }


    /* GROUP */

    const groupFilter =
        document.getElementById("groupFilter");

    const selectedGroup =
        groupFilter
            ? groupFilter.value
            : "All Groups";


    if (selectedGroup !== "All Groups") {

        expenses = expenses.filter(function (expense) {

            return expense.group === selectedGroup;

        });
    }


    /* SORT */

    const sortSelect =
        document.getElementById("sortExpense");

    const sortType =
        sortSelect
            ? sortSelect.value
            : "latest";


    if (sortType === "latest") {

        expenses.sort(function (a, b) {

            return new Date(b.date) -
                   new Date(a.date);

        });

    } else if (sortType === "highest") {

        expenses.sort(function (a, b) {

            return Number(b.amount) -
                   Number(a.amount);

        });

    } else if (sortType === "lowest") {

        expenses.sort(function (a, b) {

            return Number(a.amount) -
                   Number(b.amount);

        });
    }


    /* EMPTY */

    if (expenses.length === 0) {

        expenseList.innerHTML = `
            <div class="empty-state">

                <i class="fa-solid fa-receipt"></i>

                <h3>No expenses found</h3>

                <p>
                    Try changing your filters or add a new expense.
                </p>

            </div>
        `;

        return;
    }


    /* LIST */

    let html = "";

    expenses.forEach(function (expense) {

        html += createExpenseHTML(expense);

    });


    expenseList.innerHTML = html;
}


/* =========================================================
   CREATE EXPENSE CARD
========================================================= */

function createExpenseHTML(expense) {

    const icon =
        getCategoryIcon(expense.category);

    const amount =
        formatCurrency(expense.amount);

    const date =
        formatDate(expense.date);

    const paidBy =
        escapeHTML(expense.paidBy || "Unknown");

    const group =
        escapeHTML(expense.group || "No Group");

    const title =
        escapeHTML(expense.title || "Untitled Expense");

    const category =
        escapeHTML(expense.category || "Other");

    const members =
        Number(expense.members) || 1;

    const share =
        Number(expense.amount) / members;

    const paidText =
        String(expense.paidBy).toLowerCase() === "you"
            ? "Paid by you"
            : "Paid by " + paidBy;


    return `
        <div class="expense-item">

            <div class="expense-left">

                <div class="expense-icon">

                    <i class="${icon}"></i>

                </div>

                <div class="expense-info">

                    <h3>${title}</h3>

                    <p>
                        ${date} · ${paidText}
                    </p>

                </div>

            </div>


            <div class="expense-meta">

                <span class="expense-category">
                    ${category}
                </span>

                <span class="expense-group">
                    ${group}
                </span>

            </div>


            <div class="expense-right">

                <div class="expense-amount">

                    <strong>
                        ${amount}
                    </strong>

                    <span>
                        ₹${formatNumber(share)} / person
                    </span>

                </div>


                <button
                    type="button"
                    class="delete-expense"
                    onclick="deleteExpense(${expense.id})"
                    title="Delete expense"
                    style="
                        width:34px;
                        height:34px;
                        border:1px solid #e6e9f0;
                        background:#ffffff;
                        color:#98a2b3;
                        border-radius:8px;
                        cursor:pointer;
                    "
                >

                    <i class="fa-regular fa-trash-can"></i>

                </button>

            </div>

        </div>
    `;
}


/* =========================================================
   CATEGORY ICON
========================================================= */

function getCategoryIcon(category) {

    switch (category) {

        case "Food":
            return "fa-solid fa-utensils";

        case "Travel":
            return "fa-solid fa-plane";

        case "Shopping":
            return "fa-solid fa-bag-shopping";

        case "Bills":
            return "fa-solid fa-file-invoice";

        default:
            return "fa-solid fa-receipt";
    }
}


/* =========================================================
   ADD EXPENSE
========================================================= */

function addExpense() {

    const titleElement =
        document.getElementById("title");

    const amountElement =
        document.getElementById("amount");

    const categoryElement =
        document.getElementById("category");

    const groupElement =
        document.getElementById("group");

    const paidByElement =
        document.getElementById("paidBy");

    const membersElement =
        document.getElementById("members");

    const paymentElement =
        document.getElementById("payment");

    const notesElement =
        document.getElementById("notes");


    if (!titleElement ||
        !amountElement ||
        !categoryElement ||
        !groupElement ||
        !paidByElement ||
        !membersElement ||
        !paymentElement ||
        !notesElement) {

        showMessage(
            "Expense form could not be loaded.",
            "error"
        );

        return;
    }


    const title =
        titleElement.value.trim();

    const amount =
        Number(amountElement.value);

    const category =
        categoryElement.value;

    const group =
        groupElement.value.trim();

    const paidBy =
        paidByElement.value.trim();

    const members =
        Number(membersElement.value);

    const payment =
        paymentElement.value;

    const notes =
        notesElement.value.trim();


    /* VALIDATION */

    if (title === "") {

        showMessage(
            "Please enter an expense title.",
            "error"
        );

        titleElement.focus();

        return;
    }


    if (!amount || amount <= 0) {

        showMessage(
            "Please enter a valid amount.",
            "error"
        );

        amountElement.focus();

        return;
    }


    if (group === "") {

        showMessage(
            "Please enter a group name.",
            "error"
        );

        groupElement.focus();

        return;
    }


    if (paidBy === "") {

        showMessage(
            "Please enter who paid.",
            "error"
        );

        paidByElement.focus();

        return;
    }


    if (!members || members < 1) {

        showMessage(
            "Please enter the number of members.",
            "error"
        );

        membersElement.focus();

        return;
    }


    /* CREATE EXPENSE */

    const expenses =
        getExpenses();


    const newExpense = {

        id: Date.now(),

        title: title,

        amount: amount,

        category: category,

        group: group,

        paidBy: paidBy,

        members: members,

        payment: payment,

        notes: notes,

        date: getToday()

    };


    expenses.unshift(newExpense);


    saveExpenses(expenses);


    /* UPDATE PAGE */

    loadGroupFilter();

    renderExpenses();

    updateSummary();


    /* RESET */

    clearExpenseForm();


    /* CLOSE */

    closeExpenseModal();


    showMessage(
        "Expense added successfully.",
        "success"
    );
}


/* =========================================================
   DELETE EXPENSE
========================================================= */

function deleteExpense(id) {

    const confirmed =
        window.confirm(
            "Are you sure you want to delete this expense?"
        );


    if (!confirmed) {
        return;
    }


    let expenses =
        getExpenses();


    expenses =
        expenses.filter(function (expense) {

            return Number(expense.id) !== Number(id);

        });


    saveExpenses(expenses);


    loadGroupFilter();

    renderExpenses();

    updateSummary();


    showMessage(
        "Expense deleted successfully.",
        "success"
    );
}


/* =========================================================
   UPDATE SUMMARY
========================================================= */

function updateSummary() {

    const expenses =
        getExpenses();


    let youPaid = 0;

    let youOwe = 0;


    expenses.forEach(function (expense) {

        const amount =
            Number(expense.amount) || 0;

        const members =
            Number(expense.members) || 1;


        const payer =
            String(expense.paidBy || "")
                .trim()
                .toLowerCase();


        if (payer === "you") {

            youPaid += amount;

        } else {

            youOwe += amount / members;
        }

    });


    /* GROUP COUNT */

    const groupNames = [];


    expenses.forEach(function (expense) {

        const group =
            String(expense.group || "").trim();

        if (
            group !== "" &&
            groupNames.indexOf(group) === -1
        ) {

            groupNames.push(group);
        }

    });


    /* UPDATE HTML */

    const paidElement =
        document.getElementById("youPaid");

    const oweElement =
        document.getElementById("youOwe");

    const groupElement =
        document.getElementById("groupCount");


    if (paidElement) {

        paidElement.textContent =
            formatCurrency(youPaid);
    }


    if (oweElement) {

        oweElement.textContent =
            formatCurrency(youOwe);
    }


    if (groupElement) {

        groupElement.textContent =
            groupNames.length;
    }
}


/* =========================================================
   GROUP FILTER
========================================================= */

function loadGroupFilter() {

    const groupFilter =
        document.getElementById("groupFilter");


    if (!groupFilter) {
        return;
    }


    const oldValue =
        groupFilter.value;


    const expenses =
        getExpenses();


    const groups = [];


    expenses.forEach(function (expense) {

        const group =
            String(expense.group || "").trim();


        if (
            group !== "" &&
            groups.indexOf(group) === -1
        ) {

            groups.push(group);
        }

    });


    groups.sort();


    groupFilter.innerHTML = "";


    const allOption =
        document.createElement("option");

    allOption.value =
        "All Groups";

    allOption.textContent =
        "All Groups";

    groupFilter.appendChild(allOption);


    groups.forEach(function (group) {

        const option =
            document.createElement("option");

        option.value =
            group;

        option.textContent =
            group;

        groupFilter.appendChild(option);

    });


    if (groups.indexOf(oldValue) !== -1) {

        groupFilter.value =
            oldValue;

    } else {

        groupFilter.value =
            "All Groups";
    }
}


/* =========================================================
   CLEAR FORM
========================================================= */

function clearExpenseForm() {

    const title =
        document.getElementById("title");

    const amount =
        document.getElementById("amount");

    const group =
        document.getElementById("group");

    const paidBy =
        document.getElementById("paidBy");

    const members =
        document.getElementById("members");

    const notes =
        document.getElementById("notes");

    const category =
        document.getElementById("category");

    const payment =
        document.getElementById("payment");


    if (title) {
        title.value = "";
    }

    if (amount) {
        amount.value = "";
    }

    if (group) {
        group.value = "";
    }

    if (paidBy) {
        paidBy.value = "";
    }

    if (members) {
        members.value = "";
    }

    if (notes) {
        notes.value = "";
    }

    if (category) {
        category.value = "Food";
    }

    if (payment) {
        payment.value = "UPI";
    }
}


/* =========================================================
   OPEN MODAL
========================================================= */

function openExpenseModal() {

    const modal =
        document.getElementById("expenseModal");


    if (!modal) {

        showMessage(
            "Expense modal not found.",
            "error"
        );

        return;
    }


    modal.classList.add("show");


    document.body.style.overflow =
        "hidden";


    const title =
        document.getElementById("title");


    if (title) {

        setTimeout(function () {

            title.focus();

        }, 100);
    }
}


/* =========================================================
   CLOSE MODAL
========================================================= */

function closeExpenseModal() {

    const modal =
        document.getElementById("expenseModal");


    if (!modal) {
        return;
    }


    modal.classList.remove("show");


    document.body.style.overflow =
        "";
}


/* =========================================================
   MODAL EVENTS
========================================================= */

function setupModal() {

    const modal =
        document.getElementById("expenseModal");


    if (!modal) {
        return;
    }


    /* CLICK OUTSIDE */

    modal.addEventListener(
        "click",
        function (event) {

            if (event.target === modal) {

                closeExpenseModal();
            }

        }
    );


    /* ESC KEY */

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape" &&
                modal.classList.contains("show")
            ) {

                closeExpenseModal();
            }

        }
    );
}


/* =========================================================
   EXPORT CSV
========================================================= */

function exportExpenses() {

    const expenses =
        getExpenses();


    if (expenses.length === 0) {

        showMessage(
            "There are no expenses to export.",
            "error"
        );

        return;
    }


    const headers = [
        "Title",
        "Amount",
        "Category",
        "Group",
        "Paid By",
        "Members",
        "Payment Mode",
        "Notes",
        "Date"
    ];


    const rows = [];


    expenses.forEach(function (expense) {

        rows.push([

            expense.title,

            expense.amount,

            expense.category,

            expense.group,

            expense.paidBy,

            expense.members,

            expense.payment,

            expense.notes,

            expense.date

        ]);

    });


    const csvRows = [];


    csvRows.push(
        headers.map(csvEscape).join(",")
    );


    rows.forEach(function (row) {

        csvRows.push(
            row.map(csvEscape).join(",")
        );

    });


    const csv =
        csvRows.join("\n");


    const blob =
        new Blob(
            [csv],
            {
                type: "text/csv;charset=utf-8;"
            }
        );


    const url =
        URL.createObjectURL(blob);


    const link =
        document.createElement("a");


    link.href = url;

    link.download =
        "EVEN-Expenses-" + getToday() + ".csv";


    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);


    URL.revokeObjectURL(url);


    showMessage(
        "Expenses exported successfully.",
        "success"
    );
}


/* =========================================================
   CSV ESCAPE
========================================================= */

function csvEscape(value) {

    const text =
        String(value === null || value === undefined
            ? ""
            : value);


    return '"' +
        text.replace(/"/g, '""') +
        '"';
}


/* =========================================================
   FORMAT CURRENCY
========================================================= */

function formatCurrency(amount) {

    return "₹" + formatNumber(amount);
}


function formatNumber(amount) {

    return Number(amount || 0).toLocaleString(
        "en-IN",
        {
            minimumFractionDigits: 0,
            maximumFractionDigits: 2
        }
    );
}


/* =========================================================
   FORMAT DATE
========================================================= */

function formatDate(dateString) {

    if (!dateString) {

        return "No date";
    }


    const date =
        new Date(dateString);


    if (isNaN(date.getTime())) {

        return dateString;
    }


    return date.toLocaleDateString(
        "en-IN",
        {
            day: "2-digit",
            month: "short",
            year: "numeric"
        }
    );
}


/* =========================================================
   TODAY
========================================================= */

function getToday() {

    const date =
        new Date();


    const year =
        date.getFullYear();


    const month =
        String(date.getMonth() + 1)
            .padStart(2, "0");


    const day =
        String(date.getDate())
            .padStart(2, "0");


    return year + "-" + month + "-" + day;
}


/* =========================================================
   ESCAPE HTML
========================================================= */

function escapeHTML(value) {

    return String(
        value === null || value === undefined
            ? ""
            : value
    )
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


/* =========================================================
   NOTIFICATION
========================================================= */

function showMessage(message, type) {

    if (!type) {
        type = "success";
    }


    let notification =
        document.getElementById(
            "evenNotification"
        );


    if (!notification) {

        notification =
            document.createElement("div");

        notification.id =
            "evenNotification";


        notification.style.position =
            "fixed";

        notification.style.right =
            "24px";

        notification.style.bottom =
            "24px";

        notification.style.zIndex =
            "9999";

        notification.style.padding =
            "13px 18px";

        notification.style.borderRadius =
            "10px";

        notification.style.background =
            "#ffffff";

        notification.style.border =
            "1px solid #e6e9f0";

        notification.style.boxShadow =
            "0 10px 30px rgba(15, 23, 42, 0.12)";

        notification.style.fontFamily =
            "Inter, sans-serif";

        notification.style.fontSize =
            "12px";

        notification.style.fontWeight =
            "700";

        notification.style.transition =
            "opacity 0.25s ease";

        document.body.appendChild(
            notification
        );
    }


    notification.textContent =
        message;


    if (type === "error") {

        notification.style.color =
            "#dc2626";

    } else {

        notification.style.color =
            "#16a34a";
    }


    notification.style.opacity =
        "1";


    if (window.evenNotificationTimer) {

        clearTimeout(
            window.evenNotificationTimer
        );
    }


    window.evenNotificationTimer =
        setTimeout(function () {

            notification.style.opacity =
                "0";

        }, 2500);
}