const pool = require('../db/db');

async function createItem(listId, { name, price = null, amount = null, done = false, categoryId = null }) {
  // 1. Verifica se o item já existe pelo nome globalmente
  const existingItemRes = await pool.query('SELECT id FROM items WHERE name = $1', [name]);
  let itemId;

  if (existingItemRes.rows.length === 0) {
    // Cria o item global
    const insertItemRes = await pool.query(
      'INSERT INTO items (name, category_id) VALUES ($1, $2) RETURNING id',
      [name, categoryId]
    );
    itemId = insertItemRes.rows[0].id;
  } else {
    itemId = existingItemRes.rows[0].id;
  }

  // 2. Verifica se já existe associação do item com essa lista
  const relationRes = await pool.query(
    'SELECT * FROM list_items WHERE list_id = $1 AND item_id = $2',
    [listId, itemId]
  );

  if (relationRes.rows.length > 0) {
    throw new Error('Este item já está associado a esta lista.');
  }

  // 3. Associa o item à lista com price, amount e done
  await pool.query(
    `INSERT INTO list_items (list_id, item_id, price, amount, done)
     VALUES ($1, $2, $3, $4, $5)`,
    [listId, itemId, price, amount, done]
  );

  return {
    id: itemId,
    name,
    price,
    amount,
    done,
    categoryId
  };
}

async function getItemsByListId(listId) {
  const query = `
    SELECT i.id, i.name, i.category_id,
           li.price, li.amount, li.done
    FROM items i
    JOIN list_items li ON i.id = li.item_id
    WHERE li.list_id = $1
  `;
  const { rows } = await pool.query(query, [listId]);
  return rows;
}

async function updateItemRelation(listId, itemId, { price, amount, done }) {
  const query = `
    UPDATE list_items
    SET price = $3, amount = $4, done = $5
    WHERE list_id = $1 AND item_id = $2
    RETURNING *
  `;
  const { rows } = await pool.query(query, [listId, itemId, price, amount, done]);
  if (rows.length === 0) return null;
  return rows[0];
}

async function deleteItemFromList(listId, itemId) {
  const query = `DELETE FROM list_items WHERE list_id = $1 AND item_id = $2 RETURNING *`;
  const { rows } = await pool.query(query, [listId, itemId]);
  if (rows.length === 0) return null;
  return rows[0];
}

module.exports = {
  createItem,
  getItemsByListId,
  updateItemRelation,
  deleteItemFromList,
};
