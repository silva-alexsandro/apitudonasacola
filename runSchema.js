const fs = require('fs');
const path = require('path');
const pool = require('./src/db/db.js');

async function runSchema() {
  try {
    const filePath = path.join(__dirname, 'schema.sql');
    const sql = fs.readFileSync(filePath, 'utf-8');

    await pool.query(sql);

    console.log('Script schema.sql executado com sucesso!');
  } catch (error) {
    console.error('Erro ao executar script schema.sql:', error);
  } finally {
    await pool.end();
  }
}

runSchema();
