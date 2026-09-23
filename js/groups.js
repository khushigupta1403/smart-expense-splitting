/* ==========================================
   EVEN — Groups JavaScript
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    const modal = document.getElementById("groupModal");
    const openBtn = document.getElementById("openModal");
    const form = document.getElementById("groupForm");
    const search = document.getElementById("searchGroups");
    const sort = document.getElementById("sortGroups");
    const grid = document.getElementById("groupGrid");
    const empty = document.getElementById("emptyState");
    const mobileMenu = document.getElementById("mobileMenu");
    const sidebar = document.getElementById("sidebar");
    const themeBtn = document.getElementById("themeBtn");

    /* ======================================
       LOAD THEME
    ====================================== */

    const savedTheme = localStorage.getItem("even-theme");

    if (savedTheme === "dark") {
        document.body.classList.add("dark-mode");
        updateThemeIcon();
    }

    if (themeBtn) {

        themeBtn.addEventListener("click", () => {

            document.body.classList.toggle("dark-mode");

            const dark =
                document.body.classList.contains("dark-mode");

            localStorage.setItem(
                "even-theme",
                dark ? "dark" : "light"
            );

            updateThemeIcon();

        });

    }


    /* ======================================
       MOBILE MENU
    ====================================== */

    if (mobileMenu) {

        mobileMenu.addEventListener("click", () => {
            sidebar.classList.toggle("open");
        });

    }


    /* ======================================
       OPEN MODAL
    ====================================== */

    if (openBtn) {

        openBtn.addEventListener("click", openCreateModal);

    }


    /* ======================================
       CREATE GROUP
    ====================================== */

    if (form) {

        form.addEventListener("submit", function (e) {

            e.preventDefault();

            const name =
                document.getElementById("groupName").value.trim();

            const description =
                document.getElementById("groupDescription").value.trim();

            const type =
                document.getElementById("groupType").value;

            if (!name) {
                showToast("Please enter a group name.");
                return;
            }

            addGroup(
                name,
                description || "New expense group",
                type
            );

            closeCreateModal();

            form.reset();

            showToast(
                `"${name}" group created successfully!`
            );

        });

    }


    /* ======================================
       SEARCH
    ====================================== */

    if (search) {

        search.addEventListener("input", filterGroups);

    }


    /* ======================================
       SORT
    ====================================== */

    if (sort) {

        sort.addEventListener("change", sortGroups);

    }


    updateGroupCount();

});


/* ==========================================
   MODAL
========================================== */

function openCreateModal() {

    const modal =
        document.getElementById("groupModal");

    if (modal) {
        modal.classList.add("show");

        setTimeout(() => {

            document
                .getElementById("groupName")
                ?.focus();

        }, 100);

    }

}


function closeCreateModal() {

    const modal =
        document.getElementById("groupModal");

    if (modal) {
        modal.classList.remove("show");
    }

}


/* ==========================================
   ADD GROUP
========================================== */

function addGroup(name, description, type) {

    const grid =
        document.getElementById("groupGrid");

    if (!grid) return;

    const icons = {

        home: "fa-house",
        travel: "fa-umbrella-beach",
        college: "fa-graduation-cap",
        work: "fa-briefcase",
        other: "fa-users"

    };

    const covers = {

        home: "purple-cover",
        travel: "blue-cover",
        college: "pink-cover",
        work: "green-cover",
        other: "purple-cover"

    };

    const icon =
        icons[type] || icons.other;

    const cover =
        covers[type] || covers.other;

    const card =
        document.createElement("article");

    card.className = "group-card";

    card.dataset.name = name;
    card.dataset.amount = "0";
    card.dataset.members = "1";

    card.innerHTML = `

        <div class="group-cover ${cover}">

            <div class="group-icon">
                <i class="fa-solid ${icon}"></i>
            </div>

            <button
                class="more-btn"
                onclick="toggleMenu(this)">

                <i class="fa-solid fa-ellipsis"></i>

            </button>

            <div class="action-menu">

                <button onclick="editGroup('${escapeHtml(name)}')">
                    <i class="fa-solid fa-pen"></i>
                    Edit
                </button>

                <button onclick="deleteGroup(this)">
                    <i class="fa-solid fa-trash"></i>
                    Delete
                </button>

            </div>

        </div>


        <div class="group-content">

            <div class="group-title">

                <div>

                    <h3>${escapeHtml(name)}</h3>

                    <p>${escapeHtml(description)}</p>

                </div>

                <span class="status active-status">
                    Active
                </span>

            </div>


            <div class="members">

                <div class="avatars">
                    <span>KG</span>
                </div>

                <small>1 Member</small>

            </div>


            <div class="group-info-row">

                <div>
                    <span>Total Expenses</span>
                    <strong>₹0</strong>
                </div>

                <div>
                    <span>Your Balance</span>
                    <strong class="positive">
                        ₹0
                    </strong>
                </div>

            </div>


            <button
                class="view-group"
                onclick="openGroup('${escapeHtml(name)}')">

                View Group

                <i class="fa-solid fa-arrow-right"></i>

            </button>

        </div>
    `;

    grid.prepend(card);

    updateGroupCount();

}


/* ==========================================
   SEARCH GROUPS
========================================== */

function filterGroups() {

    const input =
        document.getElementById("searchGroups");

    if (!input) return;

    const value =
        input.value.toLowerCase().trim();

    const cards =
        document.querySelectorAll(".group-card");

    let visible = 0;

    cards.forEach(card => {

        const name =
            card.dataset.name.toLowerCase();

        const text =
            card.textContent.toLowerCase();

        const match =
            name.includes(value) ||
            text.includes(value);

        card.style.display =
            match ? "" : "none";

        if (match) visible++;

    });

    updateEmptyState(visible);

}


/* ==========================================
   SORT GROUPS
========================================== */

function sortGroups() {

    const grid =
        document.getElementById("groupGrid");

    const select =
        document.getElementById("sortGroups");

    if (!grid || !select) return;

    const cards =
        [...grid.querySelectorAll(".group-card")];

    const value = select.value;

    cards.sort((a, b) => {

        if (value === "name") {

            return a.dataset.name
                .localeCompare(b.dataset.name);

        }

        if (value === "amount") {

            return Number(b.dataset.amount) -
                   Number(a.dataset.amount);

        }

        if (value === "members") {

            return Number(b.dataset.members) -
                   Number(a.dataset.members);

        }

        return 0;

    });

    cards.forEach(card => grid.appendChild(card));

}


/* ==========================================
   GROUP MENU
========================================== */

function toggleMenu(button) {

    document
        .querySelectorAll(".action-menu.show")
        .forEach(menu => {

            if (menu !== button.nextElementSibling) {
                menu.classList.remove("show");
            }

        });

    const menu =
        button.nextElementSibling;

    menu.classList.toggle("show");

}


/* ==========================================
   CLOSE MENUS
========================================== */

document.addEventListener("click", function (e) {

    if (!e.target.closest(".more-btn") &&
        !e.target.closest(".action-menu")) {

        document
            .querySelectorAll(".action-menu.show")
            .forEach(menu => {
                menu.classList.remove("show");
            });

    }

});


/* ==========================================
   EDIT GROUP
========================================== */

function editGroup(name) {

    showToast(
        `Edit "${name}" — backend integration coming next.`
    );

}


/* ==========================================
   DELETE GROUP
========================================== */

function deleteGroup(button) {

    const card =
        button.closest(".group-card");

    if (!card) return;

    const name =
        card.dataset.name;

    const confirmed =
        confirm(
            `Delete "${name}" group?`
        );

    if (!confirmed) return;

    card.remove();

    updateGroupCount();

    showToast(
        `"${name}" deleted successfully.`
    );

}


/* ==========================================
   OPEN GROUP
========================================== */

function openGroup(name) {

    localStorage.setItem(
        "even-selected-group",
        name
    );

    showToast(
        `Opening ${name}...`
    );

    setTimeout(() => {

        window.location.href =
            "expenses.html";

    }, 600);

}


/* ==========================================
   GROUP COUNT
========================================== */

function updateGroupCount() {

    const cards =
        document.querySelectorAll(".group-card");

    const count =
        document.getElementById("groupCount");

    const total =
        document.getElementById("totalGroups");

    if (count) {

        count.textContent =
            `${cards.length} ${cards.length === 1 ? "group" : "groups"}`;

    }

    if (total) {

        total.textContent =
            cards.length;

    }

    updateEmptyState(cards.length);

}


function updateEmptyState(visibleCount) {

    const empty =
        document.getElementById("emptyState");

    const grid =
        document.getElementById("groupGrid");

    if (!empty || !grid) return;

    const cards =
        [...grid.querySelectorAll(".group-card")];

    const visible =
        visibleCount !== undefined
            ? visibleCount
            : cards.filter(
                card => card.style.display !== "none"
            ).length;

    empty.classList.toggle(
        "show",
        visible === 0
    );

}


/* ==========================================
   THEME ICON
========================================== */

function updateThemeIcon() {

    const btn =
        document.getElementById("themeBtn");

    if (!btn) return;

    const icon =
        btn.querySelector("i");

    if (!icon) return;

    const dark =
        document.body.classList.contains("dark-mode");

    icon.classList.toggle(
        "fa-sun",
        dark
    );

    icon.classList.toggle(
        "fa-moon",
        !dark
    );

}


/* ==========================================
   TOAST
========================================== */

function showToast(message) {

    const toast =
        document.getElementById("toast");

    const text =
        document.getElementById("toastMessage");

    if (!toast || !text) return;

    text.textContent = message;

    toast.classList.add("show");

    clearTimeout(window.toastTimer);

    window.toastTimer =
        setTimeout(() => {

            toast.classList.remove("show");

        }, 2800);

}


/* ==========================================
   LOGOUT
========================================== */

function logout() {

    localStorage.removeItem("even-token");
    localStorage.removeItem("even-user");

}


/* ==========================================
   HTML ESCAPE
========================================== */

function escapeHtml(value) {

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


/* ==========================================
   CLOSE MODAL ON BACKDROP
========================================== */

document.addEventListener("click", function (e) {

    const modal =
        document.getElementById("groupModal");

    if (e.target === modal) {
        closeCreateModal();
    }

});


/* ==========================================
   ESCAPE KEY
========================================== */

document.addEventListener("keydown", function (e) {

    if (e.key === "Escape") {

        closeCreateModal();

        document
            .querySelectorAll(".action-menu.show")
            .forEach(menu => {

                menu.classList.remove("show");

            });

    }

});