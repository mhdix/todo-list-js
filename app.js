// todo list
// let todos = [];
let filterValue = "all";

// todo add
const todoAddForm = document.querySelector(".todo__form");
const todoAddInput = document.querySelector(".todo__input");
const todoAddBtn = document.querySelector(".todo__btn");

// todo parent
const todoListProvider = document.querySelector(".todo__list");

// todo delete
const todoDeleteBtn = document.querySelector(".todo__delete");

// todo check
const todoCheckInput = document.querySelector(".todo__checkbox");

// todo filter
const todoFilter = document.querySelector(".filter-todos");

// todo sort
const todoSort = document.querySelector(".todo-sort__input");
todoSort.addEventListener("change", sortTodos);

//* add todo

//* event
todoAddForm.addEventListener("submit", addNewTodo);
todoFilter.addEventListener("change", (e) => {
  filterValue = e.target.value;
  filterTodos();
});
document.addEventListener("DOMContentLoaded", () => {
  const todos = getAllTodos();
  createTodos(todos);
});
//* functions
// add
function addNewTodo(e) {
  e.preventDefault();
  if (todoAddInput.value === "") return null;

  console.log(todoAddInput.value);
  const newTodo = {
    id: Date.now(),
    title: todoAddInput.value,
    // createdAt: new Date().toLocaleDateString("fa-IR"),
    createdAt: Date.now(),
    isCompleted: false,
  };
  console.log(todoAddInput.value);
  // todos.push(newTodo);
  saveTodo(newTodo);
  filterTodos();
}

function createTodos(todos) {
  let result = "";
  todos.forEach((todo) => {
    result += `<li class="todo__item ${
      todo.isCompleted ? "todo__item--done" : ""
    }" >
          <label class="todo__label">
            <input type="checkbox"  class="todo__checkbox" ${
              todo.isCompleted ? "checked " : ""
            } data-id="${todo.id}" />
            <span class="todo__text">${todo.title}</span>
            <span class="todo__text">${todo.createdAt}</span>
          </label>
          <button class="todo__delete" data-id="${todo.id}"f>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="todo__icon"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M9 7h6m2-3H7v3h10V4z"
              />
            </svg>
          </button>
        </li>`;
  });
  todoAddInput.value = "";
  todoListProvider.innerHTML = result;

  // remove todo
  const removeBtn = [...document.querySelectorAll(".todo__delete")];
  removeBtn.forEach((todo) => todo.addEventListener("click", deleteTodo));

  // check todo
  const completedTodo = [...document.querySelectorAll(".todo__checkbox")];

  completedTodo.forEach((todo) => todo.addEventListener("click", checkTodo));
}

// fitler
function filterTodos() {
  const todos = getAllTodos();
  switch (filterValue) {
    case "all":
      createTodos(todos);
      break;

    case "completed":
      const filterCompletedTodos = todos.filter((todo) => todo.isCompleted);
      createTodos(filterCompletedTodos);
      break;

    case "unCompleted":
      const fliterOnCompletedTodos = todos.filter((todo) => !todo.isCompleted);
      createTodos(fliterOnCompletedTodos);
      break;

    default:
      createTodos(todos);
      break;
  }
}

// delete
function deleteTodo(e) {
  let todos = getAllTodos();

  const todoSelectedId = Number(e.target.dataset.id);
  todos = todos.filter((todo) => todo.id !== todoSelectedId);
  saveAllTodos(todos);
  filterTodos();
}

// checkTodo
function checkTodo(e) {
  let todos = getAllTodos();

  const todoSelectedId = Number(e.target.dataset.id);
  const findeTodoSelected = todos.find((todo) => todo.id === todoSelectedId);
  findeTodoSelected.isCompleted = !findeTodoSelected.isCompleted;
  saveAllTodos(todos);
  filterTodos();
}

// localStorage
function getAllTodos() {
  const getTodos = JSON.parse(localStorage.getItem("todos")) || [];
  return getTodos;
}

function saveTodo(todo) {
  const todos = getAllTodos();
  todos.push(todo);
  const savedTodos = localStorage.setItem("todos", JSON.stringify(todos));
  return savedTodos;
}

function saveAllTodos(todos) {
  localStorage.setItem("todos", JSON.stringify(todos));
}

// sort
function sortTodos(e) {
  const sortBy = e.target.value;
  const todos = getAllTodos();
  console.log(todos);
  todos.sort((a, b) => {
    if (sortBy === "latest") {
      return b.createdAt - a.createdAt; // جدیدترها جلوتر
    }
    if (sortBy === "earliest") {
      return a.createdAt - b.createdAt; // قدیمی‌ترها جلوتر
    }
    return 0;
  });

  saveAllTodos(todos);
  createTodos(todos);
}
