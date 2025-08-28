export class StatsRepository {
  constructor(dbClient) {
    this.db = dbClient;
  }

  async countAll(tableName) {
    const allowedTables = ['owners', 'lists', 'items'];

    if (!allowedTables.includes(tableName)) {
      throw new Error('Tabela inválida');
    }
    const { rows } = await this.db.query(`SELECT COUNT(*) FROM ${tableName}`);
    return rows[0] || null;
  }
}

