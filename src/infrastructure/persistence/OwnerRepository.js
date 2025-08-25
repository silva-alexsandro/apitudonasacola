import { IOwnerRepository } from '../../domain/owner/repositories/IOwnerRepository.js';

export class OwnerRepository extends IOwnerRepository {
  constructor(dbClient) {
    super();
    this.db = dbClient;
  }

  async create(owner) {
    const { id, createdAt, lastActive } = owner;
    const query = `
      INSERT INTO owners (id, created_at, last_active)
      VALUES ($1, $2, $3)
      RETURNING id, created_at, last_active
    `;
    const { rows } = await this.db.query(query, [id, createdAt, lastActive]);
    return rows[0];
  }

  async findAll() {
    const query = `SELECT * FROM owners`;
    const { rows } = await this.db.query(query);
    return rows;
  }

  async findById(id) {
    const query = `
      SELECT * FROM owners WHERE id = $1
    `;
    const { rows } = await this.db.query(query, [id]);
    return rows[0] || null;
  }

  async updateLastActive(id) {
    const query = `
      UPDATE owners SET last_active = $1 WHERE id = $2 RETURNING id, last_active
    `;
    const { rows } = await this.db.query(query, [new Date(), id]);
    return rows[0] || null;
  }
}
