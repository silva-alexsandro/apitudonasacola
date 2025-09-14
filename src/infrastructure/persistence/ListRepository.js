import { List } from '../../domain/list/entities/List.js';
import { IListRepository } from '../../domain/list/repositories/IListRepository.js';

export class ListRepository extends IListRepository {
  constructor(dbClient) {
    super();
    this.db = dbClient;
  }

  mapToList({ id, name, is_archived, is_favorite, owner_id, created_at, updated_at }) {
    return new List({
      id,
      name,
      archived: is_archived,
      favorite: is_favorite,
      ownerId: owner_id,
      createdAt: created_at,
      updatedAt: updated_at
    });
  }

  async updateList(listId, ownerId, updateData) {
    const fields = [];
    const values = [];
    let index = 1;

    if (updateData.name !== undefined) {
      fields.push(`name = $${index++}`);
      values.push(updateData.name);
    }

    if (updateData.archived !== undefined) {
      fields.push(`is_archived = $${index++}`);
      values.push(updateData.archived);
    }

    if (updateData.favorite !== undefined) {
      fields.push(`is_favorite = $${index++}`);
      values.push(updateData.favorite);
    }

    if (fields.length === 0) return null;

    fields.push(`updated_at = NOW()`);

    const query = `
    UPDATE lists
    SET ${fields.join(', ')}
    WHERE id = $${index++} AND owner_id = $${index}
    RETURNING id, name, is_archived, is_favorite, owner_id, created_at, updated_at
  `;

    values.push(listId, ownerId);

    const { rows } = await this.db.query(query, values);
    if (!rows[0]) return null;

    return this.mapToList(rows[0]);
  }

  async create(list) {
    const query = `
       INSERT INTO lists (name, owner_id)
      VALUES ($1, $2)
      RETURNING id, name, is_archived, is_favorite, owner_id, created_at, updated_at
    `;
    const { rows } = await this.db.query(query, [
      list.name,
      list.ownerId,
    ]);
    return this.mapToList(rows[0]);
  }

  async findById(listId, ownerId) {
    let query = `
    SELECT id, name, is_archived, is_favorite, owner_id, created_at, updated_at
    FROM lists
    WHERE id = $1
  `;
    const params = [listId];
    if (ownerId !== null && ownerId !== undefined) {
      query += ` AND owner_id = $2`;
      params.push(ownerId);
    }

    const { rows } = await this.db.query(query, params);
    if (rows.length === 0) return null;
    return this.mapToList(rows[0]);
  }

  async getAllByOwner(ownerId) {
    const query = `
      SELECT * FROM lists
      WHERE owner_id = $1
      ORDER BY created_at DESC
    `;
    const { rows } = await this.db.query(query, [ownerId]);
    return rows.map(row => this.mapToList(row));
  }

  async getAllNamesByOwner(ownerId) {
    const query = `
      SELECT name FROM lists
      WHERE owner_id = $1
      ORDER BY created_at DESC
    `;
    const { rows } = await this.db.query(query, [ownerId]);
    return rows.map(row => this.mapToList(row));
  }

  async deleteListById(id, ownerId) {
    const query = `
    DELETE FROM lists
    WHERE id = $1 AND owner_id = $2
    RETURNING id, name, is_archived, is_favorite, owner_id, created_at, updated_at
  `;
    const { rows } = await this.db.query(query, [id, ownerId]);
    if (rows.length === 0) return null;
    return this.mapToList(rows[0]);
  }

  async deleteLists(ownerId) {
    const query = `
    DELETE FROM lists
    WHERE owner_id = $1 AND is_archived = false AND is_favorite = false
    RETURNING id, name, is_archived, is_favorite, owner_id, created_at, updated_at
  `;
    const { rows } = await this.db.query(query, [ownerId]);
    return rows.map(row => this.mapToList(row));
  }

  async findByNameAndOwnerAndDateRange(name, ownerId, startOfDay, endOfDay) {
    let query = `
    SELECT id FROM lists
    WHERE name = $1
      AND created_at >= $2
      AND created_at < $3
  `;
    const params = [name, startOfDay, endOfDay];
    if (ownerId !== null && ownerId !== undefined) {
      query += ' AND owner_id = $4';
      params.push(ownerId);
    }
    const { rows } = await this.db.query(query, params);
    return rows[0];
  }
}
