const { Pool } = require('pg');

// Usa DATABASE_URL do Render ou Supabase, ou fallback local
const connectionString = process.env.DATABASE_URL || 'postgresql://postgres.xszaqmzyyuhguambfaig:8kq5%25%24d34F%21nLua@aws-1-sa-east-1.pooler.supabase.com:6543/postgres';

const pool = new Pool({
  connectionString,
  ssl: process.env.DATABASE_URL
    ? { rejectUnauthorized: false } // Render/Supabase
    : false,                        // Local
});

module.exports = pool;
