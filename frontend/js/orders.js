if (!isLoggedIn()) {
    window.location.href = "login.html";
}

const user = getUser();
const ordersDiv = document.getElementById("orders");
const navUser = document.getElementById("navUser");
const loadingSpinner = document.getElementById("loadingSpinner");

// Update navbar
updateNavbar();
updateCartCount();

// Load orders
loadOrders();

function updateNavbar() {
    if (user) {
        navUser.innerHTML = `<span>👤 ${user.username}</span> <button onclick="logout()">Logout</button>`;
    }
}

function updateCartCount() {
    const key = `cart_user_${user.id}`;
    const cart = JSON.parse(localStorage.getItem(key)) || [];
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    const cartCountBadge = document.getElementById("cartCount");
    if (cartCountBadge) {
        cartCountBadge.textContent = count;
        cartCountBadge.style.display = count > 0 ? "inline-block" : "none";
    }
}

function loadOrders() {
    loadingSpinner.classList.remove("hidden");
    
    fetch(`http://localhost:8081/api/orders/user/${user.id}`)
        .then(res => {
            if (!res.ok) throw new Error("Failed to load orders");
            return res.json();
        })
        .then(data => {
            loadingSpinner.classList.add("hidden");
            displayOrders(data);
        })
        .catch(error => {
            console.error("Error loading orders:", error);
            loadingSpinner.classList.add("hidden");
            ordersDiv.innerHTML = '<p style="text-align:center; color:#f00; padding:20px;">Failed to load your orders. Please try again.</p>';
        });
}

function displayOrders(orders) {
    if (!orders || orders.length === 0) {
        ordersDiv.innerHTML = `
            <div class="orders-empty">
                <div class="cart-empty-icon">📭</div>
                <h2>No orders yet</h2>
                <p>Start shopping to place your first order</p>
                <a href="index.html" class="btn" style="display: inline-block; padding: 12px 30px; margin-top: 20px; width: auto;">Start Shopping</a>
            </div>
        `;
        return;
    }

    let ordersHTML = "";
    
    orders.forEach(order => {
        const orderDate = new Date().toLocaleDateString(); // You can format this better if date is available from backend
        
        let itemsHTML = "";
        if (order.items && order.items.length > 0) {
            order.items.forEach(item => {
                itemsHTML += `
                    <div class="order-item">
                        <span class="order-item-title">📖 ${sanitizeHtml(item.bookTitle)}</span>
                        <span class="order-item-qty">Qty: ${item.quantity}</span>
                        <span>₹${(item.quantity * item.price).toFixed(2)}</span>
                    </div>
                `;
            });
        }

        ordersHTML += `
            <div class="order-card">
                <div class="order-header">
                    <div>
                        <div class="order-id">Order #${order.orderId}</div>
                        <div class="order-date">${orderDate}</div>
                    </div>
                    <span class="order-status">Completed</span>
                </div>
                
                <div class="order-items">
                    ${itemsHTML}
                </div>
                
                <div class="order-total">
                    <span>Order Total:</span>
                    <span>₹${order.totalPrice.toFixed(2)}</span>
                </div>
            </div>
        `;
    });

    ordersDiv.innerHTML = ordersHTML;
}

function sanitizeHtml(str) {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
}
