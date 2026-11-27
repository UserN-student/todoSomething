const Database = require("better-sqlite3");
const path = require("path");

// Создаём или открываем базу данных
const db = new Database(path.join(__dirname, "database", "todo.db"));

// Создаём таблицу задач
db.exec(`
    CREATE TABLE IF NOT EXISTS Tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        priority TEXT NOT NULL,
        completed INTEGER DEFAULT 0
    )
`);

module.exports = db;