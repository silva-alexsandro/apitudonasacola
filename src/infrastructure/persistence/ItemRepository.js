import { IItemRepository } from '../../domain/item/repositories/IItemRepository.js';

export class ItemRepository extends IItemRepository {
  constructor(dbClient) {
    super();
    this.db = dbClient;
  }
  async create(name) {
    const { rows } = await this.db.query(
      'INSERT INTO items (name) VALUES ($1) RETURNING *',
      [name]
    );
    return rows[0];
  }
  async findByName(name) {
    const { rows } = await this.db.query('SELECT * FROM items WHERE name = $1', [name]);
    return rows[0] || null;
  }
  async findRelation(listId, itemId) {
    const { rows } = await this.db.query(
      'SELECT * FROM list_items WHERE list_id = $1 AND item_id = $2',
      [listId, itemId]
    );
    return rows[0] || null;
  }
  async createRelation(listId, itemId, price, amount, done) {
    await this.db.query(
      `INSERT INTO list_items (list_id, item_id, price, amount, done)
       VALUES ($1, $2, $3, $4, $5)`,
      [listId, itemId, price, amount, done]
    );
    return { listId, itemId, price, amount, done };
  }
  async update(listId, itemId, updateData) {
    const fields = [];
    const values = [];
    let index = 1;

    if (updateData.price !== undefined) {
      fields.push(`price = $${index++}`);
      values.push(updateData.price);
    }

    if (updateData.amount !== undefined) {
      fields.push(`amount = $${index++}`);
      values.push(updateData.amount);
    }

    if (updateData.done !== undefined) {
      fields.push(`done = $${index++}`);
      values.push(updateData.done);
    }

    if (fields.length === 0) return null;

    fields.push(`updated_at = NOW()`);

    const query = `
    UPDATE list_items
    SET ${fields.join(', ')}
    WHERE list_id = $${index++} AND item_id = $${index}
    RETURNING *
  `;
    values.push(listId, itemId);

    const { rows } = await this.db.query(query, values);
    return rows[0] || null;
  }

  async getItemsByListId(listId, ownerId, itemId = null) {
    let query = `
    SELECT i.id, i.name, li.price, li.amount, li.done
    FROM items i
    JOIN list_items li ON i.id = li.item_id
    JOIN lists l ON li.list_id = l.id
    WHERE li.list_id = $1
      AND l.owner_id = $2
  `;
    const params = [listId, ownerId];
    if (itemId) {
      query += ` AND i.id = $3`;
      params.push(itemId);
    }
    const { rows } = await this.db.query(query, params);
    return rows;
  }
  async deleteItemFromList(listId, itemId) {
    const query = `
      DELETE FROM list_items WHERE list_id = $1 AND item_id = $2 RETURNING *
    `;
    const { rows } = await this.db.query(query, [listId, itemId]);
    if (rows.length === 0) return null;
    return rows[0];
  }
  async findByNameLike(term) {
    const { rows } = await this.db.query(
      'SELECT * FROM items WHERE name ILIKE $1',
      [`%${term}%`]
    );
    return rows;
  }
}
