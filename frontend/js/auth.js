function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function showMessage(message, type) {
    const messageDiv = document.getElementById("message");
    if (!messageDiv) {
        const div = document.createElement("div");
        div.id = "message";
        document.body.insertBefore(div, document.body.firstChild.nextSibling);
    }
    
    const msg = document.getElementById("message");
    msg.style.cssText = `
        position: fixed;
        top: 80px;
        left: 50%;
        transform: translateX(-50%);
        padding: 15px 25px;
        border-radius: 8px;
        color: white;
        font-weight: bold;
        z-index: 10000;
        animation: slideDown 0.3s ease;
    `;
    
    if (type === "success") {
        msg.style.background = "#4caf50";
    } else {
        msg.style.background = "#ff6b6b";
    }
    
    msg.textContent = message;
    
    setTimeout(() => {
        msg.style.animation = "slideUp 0.3s ease";
        setTimeout(() => msg.remove(), 300);
    }, 3000);
}

function login() {
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    
    // Validation
    if (!email) {
        showMessage("Please enter your email", "error");
        return;
    }
    
    if (!validateEmail(email)) {
        showMessage("Please enter a valid email address", "error");
        return;
    }
    
    if (!password) {
        showMessage("Please enter your password", "error");
        return;
    }
    
    if (password.length < 3) {
        showMessage("Password must be at least 3 characters", "error");
        return;
    }

    // Show loading state
    const loginBtn = document.querySelector(".btn");
    const originalText = loginBtn.textContent;
    loginBtn.textContent = "Logging in...";
    loginBtn.disabled = true;

    fetch(API_BASE_URL + "/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    })
        .then(res => {
            if (!res.ok) {
                return res.json().then(err => {
                    throw new Error(err.message || "Invalid email or password");
                });
            }
            return res.json();
        })
        .then(user => {
            localStorage.setItem("user", JSON.stringify(user));
            showMessage("Login successful! Redirecting...", "success");
            setTimeout(() => {
                window.location.href = "index.html";
            }, 1000);
        })
        .catch(error => {
            console.error("Login error:", error);
            showMessage(error.message || "Login failed. Please try again.", "error");
            loginBtn.textContent = originalText;
            loginBtn.disabled = false;
        });
}

function register() {
    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    // Validation
    if (!username) {
        showMessage("Please enter a username", "error");
        return;
    }

    if (username.length < 3) {
        showMessage("Username must be at least 3 characters", "error");
        return;
    }

    if (!email) {
        showMessage("Please enter your email", "error");
        return;
    }

    if (!validateEmail(email)) {
        showMessage("Please enter a valid email address", "error");
        return;
    }

    if (!password) {
        showMessage("Please enter a password", "error");
        return;
    }

    if (password.length < 3) {
        showMessage("Password must be at least 3 characters", "error");
        return;
    }

    // Show loading state
    const registerBtn = document.querySelector(".btn");
    const originalText = registerBtn.textContent;
    registerBtn.textContent = "Creating account...";
    registerBtn.disabled = true;

    fetch(API_BASE_URL + "/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password })
    })
        .then(res => {
            if (!res.ok) {
                return res.json().then(err => {
                    throw new Error(err.message || "Registration failed");
                });
            }
            return res.json();
        })
        .then(() => {
            showMessage("Registration successful! Redirecting to login...", "success");
            setTimeout(() => {
                window.location.href = "login.html";
            }, 1500);
        })
        .catch(error => {
            console.error("Registration error:", error);
            showMessage(error.message || "Registration failed. Please try again.", "error");
            registerBtn.textContent = originalText;
            registerBtn.disabled = false;
        });
}

function logout() {
    localStorage.removeItem("user");
    showMessage("You have been logged out", "success");
    setTimeout(() => {
        window.location.href = "login.html";
    }, 800);
}

function getUser() {
    return JSON.parse(localStorage.getItem("user"));
}

function isLoggedIn() {
    return localStorage.getItem("user") !== null;
}

// Add message animations
const authStyle = document.createElement("style");
authStyle.textContent = `
    @keyframes slideDown {
        from { transform: translateX(-50%) translateY(-20px); opacity: 0; }
        to { transform: translateX(-50%) translateY(0); opacity: 1; }
    }
    @keyframes slideUp {
        from { transform: translateX(-50%) translateY(0); opacity: 1; }
        to { transform: translateX(-50%) translateY(-20px); opacity: 0; }
    }
`;
if (!document.querySelector('style[data-auth]')) {
    authStyle.setAttribute('data-auth', 'true');
    document.head.appendChild(authStyle);
}
