// db.js - Configuração para Supabase
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.SUPABASE_DB_URL,
  ssl: { rejectUnauthorized: false },
  idleTimeoutMillis: 10000,
  connectionTimeoutMillis: 2000,
});

module.exports = pool;