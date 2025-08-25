import { Pool } from 'pg';

export class DbClient {
  constructor() {
    if (DbClient.instance) {
      return DbClient.instance;
    }

    const connectionString = process.env.DATABASE_URL || 'postgresql://postgres.xszaqmzyyuhguambfaig:8kq5%25%24d34F%21nLua@aws-1-sa-east-1.pooler.supabase.com:6543/postgres';

    this.pool = new Pool({
      connectionString,
      ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false,
    });

    DbClient.instance = this;
  }

  async query(text, params) {
    const client = await this.pool.connect();
    try {
      const result = await client.query(text, params);
      return result;
    } finally {
      client.release();
    }
  }

  async close() {
    await this.pool.end();
  }
}
