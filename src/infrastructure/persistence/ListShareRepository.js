import { ListShare } from "../../domain/list/entities/ListShare.js";
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
      listShare.expiresAt,
      listShare.createdAt,
    ];

    const { rows } = await this.db.query(query, values);
    return new ListShare(rows[0]);
  }

  async findByListId(list_id) {
  const query = `
    SELECT * FROM list_shares WHERE list_id = $1;
  `;
  const { rows } = await this.db.query(query, [list_id]);

  if (rows.length === 0) return null;

  return new ListShare(rows[0]);
}


  async findByToken(token) {
    const query = `
    SELECT * FROM list_shares WHERE token = $1;
  `;
    const { rows } = await this.db.query(query, [token]);

    if (rows.length === 0) return null;

    return new ListShare(rows[0]);
  }

}