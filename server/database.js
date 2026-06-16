const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Usar /tmp no Render para persistência temporária
const dbPath = process.env.RENDER ? '/tmp/chat.db' : path.join(__dirname, 'chat.db');
const db = new sqlite3.Database(dbPath);

// Criar tabela de mensagens
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL,
      message TEXT NOT NULL,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
});

module.exports = db;
