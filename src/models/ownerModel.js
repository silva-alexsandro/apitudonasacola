const pool = require('../../db.js');
const { validate: isUuid } = require('uuid');

async function getAllOwners() {
  const query = `
    SELECT DISTINCT owner
    FROM lists
    ORDER BY owner
  `;
  const { rows } = await pool.query(query);
  return rows.map(row => row.owner);
}

async function checkOwnerExists(ownerId) {
  if (!isUuid(ownerId)) return false;
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
