/* =========================================================
   EVEN — API CONNECTION
   ========================================================= */

const API_BASE_URL = "http://localhost:8081/api";

const Api = {

    async request(endpoint, options = {}) {

        const token = localStorage.getItem("token");

        const headers = {
            "Content-Type": "application/json",
            ...(options.headers || {})
        };

        if (token) {
            headers.Authorization = "Bearer " + token;
        }

        const url = API_BASE_URL + endpoint;

        console.log("API REQUEST:", url);

        let response;

        try {

            response = await fetch(url, {
                ...options,
                headers
            });

        } catch (error) {

            console.error("CONNECTION ERROR:", error);

            throw new Error(
                "Cannot connect to Spring Boot. Make sure the backend is running on port 8081."
            );
        }

        let data = {};

        const contentType =
            response.headers.get("content-type") || "";

        if (contentType.includes("application/json")) {

            try {
                data = await response.json();
            } catch {
                data = {};
            }

        } else {

            try {

                const text = await response.text();

                data = {
                    message: text
                };

            } catch {
                data = {};
            }
        }

        console.log(
            "API RESPONSE:",
            response.status,
            data
        );

        /* =================================================
           UNAUTHORIZED
           ================================================= */

        if (response.status === 401 || response.status === 403) {

            if (
                !endpoint.includes("/auth/login") &&
                !endpoint.includes("/auth/register")
            ) {

                localStorage.clear();

                window.location.href = "login.html";

                return;
            }
        }

        /* =================================================
           ERROR
           ================================================= */

        if (!response.ok) {

            throw new Error(
                data.message ||
                data.error ||
                "Request failed with status " +
                response.status
            );
        }

        return data;
    },

    get(endpoint) {

        return this.request(endpoint, {
            method: "GET"
        });
    },

    post(endpoint, body) {

        return this.request(endpoint, {
            method: "POST",
            body: JSON.stringify(body)
        });
    },

    put(endpoint, body) {

        return this.request(endpoint, {
            method: "PUT",
            body: JSON.stringify(body)
        });
    },

    delete(endpoint) {

        return this.request(endpoint, {
            method: "DELETE"
        });
    }
};


/* =========================================================
   AUTH HELPERS
   ========================================================= */

function getToken() {
    return localStorage.getItem("token");
}


function isLoggedIn() {
    return !!localStorage.getItem("token");
}


function getCurrentUser() {

    return {

        id: localStorage.getItem("userId"),

        userId: localStorage.getItem("userId"),

        fullName: localStorage.getItem("fullName"),

        username: localStorage.getItem("username"),

        email: localStorage.getItem("email"),

        role: localStorage.getItem("role"),

        token: localStorage.getItem("token")
    };
}


function requireAuth() {

    if (!isLoggedIn()) {

        window.location.href = "login.html";
    }
}


function logout() {

    localStorage.clear();

    window.location.href = "login.html";
}


/* =========================================================
   MAKE FUNCTIONS AVAILABLE GLOBALLY
   ========================================================= */

window.Api = Api;
window.getToken = getToken;
window.isLoggedIn = isLoggedIn;
window.getCurrentUser = getCurrentUser;
window.requireAuth = requireAuth;
window.logout = logout;