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

        // Создаём checkbox
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed === 1;

        // Создаём название задачи
        const title = document.createElement("span");
        title.textContent = `${task.title} | ${task.priority}`;

        // Если задача выполнена, зачёркиваем название
        if (task.completed === 1) {
            title.style.textDecoration = "line-through";
        }

        // Обработка изменения checkbox
        checkbox.addEventListener("change", () => {
            updateTaskStatus(task.id, checkbox.checked);
        });

        // Кнопка удаления
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Удалить";
        deleteButton.addEventListener("click", () => {
            deleteTask(task.id);
        });

        li.appendChild(checkbox);
        li.appendChild(title);
        li.appendChild(deleteButton);
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

async function deleteTask(id) {
    const response = await fetch(`http://localhost:3000/api/tasks/${id}`, {
        method: "DELETE",
    });

    if (!response.ok) {
        alert("Не удалось удалить задачу");
        return;
    }

    loadTasks();
}

async function updateTaskStatus(id, completed) {
    const response = await fetch(`http://localhost:3000/api/tasks/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            completed: completed,
        }),
    });

    if (!response.ok) {
        alert("Не удалось изменить статус задачи");
        await loadTasks();
        return;
    }

    loadTasks();
}