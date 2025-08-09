const pool = require('../db');

async function createList(name, owner) {
  const query = `
    INSERT INTO lists (name, owner)
    VALUES ($1, $2)
    RETURNING id, name, created_at, owner
  `;
  const values = [name.trim(), owner];
  const { rows } = await pool.query(query, values);
  return rows[0];
}

async function getListsByOwner(owner) {
  const query = `
    SELECT id, name, created_at, owner
    FROM lists
    WHERE owner = $1
    ORDER BY created_at DESC
  `;
  const { rows } = await pool.query(query, [owner]);
  return rows;
}

async function getListById(id, owner) {
  const query = `
    SELECT id, name, created_at, owner
    FROM lists
    WHERE id = $1 AND owner = $2
  `;
  const { rows } = await pool.query(query, [id, owner]);
  return rows[0];
}

async function getListsByName(name, owner) {
  const query = `
    SELECT id, name, created_at, owner
    FROM lists
    WHERE owner = $2 AND LOWER(name) LIKE LOWER($1)
    ORDER BY created_at DESC
  `;
  const { rows } = await pool.query(query, [`%${name}%`, owner]);
  return rows;
}

async function deleteListById(id, owner) {
  const query = `
    DELETE FROM lists
    WHERE id = $1 AND owner = $2
    RETURNING id
  `;
  const { rows } = await pool.query(query, [id, owner]);
  return rows[0];
}

module.exports = {
  createList,
  getListsByOwner,
  getListById,
  getListsByName,
  deleteListById,
};
