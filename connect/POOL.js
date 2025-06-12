// connect/POOL.js
require('dotenv').config();         // .env
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host            : process.env.DB_HOST,                         // e.g. '127.0.0.1'
  port            : parseInt(process.env.DB_PORT, 10) || 3306,  // e.g. 3307
  user            : process.env.DB_USER,                        // e.g. 'root'
  password        : process.env.DB_PASS,                        // e.g. '123456'
  database        : process.env.DB_NAME,                        // e.g. 'wdc_db'
  waitForConnections: true,
  connectionLimit : 10,
});

module.exports = pool;
