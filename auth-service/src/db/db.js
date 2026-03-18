const { Pool } = require('pg');

const poolConfig = process.env.DATABASE_URL 
  ? { 
      // ถ้ามี DATABASE_URL (เช่น บน Railway) ให้ใช้เส้นนี้เส้นเดียว
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
    }
  : {
      // ถ้าไม่มี (เช่น บน Local) ให้ใช้ค่าแยกตาม Environment
      host:     process.env.DB_HOST     || 'auth-db',
      port:     parseInt(process.env.DB_PORT) || 5432,
      database: process.env.DB_NAME     || 'authdb',
      user:     process.env.DB_USER     || 'admin',
      password: process.env.DB_PASSWORD || 'secret123',
    };

const pool = new Pool(poolConfig);

module.exports = { pool };