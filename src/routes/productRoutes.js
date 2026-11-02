const express = require('express');
const router = express.Router();
const { readDB } = require('../utils/dbHelper');

router.get('/', (req, res) => {
    res.json(readDB().products);
});

router.get('/:id', (req, res) => {
    const product = readDB().products.find(p => p.id === req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
});

module.exports = router;
