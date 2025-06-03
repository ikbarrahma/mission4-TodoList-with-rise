const dataTodoList = [
  {
    idTodo: Date.now(),
    todo: "Belajar js",
    time: Date.now(),
    value: false,
    priority: "low",
  },
  {
    idTodo: Date.now(),
    todo: "Belajar node",
    time: Date.now(),
    value: false,
    priority: "high",
  },
];

// Membuat penyimpanan session storage
sessionStorage.setItem("todoList", JSON.stringify(dataTodoList));
const dataTodo = JSON.parse(sessionStorage.getItem("todoList"));
const input = document.querySelector("#input");
const sumbit = document.querySelector("#form-submit");
const formContainer = document.querySelector("#container-todo");
const todoUl = document.querySelector("#todo-ul");
const priority = document.querySelector("#priority");
let currentFilter = "todo";
const today = new Date();
const yyyy = today.getFullYear();
const mm = String(today.getMonth() + 1).padStart(2, "0");
const dd = String(today.getDate()).padStart(2, "0");
document.getElementById("date").value = `${yyyy}-${mm}-${dd}`;

// Todolist
function todoList() {
  todoUl.innerHTML = "";

  dataTodo.forEach((item, index) => {
    if (
      (currentFilter === "todo" && item.value) ||
      (currentFilter === "done" && !item.value)
    ) {
      return; // skip item yang tidak sesuai filter
    }

    const li = document.createElement("li");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = item.value;
    checkbox.addEventListener("change", () => {
      item.value = checkbox.checked;
      sessionStorage.setItem("todoList", JSON.stringify(dataTodo));
      todoList(); // refresh agar pindah tab otomatis
    });

    const span = document.createElement("span");
    span.textContent = item.todo;
    span.style.marginLeft = "10px";
    if (item.value) span.style.textDecoration = "line-through";

    const date = new Date(item.time);
    const formattedDate = date.toLocaleDateString("id-ID", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

    const prioritySpan = document.createElement("span");
    prioritySpan.textContent = item.priority.toUpperCase();
    prioritySpan.classList.add("priority-label", `priority-${item.priority}`);
    prioritySpan.style.marginLeft = "10px";

    const dateSpan = document.createElement("span");
    dateSpan.textContent = formattedDate;
    dateSpan.style.marginLeft = "10px";
    dateSpan.style.fontSize = "12px";
    dateSpan.style.color = "#888";

    const btn = document.createElement("button");
    btn.textContent = "❌";
    btn.style.marginLeft = "10px";
    btn.addEventListener("click", () => {
      dataTodo.splice(index, 1);
      sessionStorage.setItem("todoList", JSON.stringify(dataTodo));
      todoList();
    });

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(prioritySpan);
    li.appendChild(dateSpan); // ← ini tambahan
    li.appendChild(btn);
    todoUl.appendChild(li);
  });
}

todoList();

// fungsi happus
const tabs = document.querySelectorAll(".tab");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabs.forEach((t) => t.classList.remove("active"));
    tab.classList.add("active");
    currentFilter = tab.dataset.filter; // ganti filter sesuai tab
    todoList(); // refresh tampilan
  });
});

// input todolist
sumbit.addEventListener("click", () => {
  if (input.value.trim() === "") return;

  const date = document.getElementById("date");
  const todoListBaru = {
    idTodo: Date.now(),
    todo: input.value,
    time: date.value,
    value: false,
    priority: priority.value,
  };
  dataTodo.push(todoListBaru);
  sessionStorage.setItem("todoList", JSON.stringify(dataTodo));
  todoList();
  input.value = "";
});

function updateDateTime() {
  const now = new Date();
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };
  const formatted = now.toLocaleDateString("id-ID", options);
  document.getElementById("datetime").textContent = formatted;
}

setInterval(updateDateTime, 1000); // Update setiap detik
updateDateTime();

const clear = document.querySelector("#clear-all");

clear.addEventListener("click", () => {
  dataTodo.splice(0, dataTodo.length);
  console.log("Data telah dikosongkan:", dataTodo);
  todoList();
});
