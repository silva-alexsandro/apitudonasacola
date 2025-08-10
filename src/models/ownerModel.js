const pool = require('../db/db.js');

async function getAllOwners() {
  const query = `
    SELECT DISTINCT owner
    FROM lists
    ORDER BY owner
  `;
  const { rows } = await pool.query(query);
  return rows.map(row => row.owner);
}
module.exports = {
  getAllOwners,
};
