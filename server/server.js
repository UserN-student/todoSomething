const express = require("express");
const db = require("./db");
const app = express();
const PORT = 3000;
const cors = require("cors");

app.use(cors());
app.use(express.json());

// Получение всех задач из БД
app.get("/api/tasks", (req, res) => {
    try {
        const tasks = db.prepare("SELECT * FROM Tasks").all();
        res.json(tasks);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Ошибка получения задач",
        });
    }
});

// Добавление новой задачи
app.post("/api/tasks", (req, res) => {
    try {
        const { title, priority } = req.body;

        // Проверяем входные данные
        if (!title || !priority) {
            return res.status(400).json({
                message: "Название и приоритет обязательны",
            });
        }

        // Добавляем задачу в БД
        const result = db
            .prepare(`
                INSERT INTO Tasks (title, priority)
                VALUES (?, ?)
            `)
            .run(title.trim(), priority);

        // Отправляем ответ
        res.status(201).json({
            message: "Задача добавлена",
            id: result.lastInsertRowid,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Ошибка добавления задачи",
        });
    }
});

app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});