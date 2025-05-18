// routes/auth.js
const express = require('express');
const bcrypt  = require('bcryptjs');
const pool    = require('../config/db');
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
      return res.status(401).json({ message: '用户名不存在' });
    }
    const user = rows[0];
    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) {
      return res.status(401).json({ message: '密码错误' });
    }
    // TODO: 如果需要 JWT，这里生成并返回 token
    res.json({ message: '登录成功', userId: user.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '登录出错' });
  }
});

module.exports = router;
