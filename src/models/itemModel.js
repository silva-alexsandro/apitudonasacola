const pool = require('../db/db.js');

async function createItem({ name, price, amount, category_id }) {
  const query = `
    INSERT INTO items (name, price, amount, category_id)
    VALUES ($1, $2, $3, $4)
    RETURNING id, name, price, amount, category_id
  `;
  const values = [name.trim(), price || null, amount || null, category_id || null];
  const { rows } = await pool.query(query, values);
  return rows[0];
}

async function getItemById(id) {
  const query = `
    SELECT id, name, price, amount, category_id
    FROM items
    WHERE id = $1
  `;
  const { rows } = await pool.query(query, [id]);
  return rows[0];
}

async function getItemsByName(name) {
  const query = `
    SELECT id, name, price, amount, category_id
    FROM items
    WHERE LOWER(name) LIKE LOWER($1)
    ORDER BY name
  `;
  const { rows } = await pool.query(query, [`%${name}%`]);
  return rows;
}

async function getAllItems() {
  const query = `
    SELECT id, name, price, amount, category_id
    FROM items
    ORDER BY name
  `;
  const { rows } = await pool.query(query);
  return rows;
}

async function updateItem(id, { name, price, amount, category_id }) {
  const query = `
    UPDATE items
    SET name = COALESCE($1, name),
        price = COALESCE($2, price),
        amount = COALESCE($3, amount),
        category_id = $4
    WHERE id = $5
    RETURNING id, name, price, amount, category_id
  `;
  const values = [
    name ? name.trim() : null,
    price !== undefined ? price : null,
    amount !== undefined ? amount : null,
    category_id || null,
    id,
  ];
  const { rows } = await pool.query(query, values);
  return rows[0];
}

async function deleteItem(id) {
  const query = `DELETE FROM items WHERE id = $1 RETURNING id`;
  const { rows } = await pool.query(query, [id]);
  return rows[0];
}

// Associar item a lista (list_items)
async function addItemToList(list_id, item_id) {
  const query = `
    INSERT INTO list_items (list_id, item_id)
    VALUES ($1, $2)
    ON CONFLICT DO NOTHING
  `;
  await pool.query(query, [list_id, item_id]);
}

// Remover associação item-lista
async function removeItemFromList(list_id, item_id) {
  const query = `
    DELETE FROM list_items
    WHERE list_id = $1 AND item_id = $2
  `;
  await pool.query(query, [list_id, item_id]);
}

// Buscar todos itens de uma lista
async function getItemsByListId(list_id) {
  const query = `
    SELECT i.id, i.name, i.price, i.amount, i.category_id
    FROM items i
    JOIN list_items li ON li.item_id = i.id
    WHERE li.list_id = $1
    ORDER BY i.name
  `;
  const { rows } = await pool.query(query, [list_id]);
  return rows;
}

module.exports = {
  createItem,
  getItemById,
  getItemsByName,
  getAllItems,
  updateItem,
  deleteItem,
  addItemToList,
  removeItemFromList,
  getItemsByListId,
};
