let cart = [];

async function loadCart() {
    if (currentUser) {
        cart = await API.getCart(currentUser.id);
    } else {
        cart = JSON.parse(localStorage.getItem('rc_guest_cart')) || [];
    }
    updateCartUI();
}

async function saveCart() {
    if (currentUser) {
        await API.saveCart(currentUser.id, cart);
    } else {
        localStorage.setItem('rc_guest_cart', JSON.stringify(cart));
    }
    updateCartUI();
}

async function addToCart(id) {
    const product = products.find(p => p.id === id);
    if (!product) return;
    const existing = cart.find(item => item.id === id);
    if (existing) existing.qty += 1;
    else cart.push({ ...product, qty: 1 });
    await saveCart();
    showNotification(`Added ${product.name} to cart!`);
}

async function updateQty(id, change) {
    const item = cart.find(i => i.id === id);
    if (item) {
        item.qty += change;
        if (item.qty <= 0) cart = cart.filter(i => i.id !== id);
    }
    await saveCart();
}

function updateCartUI() {
    const countEl = document.getElementById('cartCount');
    if (countEl) countEl.innerText = cart.reduce((acc, i) => acc + i.qty, 0);
    
    const list = document.getElementById('cartItemsList');
    if (!list) return;
    
    if (cart.length === 0) {
        list.innerHTML = '<p style="color:var(--text-muted); text-align:center;">Your cart is empty.</p>';
    } else {
        list.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div>
                    <div>${item.name}</div>
                    <div style="color:var(--amber);">$${item.price.toFixed(2)} x ${item.qty}</div>
                </div>
                <div style="display:flex; gap:0.5rem; align-items:center;">
                    <button class="btn-glass" onclick="updateQty('${item.id}', -1)">-</button>
                    <span>${item.qty}</span>
                    <button class="btn-glass" onclick="updateQty('${item.id}', 1)">+</button>
                </div>
            </div>
        `).join('');
    }
    const total = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);
    const totalEl = document.getElementById('cartTotalPrice');
    if (totalEl) totalEl.innerText = '$' + total.toFixed(2);
}

function toggleCart() { 
    document.getElementById('cartDrawer').classList.toggle('active'); 
}

async function checkout() {
    if (cart.length === 0) return alert('Your cart is empty!');
    const address = prompt('Enter shipping address:');
    if (!address) return;
    const total = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);
    const res = await API.createOrder({
        userId: currentUser ? currentUser.id : null,
        items: cart, 
        total, 
        shippingAddress: address
    });
    if (res.success) {
        showNotification(`Order ${res.order.id} placed!`);
        cart = [];
        await saveCart();
        toggleCart();
    }
}