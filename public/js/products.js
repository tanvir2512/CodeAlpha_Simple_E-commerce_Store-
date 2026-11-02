let products = [];

async function initProducts() {
    try {
        products = await API.getProducts();
        renderProducts(products);
    } catch (err) {
        console.error('Failed to load products:', err);
    }
}

function renderProducts(list) {
    const grid = document.getElementById('productsGrid');
    if (!grid) return;
    
    if (!list || list.length === 0) {
        grid.innerHTML = '<p style="color:var(--text-muted); grid-column: 1/-1; text-align:center;">No products found.</p>';
        return;
    }

    grid.innerHTML = list.map(p => `
        <div class="product-card glass">
            <img src="${p.image}" alt="${p.name}" class="product-img">
            <div>
                <div class="product-category">${p.category}</div>
                <div class="product-title">${p.name}</div>
                <div class="product-price">$${p.price.toFixed(2)}</div>
            </div>
            <div class="card-actions">
                <button class="btn-glass" style="flex:1;" onclick="openProductModal('${p.id}')">Details</button>
                <button class="btn-amber" style="flex:1;" onclick="addToCart('${p.id}')">Add to Cart</button>
            </div>
        </div>
    `).join('');
}

function filterProducts() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const category = document.getElementById('categorySelect').value;
    const filtered = products.filter(p => {
        const matchesQuery = p.name.toLowerCase().includes(query) || p.description.toLowerCase().includes(query);
        const matchesCategory = category === '' || p.category === category;
        return matchesQuery && matchesCategory;
    });
    renderProducts(filtered);
}

async function openProductModal(id) {
    const p = await API.getProductById(id);
    const specsHtml = Object.entries(p.specs || {}).map(([k, v]) => `<li><b>${k}:</b> ${v}</li>`).join('');
    document.getElementById('modalBody').innerHTML = `
        <img src="${p.image}" alt="${p.name}" style="width:100%; height:250px; object-fit:cover; border-radius:12px; margin-bottom:1rem;">
        <div class="product-category">${p.category}</div>
        <h2 style="margin-bottom:0.5rem;">${p.name}</h2>
        <div class="product-price" style="font-size:1.5rem; margin-bottom:1rem;">$${p.price.toFixed(2)}</div>
        <p style="color:var(--text-muted); margin-bottom:1rem; line-height:1.6;">${p.description}</p>
        <h4 style="margin-bottom:0.5rem;">Technical Specs:</h4>
        <ul style="margin-left:1.5rem; color:var(--text-muted); margin-bottom:1.5rem;">${specsHtml}</ul>
        <button class="btn-amber" style="width:100%; padding:0.9rem;" onclick="addToCart('${p.id}'); closeProductModal();">Add to Cart</button>
    `;
    document.getElementById('productModal').classList.add('active');
}

function closeProductModal() { 
    document.getElementById('productModal').classList.remove('active'); 
}