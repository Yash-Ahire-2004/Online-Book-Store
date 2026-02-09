let allBooks = [];
const user = getUser();
const navUser = document.getElementById("navUser");
const booksDiv = document.getElementById("books");
const sortSelect = document.getElementById("sortBy");
const searchInput = document.getElementById("searchInput");
const loadingSpinner = document.getElementById("loadingSpinner");

// Update navbar
updateNavbar();

// Update cart count
updateCartCount();

// Load books
loadBooks();

// Event listeners
sortSelect.addEventListener("change", filterAndSort);
searchInput.addEventListener("input", filterAndSort);

function updateNavbar() {
    if (user) {
        navUser.innerHTML = `<span>👤 ${user.username}</span> <button onclick="logout()">Logout</button>`;
    } else {
        navUser.innerHTML = `<a href="login.html">🔐 Login</a>`;
    }
}

function updateCartCount() {
    if (!user) return;
    const key = `cart_user_${user.id}`;
    const cart = JSON.parse(localStorage.getItem(key)) || [];
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    const cartCountBadge = document.getElementById("cartCount");
    if (cartCountBadge) {
        cartCountBadge.textContent = count;
        cartCountBadge.style.display = count > 0 ? "inline-block" : "none";
    }
}

function loadBooks() {
    loadingSpinner.classList.remove("hidden");
    
    fetch("http://localhost:8081/api/books")
        .then(res => {
            if (!res.ok) throw new Error("Failed to load books");
            return res.json();
        })
        .then(data => {
            allBooks = data;
            filterAndSort();
            loadingSpinner.classList.add("hidden");
        })
        .catch(error => {
            console.error("Error loading books:", error);
            loadingSpinner.classList.add("hidden");
            booksDiv.innerHTML = '<p style="text-align:center; color:#f00; padding:20px;">Failed to load books. Please try again.</p>';
        });
}

function filterAndSort() {
    let filtered = allBooks;
    
    // Search filter
    const searchTerm = searchInput.value.toLowerCase();
    if (searchTerm) {
        filtered = filtered.filter(b => 
            b.title.toLowerCase().includes(searchTerm) || 
            b.author.toLowerCase().includes(searchTerm)
        );
    }
    
    // Sort
    const sortValue = sortSelect.value;
    if (sortValue === "priceLow") {
        filtered.sort((a, b) => a.price - b.price);
    } else if (sortValue === "priceHigh") {
        filtered.sort((a, b) => b.price - a.price);
    }
    
    // Display
    displayBooks(filtered);
}

function displayBooks(books) {
    booksDiv.innerHTML = "";
    
    if (books.length === 0) {
        booksDiv.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 40px; color: #999;">No books found. Try a different search.</div>';
        return;
    }
    
    books.forEach(b => {
        const bookIcon = getBookIcon(b.title);
        const cardHTML = `
            <div class="card">
                <div class="book-image">${bookIcon}</div>
                <div class="card-content">
                    <h3>${sanitizeHtml(b.title)}</h3>
                    <p class="author">by ${sanitizeHtml(b.author)}</p>
                    <p class="rating">⭐⭐⭐⭐⭐</p>
                    <div class="price-section">
                        <span class="price">₹${b.price.toFixed(2)}</span>
                    </div>
                    <button class="btn" onclick="addToCart(${b.id}, '${sanitizeForJs(b.title)}', ${b.price})">
                        Add to Cart
                    </button>
                </div>
            </div>
        `;
        booksDiv.innerHTML += cardHTML;
    });
}

function addToCart(id, title, price) {
    if (!user) {
        alert("Please login first to add items to cart.");
        window.location.href = "login.html";
        return;
    }

    const key = `cart_user_${user.id}`;
    let cart = JSON.parse(localStorage.getItem(key)) || [];

    const item = cart.find(i => i.bookId === id);
    if (item) {
        item.quantity++;
    } else {
        cart.push({ bookId: id, title, price, quantity: 1 });
    }

    localStorage.setItem(key, JSON.stringify(cart));
    updateCartCount();
    showAddedNotification(title);
}

function showAddedNotification(title) {
    const notification = document.createElement("div");
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        z-index: 9999;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = `✓ "${title}" added to cart!`;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = "slideOut 0.3s ease";
        setTimeout(() => notification.remove(), 300);
    }, 2500);
}

function getBookIcon(title) {
    const icons = ["📕", "📗", "📘", "📙", "📓", "📔"];
    const hash = title.charCodeAt(0) % icons.length;
    return icons[hash];
}

function sanitizeHtml(str) {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
}

function sanitizeForJs(str) {
    return str.replace(/'/g, "\\'").replace(/"/g, '\\"');
}

// Add animation styles
const style = document.createElement("style");
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);
