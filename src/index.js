import css from "./style.css";
import { todoDescriptionModal } from "./DOM/CreateTodoDescriptionModal";
import { newTodoModal } from "./DOM/CreateNewTodoModal.js";
newTodoModal();

const addTodoItemButton = document.getElementById("add-todo-item-button");

addTodoItemButton.addEventListener("click", () => {
  const modalBackgroundNewTodo = document.getElementById(
    "modal-background-new-todo"
  );
  const body = document.getElementById("root");
  modalBackgroundNewTodo.classList.add("new-todo-item-background-visible");
  body.classList.add("body-no-scroll");
});
