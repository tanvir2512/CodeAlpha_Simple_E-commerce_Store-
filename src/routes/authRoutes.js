const express = require('express');
const router = express.Router();
const { readDB, writeDB } = require('../utils/dbHelper');

router.post('/register', (req, res) => {
    const { name, email, password } = req.body;
    const db = readDB();
    if (db.users.find(u => u.email === email)) return res.status(400).json({ error: 'Email already registered' });
    const newUser = { id: Date.now().toString(), name, email, password };
    db.users.push(newUser);
    writeDB(db);
    res.json({ success: true, user: { id: newUser.id, name: newUser.name, email: newUser.email } });
});

router.post('/login', (req, res) => {
    const { email, password } = req.body;
    const db = readDB();
    const user = db.users.find(u => u.email === email && u.password === password);
    if (!user) return res.status(400).json({ error: 'Invalid email or password' });
    res.json({ success: true, user: { id: user.id, name: user.name, email: user.email } });
});

module.exports = router;
