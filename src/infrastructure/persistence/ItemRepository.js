import { Item } from '../../domain/item/entities/Item.js';
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
    return new Item(rows[0]);
  }

  async findByName(name) {
    const { rows } = await this.db.query('SELECT * FROM items WHERE name = $1', [name]);
    return rows.length > 0 ? new Item(rows[0]) : null;
  }

  async findByNameLike(term) {
    const { rows } = await this.db.query(
      'SELECT * FROM items WHERE name ILIKE $1',
      [`%${term}%`]
    );
    return rows;
  }
}