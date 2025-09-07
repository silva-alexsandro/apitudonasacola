import { Owner } from '../../domain/owner/entities/Owner.js';
import { IOwnerRepository } from '../../domain/owner/repositories/IOwnerRepository.js';

export class OwnerRepository extends IOwnerRepository {
  constructor(dbClient) {
    super();
    this.db = dbClient;
  }
  mapToOwner({ id, created_at, last_active }) {
    return new Owner({
      id,
      createdAt: new Date(created_at),
      lastActive: new Date(last_active)
    });
  }
  async create(owner) {
    const { id, createdAt, lastActive } = owner;
    const query = `
      INSERT INTO owners (id, created_at, last_active)
      VALUES ($1, $2, $3)
      RETURNING id, created_at, last_active
    `;
    const { rows } = await this.db.query(query, [
      id,
      createdAt.toISOString(),
      lastActive.toISOString()
    ]);

    return this.mapToOwner(rows[0]);
  }

  async findAll() {
    const query = `SELECT * FROM owners`;
    const { rows } = await this.db.query(query);
    return rows.map(this.mapToOwner);
  }

  async findById(id) {
    const query = `SELECT * FROM owners WHERE id = $1`;
    const { rows } = await this.db.query(query, [id]);

    if (rows.length === 0) {
      return null;
    }

    return this.mapToOwner(rows[0]);
  }

  async updateLastActive(id, data) {
    const query = `
      UPDATE owners
      SET last_active = $1
      WHERE id = $2
      RETURNING id, created_at, last_active
    `;
    const { rows } = await this.db.query(query, [data, id]);

    if (rows.length === 0) {
      return null;
    }
    return this.mapToOwner(rows[0]);
  }
}
