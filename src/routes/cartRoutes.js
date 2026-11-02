const express = require('express');
const router = express.Router();
const { readDB, writeDB } = require('../utils/dbHelper');

router.get('/:userId', (req, res) => {
    res.json(readDB().carts[req.params.userId] || []);
});

router.post('/:userId', (req, res) => {
    const db = readDB();
    db.carts[req.params.userId] = req.body.cart;
    writeDB(db);
    res.json({ success: true });
});

module.exports = router;
