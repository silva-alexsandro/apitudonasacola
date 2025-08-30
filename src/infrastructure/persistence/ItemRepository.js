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
  async createRelation(listId, itemId, price, amount, unit, done, category_id = null) {
    const { rows } = await this.db.query(
      `INSERT INTO list_items (list_id, item_id, price, amount, unit, done, category_id)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [listId, itemId, price, amount, unit, done, category_id]
    );
    return rows[0];
  }
  async update(listId, itemId, updateData) {
    const fields = [];
    const values = [];
    let index = 1;

    const fieldMappings = {
      price: 'price',
      amount: 'amount',
      done: 'done',
      unit: 'unit',
      category_id: 'category_id'
    };

    Object.keys(fieldMappings).forEach(key => {
      if (updateData[key] !== undefined) {
        fields.push(`${fieldMappings[key]} = $${index}`);
        values.push(updateData[key]);
        index++;
      }
    });

    if (fields.length === 0) return null;

    fields.push(`updated_at = NOW()`);

    const query = `
    UPDATE list_items
    SET ${fields.join(', ')}
    WHERE list_id = $${index} AND item_id = $${index + 1}
    RETURNING *,
      (SELECT name FROM categories WHERE id = list_items.category_id) as category_name
  `;

    values.push(listId, itemId);

    const { rows } = await this.db.query(query, values);
    return rows[0] || null;
  }
  async getItemsByListId(listId) {
    const query = `
    SELECT 
      i.id, 
      i.name, 
      li.price, 
      li.amount, 
      li.done, 
      li.unit,
      li.category_id,
      c.name as category_name
    FROM items i
    JOIN list_items li ON i.id = li.item_id
    JOIN lists l ON li.list_id = l.id
    LEFT JOIN categories c ON li.category_id = c.id
    WHERE li.list_id = $1
  `;

    const { rows } = await this.db.query(query, [listId]);
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