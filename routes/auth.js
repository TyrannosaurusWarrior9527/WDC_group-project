// routes/auth.js
const express = require('express');
const bcrypt  = require('bcryptjs');
const pool    = require('../connect/POOL');
const router  = express.Router();

// register
router.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ message: 'Please provide username, email, and password' });
  }
  try {
    const hash = await bcrypt.hash(password, 10);
    await pool.query(
      'INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)',
      [username, email, hash]
    );
    res.status(201).json({ message: 'registered successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Registration failed, username or email may have been used' });
  }
});

// login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: 'Please provide username and password' });
  }
  try {
    const [rows] = await pool.query(
      'SELECT * FROM users WHERE username = ?',
      [username]
    );
    if (rows.length === 0) {
      return res.status(401).json({ message: 'user name does not exist' });
    }
    const user = rows[0];
    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) {
      return res.status(401).json({ message: 'Password error' });
    }
    // JWT
    res.json({ message: 'registered successfully', userId: user.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'registration error' });
  }
});

module.exports = router;
