import { Pool } from 'pg';

const pool = new Pool({
 connectionString:
  process.env.DATABASE_URL ||
  'postgresql://postgres.xszaqmzyyuhguambfaig:8kq5%25%24d34F%21nLua@aws-1-sa-east-1.pooler.supabase.com:6543/postgres',
 ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false,
});

export class DbClient {
 static instance;

 constructor() {
  if (DbClient.instance) {
   return DbClient.instance;
  }
  // Reutiliza o pool global
  this.pool = pool;
  DbClient.instance = this;
 }

 // query continua igual, mas não precisa conectar manualmente
 async query(text, params) {
  return this.pool.query(text, params);
 }

 // close só fecha o pool quando realmente for necessário
 async close() {
  await this.pool.end();
 }
}
