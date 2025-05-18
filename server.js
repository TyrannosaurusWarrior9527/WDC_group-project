// server.js
require('dotenv').config();
const express    = require('express');
const pathMod     = require('path');
const { init }   = require('./models/user');
const authRoutes = require('./routes/auth');

const app = express();

// JSON
app.use(express.json());

// get data from path
app.use(express.static(pathMod.join(__dirname, 'path')));

// open website to mainPage
app.get('/', (req, res) => {
  res.sendFile(pathMod.join(__dirname, 'path', 'mainPage.html'));
});

// Mount route
// Front end registration corresponds here
app.use('/api', authRoutes);

// Initialize user table before startup
init()
  .then(() => {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`🚀 Server listening on http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('Database initialization failed', err);
  });
