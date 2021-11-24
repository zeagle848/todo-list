import css from "./style.css";
import { todoDescriptionModal } from "./DOM/CreateTodoDescriptionModal";
import { newTodoModal } from "./DOM/CreateNewTodoModal.js";
import { editTodoModule } from "./DOM/CreateEditTodoModule.js";

// SHOW THE NEW TODO MODAL
newTodoModal();

// SHOW THE EDIT TODO MODAL
// const projectsArray = ["home", "work", "study", "garden"];

// editTodoModule(
//   "Clean the windows",
//   "Please clean the windows I'm begging you",
//   "high",
//   "2021-12-21",
//   "home",
//   projectsArray
// );

// SHOW THE TODO DETAILS MODAL
todoDescriptionModal(
  "Clean the windows",
  "Please for the love of god clean the windows",
  "high",
  "2021-12-21",
  "Home"
);

const addTodoItemButton = document.getElementById("add-todo-item-button");

addTodoItemButton.addEventListener("click", () => {
  const modalBackgroundNewTodo = document.getElementById(
    "modal-background-new-todo"
  );
  const body = document.getElementById("root");
  modalBackgroundNewTodo.classList.add("new-todo-item-background-visible");
  body.classList.add("body-no-scroll");
});
