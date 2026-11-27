const taskForm = document.getElementById("taskForm");
const taskTitle = document.getElementById("taskTitle");
const taskPriority = document.getElementById("taskPriority");
const taskList = document.getElementById("taskList");

// Получение задач с сервера
async function loadTasks() {
    const response = await fetch("http://localhost:3000/api/tasks");
    const tasks = await response.json();
    taskList.innerHTML = "";

    tasks.forEach((task) => {
        const li = document.createElement("li");
        li.textContent = `${task.title} | ${task.priority}`;
        taskList.appendChild(li);
    });
}

// Добавление задачи
taskForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const newTask = {
        title: taskTitle.value.trim(),
        priority: taskPriority.value,
    };

    if (!newTask.title) {
        return;
    }

    const response = await fetch("http://localhost:3000/api/tasks", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
    });

    if (!response.ok) {
        alert("Не удалось добавить задачу");
        return;
    }

    taskTitle.value = "";
    loadTasks();
});

// Загрузка задач при открытии страницы
loadTasks();