import { Category } from '../../domain/category/entities/category.js';
import { ICategoryRepository } from '../../domain/category/repositories/ICategoryRepository.js';

export class CategoryRepository extends ICategoryRepository {
  constructor(dbClient) {
    super();
    this.db = dbClient;
  }

  async findByName(name) {
    const query = 'SELECT * FROM categories WHERE name = $1';
    const { rows } = await this.db.query(query, [name]);
    return new Category(rows[0]);
  }

  async findAll() {
    const query = 'SELECT * FROM categories ORDER BY name';
    const result = await this.db.query(query);
    return result.rows;
  }

  async findById(id) {
    const query = 'SELECT * FROM categories WHERE id = $1';
    const { rows } = await this.db.query(query, [id]);
    return new Category(rows[0]);
  }

}