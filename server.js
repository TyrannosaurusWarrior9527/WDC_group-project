// server.js
const express    = require('express');
const dotenv     = require('dotenv');
const { init }   = require('./models/user');
const authRoutes = require('./routes/auth');

dotenv.config();
const app = express();

// JSON
app.use(express.json());

// Mount route
// Front end registration corresponds here
app.use('/api', authRoutes);

// Initialize user table before startup
init()
  .then(() => {
    const PORT = process.env.PORT || 8080;
    app.listen(PORT, () => {
      console.log(`🚀 Server listening on http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('❌ Database initialization failed', err);
  });
