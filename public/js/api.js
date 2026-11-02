const API = {
    getProducts: () => fetch('/api/products').then(r => r.json()),
    getProductById: (id) => fetch(`/api/products/${id}`).then(r => r.json()),
    login: (body) => fetch('/api/auth/login', { 
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify(body) 
    }).then(r => r.json()),
    register: (body) => fetch('/api/auth/register', { 
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify(body) 
    }).then(r => r.json()),
    getCart: (userId) => fetch(`/api/cart/${userId}`).then(r => r.json()),
    saveCart: (userId, cart) => fetch(`/api/cart/${userId}`, { 
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify({ cart }) 
    }).then(r => r.json()),
    createOrder: (body) => fetch('/api/orders', { 
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify(body) 
    }).then(r => r.json()),
    getOrders: (userId) => fetch(`/api/orders/${userId}`).then(r => r.json())
};