function showNotification(msg) {
    const notif = document.getElementById('notification');
    notif.innerText = msg;
    notif.style.display = 'block';
    setTimeout(() => notif.style.display = 'none', 3000);
}

document.addEventListener('DOMContentLoaded', () => {
    initProducts();
    updateUserUI();
    loadCart();
});
