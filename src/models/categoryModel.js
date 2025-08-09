const pool = require('../db');

async function createCategory(name) {
  const query = `
    INSERT INTO categories (name)
    VALUES ($1)
    RETURNING id, name
  `;
  const { rows } = await pool.query(query, [name.trim()]);
  return rows[0];
}

async function getCategoryById(id) {
  const query = `SELECT id, name FROM categories WHERE id = $1`;
  const { rows } = await pool.query(query, [id]);
  return rows[0];
}

async function getCategoriesByName(name) {
  const query = `
    SELECT id, name FROM categories
    WHERE LOWER(name) LIKE LOWER($1)
    ORDER BY name
  `;
  const { rows } = await pool.query(query, [`%${name}%`]);
  return rows;
}

async function getAllCategories() {
  const query = `SELECT id, name FROM categories ORDER BY name`;
  const { rows } = await pool.query(query);
  return rows;
}

async function updateCategory(id, name) {
  const query = `
    UPDATE categories
    SET name = $1
    WHERE id = $2
    RETURNING id, name
  `;
  const { rows } = await pool.query(query, [name.trim(), id]);
  return rows[0];
}

async function deleteCategory(id) {
  const query = `DELETE FROM categories WHERE id = $1 RETURNING id`;
  const { rows } = await pool.query(query, [id]);
  return rows[0];
}

module.exports = {
  createCategory,
  getCategoryById,
  getCategoriesByName,
  getAllCategories,
  updateCategory,
  deleteCategory,
};
