if (!isLoggedIn()) {
    window.location.href = "login.html";
}

const user = getUser();
const key = `cart_user_${user.id}`;
const cartContentDiv = document.getElementById("cartContent");
const cartSummaryDiv = document.getElementById("cartSummary");
const navUser = document.getElementById("navUser");

// Update navbar
updateNavbar();
updateCartCount();

// Render cart
renderCart();

function updateNavbar() {
    if (user) {
        navUser.innerHTML = `<span>👤 ${user.username}</span> <button onclick="logout()">Logout</button>`;
    }
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem(key)) || [];
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    const cartCountBadge = document.getElementById("cartCount");
    if (cartCountBadge) {
        cartCountBadge.textContent = count;
        cartCountBadge.style.display = count > 0 ? "inline-block" : "none";
    }
}

function renderCart() {
    let cart = JSON.parse(localStorage.getItem(key)) || [];

    if (cart.length === 0) {
        cartContentDiv.innerHTML = `
            <div class="cart-empty">
                <div class="cart-empty-icon">🛒</div>
                <h2>Your cart is empty</h2>
                <p>Start browsing our collection of books</p>
                <a href="index.html" class="btn" style="display: inline-block; padding: 12px 30px; margin-top: 20px; width: auto;">Continue Shopping</a>
            </div>
        `;
        cartSummaryDiv.innerHTML = "";
        return;
    }

    let cartHTML = "";
    let total = 0;

    cart.forEach((item, idx) => {
        const subtotal = item.price * item.quantity;
        total += subtotal;
        
        cartHTML += `
            <div class="cart-item">
                <div class="cart-item-info">
                    <div class="cart-item-title">📖 ${sanitizeHtml(item.title)}</div>
                    <div class="cart-item-price">₹${item.price.toFixed(2)}</div>
                </div>
                <div class="quantity-control">
                    <button class="remove-btn" onclick="removeItem(${idx})">Remove</button>
                    <span style="min-width: 80px; text-align: center;">
                        Qty: <input type="number" min="1" max="10" value="${item.quantity}" 
                            onchange="updateQuantity(${idx}, this.value)" style="width: 50px;">
                    </span>
                    <span style="font-weight: bold; min-width: 100px; text-align: right;">
                        ₹${subtotal.toFixed(2)}
                    </span>
                </div>
            </div>
        `;
    });

    cartContentDiv.innerHTML = cartHTML;

    // Render summary
    const tax = total * 0.05; // 5% tax
    const shipping = total > 500 ? 0 : 50;
    const grandTotal = total + tax + shipping;

    cartSummaryDiv.innerHTML = `
        <div class="cart-summary">
            <div class="summary-row">
                <span>Subtotal:</span>
                <span>₹${total.toFixed(2)}</span>
            </div>
            <div class="summary-row">
                <span>Tax (5%):</span>
                <span>₹${tax.toFixed(2)}</span>
            </div>
            <div class="summary-row">
                <span>Shipping Fee:</span>
                <span>${shipping === 0 ? 'FREE' : '₹' + shipping.toFixed(2)}</span>
            </div>
            <div class="summary-row summary-total">
                <span>Total:</span>
                <span>₹${grandTotal.toFixed(2)}</span>
            </div>
            <button class="checkout-btn" onclick="placeOrder()">Place Order</button>
            <a href="index.html" class="btn" style="display: block; margin-top: 10px; text-align: center; text-decoration: none;">Continue Shopping</a>
        </div>
    `;
}

function updateQuantity(idx, newQuantity) {
    let cart = JSON.parse(localStorage.getItem(key)) || [];
    const qty = Math.max(1, Math.min(10, parseInt(newQuantity) || 1));
    
    if (idx >= 0 && idx < cart.length) {
        cart[idx].quantity = qty;
        localStorage.setItem(key, JSON.stringify(cart));
        updateCartCount();
        renderCart();
    }
}

function removeItem(idx) {
    let cart = JSON.parse(localStorage.getItem(key)) || [];
    const removedItem = cart[idx];
    
    cart.splice(idx, 1);
    localStorage.setItem(key, JSON.stringify(cart));
    updateCartCount();
    renderCart();
    
    showNotification(`Removed "${removedItem.title}" from cart`);
}

function placeOrder() {
    let cart = JSON.parse(localStorage.getItem(key)) || [];
    
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    const placeOrderBtn = document.querySelector(".checkout-btn");
    const originalText = placeOrderBtn.textContent;
    placeOrderBtn.textContent = "Processing...";
    placeOrderBtn.disabled = true;

    fetch("http://localhost:8081/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            userId: user.id,
            items: cart.map(i => ({ bookId: i.bookId, quantity: i.quantity }))
        })
    })
        .then(res => {
            if (!res.ok) throw new Error("Failed to place order");
            return res.json();
        })
        .then(() => {
            localStorage.removeItem(key);
            showNotification("Order placed successfully! Redirecting...", "success");
            setTimeout(() => {
                window.location.href = "orders.html";
            }, 1500);
        })
        .catch(error => {
            console.error("Order error:", error);
            showNotification(error.message || "Failed to place order. Please try again.", "error");
            placeOrderBtn.textContent = originalText;
            placeOrderBtn.disabled = false;
        });
}

function showNotification(message, type = "info") {
    const notification = document.createElement("div");
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        padding: 15px 25px;
        border-radius: 8px;
        color: white;
        font-weight: bold;
        z-index: 9999;
        animation: slideIn 0.3s ease;
    `;
    
    if (type === "success") {
        notification.style.background = "#4caf50";
        notification.textContent = "✓ " + message;
    } else if (type === "error") {
        notification.style.background = "#ff6b6b";
        notification.textContent = "✗ " + message;
    } else {
        notification.style.background = "#667eea";
        notification.textContent = message;
    }
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = "slideOut 0.3s ease";
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

function sanitizeHtml(str) {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
}
