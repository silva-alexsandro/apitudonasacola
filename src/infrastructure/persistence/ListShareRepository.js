import { IListShareRepository } from "../../domain/list/repositories/IListShareRepository.js";


export class ListShareRepository extends IListShareRepository {
  constructor(dbClient) {
    super();
    this.db = dbClient;
  }
  async save(listShare) {
    const query = `
      INSERT INTO list_shares (list_id, token, permission, expires_at, created_at)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `;
    const values = [
      listShare.list_id,
      listShare.token,
      listShare.permission,
      listShare.expires_at,
      listShare.created_at,
    ];

    const result = await this.db.query(query, values);
    return result.rows[0];
  }
}