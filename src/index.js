import css from "./style.css";
import { newTodoModal } from "./DOM/CreateNewTodoModal.js";
import { updateTodoList } from "./DOM/updateTodoList";
import { Todo } from "./stores/todo.js";
import { populateProjectList } from "./DOM/populateProjectList";
const myTodo = new Todo();

const addTodoItemButton = document.getElementById("add-todo-item-button");

addTodoItemButton.addEventListener("click", () => {
  const modalBackgroundNewTodo = document.getElementById(
    "modal-background-new-todo"
  );
  const body = document.getElementById("root");
  modalBackgroundNewTodo.classList.add("new-todo-item-background-visible");
  body.classList.add("body-no-scroll");
});

// SHOW THE NEW TODO MODAL
newTodoModal(myTodo);
updateTodoList(myTodo);
populateProjectList(myTodo);
