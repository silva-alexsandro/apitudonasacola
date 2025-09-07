import { ListItem } from '../../domain/item/entities/ListItem.js';
import { IListItemRepository } from '../../domain/item/repositories/IListItemRepository.js';

export class ListItemRepository extends IListItemRepository {
  constructor(dbClient) {
    super();
    this.db = dbClient;
  }
  async createRelation(listId, itemId, price, amount, unit, done, categoryId = null) {
    const { rows } = await this.db.query(
      `INSERT INTO list_items (list_id, item_id, price, amount, unit, done, category_id)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [listId, itemId, price, amount, unit, done, categoryId]
    );
    const row = rows[0]
    return row ? new ListItem({
      listId: row.list_id,
      itemId: row.item_id,
      price: row.price,
      amount: row.amount,
      unit: row.unit,
      done: row.done,
      category_id: row.category_id,
      category_name: row.category_name
    }) : null;
  }

  async deleteItemFromList(listId, itemId) {
    const query = `
      DELETE FROM list_items WHERE list_id = $1 AND item_id = $2 RETURNING *
    `;
    const { rows } = await this.db.query(query, [listId, itemId]);
    if (rows.length === 0) return null;
    const row = rows[0]
    return row ? new ListItem({
      listId: row.list_id,
      itemId: row.item_id,
      price: row.price,
      amount: row.amount,
      unit: row.unit,
      done: row.done,
      category_id: row.category_id,
      category_name: row.category_name
    }) : null;
  }

  async findRelation(listId, itemId) {
    const { rows } = await this.db.query(
      'SELECT * FROM list_items WHERE list_id = $1 AND item_id = $2',
      [listId, itemId]
    );
    const row = rows[0]
    return row ? new ListItem({
      listId: row.list_id,
      itemId: row.item_id,
      price: row.price,
      amount: row.amount,
      unit: row.unit,
      done: row.done,
      category_id: row.category_id,
      category_name: row.category_name
    }) : null;
  }

  async getItemsByListId(listId) {
    const query = `
      SELECT 
        i.id AS item_id, 
        i.name, 
        li.price, 
        li.amount, 
        li.done, 
        li.unit,
        li.category_id,
        c.name AS category_name
      FROM items i
      JOIN list_items li ON i.id = li.item_id
      LEFT JOIN categories c ON li.category_id = c.id
      WHERE li.list_id = $1
    `;

    const { rows } = await this.db.query(query, [listId]);

    return rows.map(row => new ListItem({
      listId,
      itemId: row.item_id,
      price: row.price,
      amount: row.amount,
      unit: row.unit,
      done: row.done,
      category_id: row.category_id,
      category_name: row.category_name
    }));
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
    const row = rows[0];

    return row ? new ListItem({
      listId: row.list_id,
      itemId: row.item_id,
      price: row.price,
      amount: row.amount,
      unit: row.unit,
      done: row.done,
      category_id: row.category_id,
      category_name: row.category_name
    }) : null;
  }
}