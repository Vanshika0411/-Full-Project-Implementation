let taskInput = document.getElementById("task-input");
let addBtn = document.getElementById("add-btn");
let taskList = document.getElementById("task-list");
let clearAllBtn = document.getElementById("clear-all");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Render all saved tasks on load
window.onload = () => {
  tasks.forEach((task, index) => {
    createTaskElement(task.text, task.completed, index);
  });
};

function updateLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function createTaskElement(text, completed = false, index) {
  const li = document.createElement("li");
  li.className = "task";
  if (completed) li.classList.add("completed");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = completed;

  const span = document.createElement("span");
  span.textContent = text;

  const actions = document.createElement("div");
  actions.className = "task-actions";

  const editBtn = document.createElement("button");
  editBtn.innerHTML = "✏️";
  const deleteBtn = document.createElement("button");
  deleteBtn.innerHTML = "🗑️";

  actions.appendChild(editBtn);
  actions.appendChild(deleteBtn);

  li.appendChild(checkbox);
  li.appendChild(span);
  li.appendChild(actions);
  taskList.appendChild(li);

  // Events
  checkbox.addEventListener("change", () => {
    li.classList.toggle("completed");
    tasks[index].completed = checkbox.checked;
    updateLocalStorage();
  });

  deleteBtn.addEventListener("click", () => {
    tasks.splice(index, 1);
    taskList.removeChild(li);
    updateLocalStorage();
    reloadTasks();
  });

  editBtn.addEventListener("click", () => {
    const newText = prompt("Edit task:", span.textContent);
    if (newText !== null && newText.trim() !== "") {
      tasks[index].text = newText;
      span.textContent = newText;
      updateLocalStorage();
    }
  });
}

addBtn.addEventListener("click", () => {
  const taskText = taskInput.value.trim();
  if (taskText === "") return;
  tasks.push({ text: taskText, completed: false });
  updateLocalStorage();
  taskInput.value = "";
  reloadTasks();
});

clearAllBtn.addEventListener("click", () => {
  if (confirm("Clear all tasks?")) {
    tasks = [];
    updateLocalStorage();
    taskList.innerHTML = "";
  }
});

function reloadTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    createTaskElement(task.text, task.completed, index);
  });
}
