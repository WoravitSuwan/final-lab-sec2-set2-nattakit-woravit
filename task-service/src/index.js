require('dotenv').config();
const express = require('express');
const cors    = require('cors');
const { pool } = require('./db/db');
const tasksRouter = require('./routes/tasks');

const app  = express();
const PORT = process.env.PORT || 3002;

app.use(cors());
app.use(express.json());
app.use('/api/tasks', tasksRouter);

async function start() {
  let retries = 10;

  while (retries > 0) {
    try {
      // ตรวจสอบการเชื่อมต่อ
      await pool.query('SELECT 1');

      // 🔥 Fallback: สร้าง tables ถ้ายังไม่มี (รองรับทั้ง Local และ Railway)
      await pool.query(`
        CREATE TABLE IF NOT EXISTS tasks (
          id          SERIAL PRIMARY KEY,
          user_id     INTEGER      NOT NULL,
          title       VARCHAR(200) NOT NULL,
          description TEXT,
          status      VARCHAR(20)  DEFAULT 'TODO' CHECK (status IN ('TODO','IN_PROGRESS','DONE')),
          priority    VARCHAR(10)  DEFAULT 'medium' CHECK (priority IN ('low','medium','high')),
          created_at  TIMESTAMP    DEFAULT NOW(),
          updated_at  TIMESTAMP    DEFAULT NOW()
        );

        CREATE TABLE IF NOT EXISTS logs (
          id         SERIAL       PRIMARY KEY,
          level      VARCHAR(10)  NOT NULL CHECK (level IN ('INFO','WARN','ERROR')),
          event      VARCHAR(100) NOT NULL,
          user_id    INTEGER,
          message    TEXT,
          meta       JSONB,
          created_at TIMESTAMP    DEFAULT NOW()
        );
      `);

      console.log('[task-service] DB ready ✅');
      break;

    } catch (err) {
      console.log(`[task-service] Waiting DB... (${retries} left) - Error: ${err.message}`);
      retries--;
      // รอ 3 วินาทีก่อนลองใหม่
      await new Promise(r => setTimeout(r, 3000));
    }
  }

  app.listen(PORT, () => console.log(`[task-service] Running on :${PORT}`));
}

start();