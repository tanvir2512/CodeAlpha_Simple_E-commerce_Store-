const express = require('express');
const router = express.Router();
const { readDB, writeDB } = require('../utils/dbHelper');

router.post('/', (req, res) => {
    const { userId, items, total, shippingAddress } = req.body;
    const db = readDB();
    const newOrder = {
        id: 'ORD-' + Math.floor(100000 + Math.random() * 900000),
        userId: userId || 'guest',
        items, total, shippingAddress, status: 'Processing', createdAt: new Date().toISOString()
    };
    db.orders.push(newOrder);
    if (userId && db.carts[userId]) db.carts[userId] = [];
    writeDB(db);
    res.json({ success: true, order: newOrder });
});

router.get('/:userId', (req, res) => {
    res.json(readDB().orders.filter(o => o.userId === req.params.userId));
});

module.exports = router;
