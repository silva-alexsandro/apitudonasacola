import { IListRepository } from '../../domain/list/repositories/IListRepository.js';

export class ListRepository extends IListRepository {
  constructor(dbClient) {
    super();
    this.db = dbClient;
  }

  async updateList(listId, ownerId, updateData) {
    const fields = [];
    const values = [];
    let index = 1;

    if (updateData.name !== undefined) {
      fields.push(`name = $${index++}`);
      values.push(updateData.name);
    }

    if (updateData.is_archived !== undefined) {
      fields.push(`is_archived = $${index++}`);
      values.push(updateData.is_archived);
    }

    if (updateData.is_favorite !== undefined) {
      fields.push(`is_favorite = $${index++}`);
      values.push(updateData.is_favorite);
    }

    if (fields.length === 0) return null; // nada para atualizar

    fields.push(`updated_at = NOW()`);

    const query = `
    UPDATE lists
    SET ${fields.join(', ')}
    WHERE id = $${index++} AND owner_id = $${index}
    RETURNING id, name, is_archived, is_favorite, owner_id, created_at, updated_at
  `;

    values.push(listId, ownerId);

    const { rows } = await this.db.query(query, values);
    return rows[0];
  }

  async create(list) {
    const query = `
       INSERT INTO lists (name, is_archived, is_favorite, owner_id)
      VALUES ($1, $2, $3, $4)
      RETURNING id, name, is_archived, is_favorite, owner_id, created_at, updated_at
    `;

    const { rows } = await this.db.query(query, [
      list.name,
      list.archived,
      list.favorite,
      list.owner.id
    ]);
    return rows[0];
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
    return rows[0] || null;
  }

  async getAllByOwner(ownerId) {
    const query = `
      SELECT id, name, is_archived, is_favorite, owner_id, created_at, updated_at
      FROM lists
      WHERE owner_id = $1
      ORDER BY created_at DESC
    `;
    const { rows } = await this.db.query(query, [ownerId]);
    return rows;
  }

  async deleteListById(id, ownerId) {
    const query = `
    DELETE FROM lists
    WHERE id = $1 AND owner_id = $2
    RETURNING id
  `;
    const { rows } = await this.db.query(query, [id, ownerId]);
    return rows[0];
  }

  async deleteLists(ownerId) {
    const query = `
    DELETE FROM lists
    WHERE owner_id = $1 AND is_archived = false AND is_favorite = false
    RETURNING id
  `;
    const { rows } = await this.db.query(query, [ownerId]);
    return rows;
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
