const pool = require('../../db.js');

async function createItem(listId, { name, price = null, amount = null, done = false }) {
  const client = await pool.connect(); 
  try {
    await client.query('BEGIN');
    const existingItemRes = await client.query('SELECT id FROM items WHERE name = $1', [name]);
    let itemId;

    if (existingItemRes.rows.length === 0) {
      const insertItemRes = await client.query(
        'INSERT INTO items (name) VALUES ($1) RETURNING id',
        [name]
      );
      itemId = insertItemRes.rows[0].id;
    } else {
      itemId = existingItemRes.rows[0].id;
    }

    const relationRes = await client.query(
      'SELECT * FROM list_items WHERE list_id = $1 AND item_id = $2',
      [listId, itemId]
    );

    if (relationRes.rows.length > 0) {
      throw new Error('Este item já está associado a esta lista.');
    }

    await client.query(
      `INSERT INTO list_items (list_id, item_id, price, amount, done)
       VALUES ($1, $2, $3, $4, $5)`,
      [listId, itemId, price, amount, done]
    );

    await client.query('COMMIT');

    return {
      id: itemId,
      name,
      price,
      amount,
      done
    };

  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
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
