// todo list
const todos = [];

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

//* add todo

// select element
todoAddForm.addEventListener("submit", addNewTodo);
// add function
function addNewTodo(e) {
  e.preventDefault();
  if (todoAddInput.value === "") return null;

  console.log(todoAddInput.value);
  const newTodo = {
    id: Date.now(),
    title: todoAddInput.value,
    createdAt: new Date().toLocaleDateString("fa-IR"),
    isCompleted: false,
  };
  console.log(todoAddInput.value);
  todos.push(newTodo);
  console.log(todos);

  let result = "";
  todos.forEach((todo) => {
    result += `<li class="todo__item">
          <label class="todo__label">
            <input type="checkbox" class="todo__checkbox" />
            <span class="todo__text">${todo.title}</span>
            <span class="todo__text">${todo.createdAt}</span>
          </label>
          <button class="todo__delete">
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
}
