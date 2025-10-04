import { ListItem } from '../../domain/item/entities/ListItem.js';
import { IListItemRepository } from '../../domain/item/repositories/IListItemRepository.js';

export class ListItemRepository extends IListItemRepository {
 constructor(dbClient) {
  super();
  this.db = dbClient;
 }
 _mapRowToListItem(row, listId = null) {
  return new ListItem({
   listId: listId || row.list_id,
   itemId: row.item_id,
   price: row.price,
   amount: row.amount,
   unit: row.unit,
   done: row.done,
   category_id: row.category_id,
   category_name: row.category_name,
   item_name: row.item_name,
  });
 }

 async createRelation(
  listId,
  itemId,
  price,
  amount,
  unit,
  done,
  categoryId = null
 ) {
  const query = `
      INSERT INTO list_items (list_id, item_id, price, amount, unit, done, category_id)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *,
        (SELECT name FROM categories WHERE id = category_id) AS category_name,
        (SELECT name FROM items WHERE id = item_id) AS item_name
    `;

  const { rows } = await this.db.query(query, [
   listId,
   itemId,
   price,
   amount,
   unit,
   done,
   categoryId,
  ]);

  return rows[0] ? this._mapRowToListItem(rows[0], listId) : null;
 }

 async deleteItemFromList(listId, itemId) {
  const query = `
      DELETE FROM list_items
      WHERE list_id = $1 AND item_id = $2
      RETURNING *,
        (SELECT name FROM categories WHERE id = category_id) AS category_name,
        (SELECT name FROM items WHERE id = item_id) AS item_name
    `;

  const { rows } = await this.db.query(query, [listId, itemId]);

  return rows[0] ? this._mapRowToListItem(rows[0], listId) : null;
 }

 async findRelation(listId, itemId) {
  const query = `
      SELECT li.*,
             i.name AS item_name,
             c.name AS category_name
      FROM list_items li
      JOIN items i ON li.item_id = i.id
      LEFT JOIN categories c ON li.category_id = c.id
      WHERE li.list_id = $1 AND li.item_id = $2
    `;

  const { rows } = await this.db.query(query, [listId, itemId]);

  return rows[0] ? this._mapRowToListItem(rows[0], listId) : null;
 }

 async getItemsByListId(listId) {
  const query = `
      SELECT 
        li.*,
        i.name AS item_name,
        c.name AS category_name
      FROM list_items li
      JOIN items i ON li.item_id = i.id
      LEFT JOIN categories c ON li.category_id = c.id
      WHERE li.list_id = $1
    `;

  const { rows } = await this.db.query(query, [listId]);

  return rows.map((row) => this._mapRowToListItem(row, listId));
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
   category_id: 'category_id',
  };

  Object.keys(fieldMappings).forEach((key) => {
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
      (SELECT name FROM categories WHERE id = category_id) AS category_name,
        (SELECT name FROM items WHERE id = item_id) AS item_name
  `;

  values.push(listId, itemId);

  const { rows } = await this.db.query(query, values);

  return rows[0] ? this._mapRowToListItem(rows[0], listId) : null;
 }
}
