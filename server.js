const express = require("express");
const db = require("./db");
const app = express();
const PORT = 3000;

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

app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});