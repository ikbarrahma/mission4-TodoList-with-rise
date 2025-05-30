const dataTodoList = [
  {
    idTodo: 1,
    todo: "Belajar js",
    time: 20,
    value: false,
  },
  {
    idTodo: 2,
    todo: "Belajar node",
    time: 20,
    value: false,
  },
];

// Membuat penyimpanan session storage
sessionStorage.setItem("todoList", JSON.stringify(dataTodoList));
const dataTodo = JSON.parse(sessionStorage.getItem("todoList"));
const input = document.querySelector("#input");
const sumbit = document.querySelector("#form-submit");
const formContainer = document.querySelector("#container-todo");
const todoUl = document.querySelector("#todo-ul");

// Todolist
function todoList() {
  todoUl.innerHTML = "";

  dataTodo.forEach((item, index) => {
    const li = document.createElement("li"); // membuat li

    // Checkbox
    const checkbox = document.createElement("input"); // membuat input
    checkbox.type = "checkbox"; //input bertipe check box
    checkbox.checked = item.value; // check box berisi value dari item (status awal false)
    checkbox.addEventListener("change", () => {
      // memberikan kondisi perubahan ketika check box
      item.value = checkbox.checked; // berikan kondisi check box
      sessionStorage.setItem("todoList", JSON.stringify(dataTodo)); // simpan data
      li.style.textDecoration = item.value ? "line-through" : "none"; // kondisi jika item value bernilai true
    });

    // Text
    const span = document.createElement("span"); // membuat text span
    span.textContent = " " + item.todo; // menambahkan span dan text todo
    if (item.value) {
      // cek apakah item value bernilai true
      span.style.textDecoration = "line-through"; // kasih line through
    }

    // Hapus Button
    const btn = document.createElement("button");
    btn.textContent = "❌";
    btn.style.marginLeft = "10px";
    btn.addEventListener("click", () => {
      dataTodo.splice(index, 1);
      // start	Index (posisi) di mana perubahan dimulai
      // deleteCount	Jumlah elemen yang ingin dihapus
      // item1, item2...	(Opsional) Elemen baru yang ingin ditambahkan ke array setelah start
      sessionStorage.setItem("todoList", JSON.stringify(dataTodo));
      todoList(); // refresh tampilan
    });

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(btn);
    todoUl.appendChild(li);
  });
  formContainer.appendChild(todoUl);
}

todoList();

// input todolist
sumbit.addEventListener("click", () => {
  if (input.value.trim() === "") return;

  const todoListBaru = {
    idTodo: dataTodoList.length + 1,
    todo: input.value,
    time: Date.now(),
    value: false,
  };
  dataTodo.push(todoListBaru);
  sessionStorage.setItem("todoList", JSON.stringify(dataTodo));
  todoList();
  input.value = "";
});
