const pool = require('../../db.js');

// Retorna um array com todos os owners distintos
async function getAllOwners() {
  const query = `
    SELECT DISTINCT owner
    FROM lists
    ORDER BY owner
  `;
  const { rows } = await pool.query(query);
  return rows.map(row => row.owner);
}

// Função para verificar se um owner existe (retorna true ou false)
async function checkOwnerExists(ownerId) {
  const query = `
    SELECT 1
    FROM lists
    WHERE owner = $1
    LIMIT 1
  `;
  const { rowCount } = await pool.query(query, [ownerId]);
  return rowCount > 0;
}

module.exports = {
  getAllOwners,
  checkOwnerExists,
};
