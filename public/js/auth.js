const API = {
    getProducts: () => fetch('/api/products').then(r => r.json()),
    getProductById: (id) => fetch(/api/products/).then(r => r.json()),
    login: (body) => fetch('/api/auth/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) }).then(r => r.json()),
    register: (body) => fetch('/api/auth/register', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) }).then(r => r.json()),
    getCart: (userId) => fetch(/api/cart/).then(r => r.json()), saveCart: (userId, cart) => fetch(/api/cart/, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ cart }) }).then(r => r.json()),
    createOrder: (body) => fetch('/api/orders', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) }).then(r => r.json()),
    getOrders: (userId) => fetch(/api/orders/).then(r => r.json()) }; "@ \vert{} Out-File -Encoding utf8 public/js/api.js  @" let currentUser = JSON.parse(localStorage.getItem('rc_user')) \vert{}\vert{} null; let isRegisterMode = false;  function updateUserUI() { const authBtn = document.getElementById('authBtn'); const ordersBtn = document.getElementById('ordersBtn'); if (currentUser) { authBtn.innerText = currentUser.name; authBtn.onclick = logoutUser; ordersBtn.style.display = 'block'; } else { authBtn.innerText = 'Login / Register'; authBtn.onclick = openAuthModal; ordersBtn.style.display = 'none'; } }  function openAuthModal() { document.getElementById('authModal').classList.add('active'); } function closeAuthModal() { document.getElementById('authModal').classList.remove('active'); }  function toggleAuthMode() { isRegisterMode = !isRegisterMode; document.getElementById('authTitle').innerText = isRegisterMode ? 'User Registration' : 'User Login'; document.getElementById('authSubmitBtn').innerText = isRegisterMode ? 'Register' : 'Login'; document.getElementById('nameGroup').style.display = isRegisterMode ? 'block' : 'none'; }  async function handleAuth() { const email = document.getElementById('authEmail').value; const password = document.getElementById('authPassword').value; const name = document.getElementById('regName').value; const data = isRegisterMode ? await API.register({ name, email, password }) : await API.login({ email, password });  if (data.success) { currentUser = data.user; localStorage.setItem('rc_user', JSON.stringify(currentUser)); closeAuthModal(); updateUserUI(); loadCart(); showNotification(Welcome, !);
    } else {
        alert(data.error);
    }
}

function logoutUser() {
    if (confirm('Logout from account?')) {
        localStorage.removeItem('rc_user');
        currentUser = null;
        updateUserUI();
        loadCart();
        showNotification('Logged out successfully');
    }
}
