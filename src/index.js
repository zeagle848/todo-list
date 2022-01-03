import css from "./style.css";
import { newTodoModal } from "./DOM/CreateNewTodoModal.js";
import { updateTodoList } from "./DOM/UpdateTodoList";
import { Todo } from "./stores/todo.js";
import { populateProjectList } from "./DOM/PopulateProjectList";
import { updateProjectList } from "./DOM/UpdateProjectList";
import { updateDisplays } from "./Update/UpdateDisplays";
const myTodo = new Todo();

const addTodoItemButton = document.getElementById("add-todo-item-button");
const populateAppButton = document.getElementById("populate-app");
const homeButton = document.getElementById("home-container");
const todayButton = document.getElementById("today-container");
const weekButton = document.getElementById("week-container");

const numHomeTodoItems = document.getElementById("home-num-todo-items");
numHomeTodoItems.textContent = myTodo.getTodoList("all-projects").length;

weekButton.addEventListener("click", () => {
  const lastActiveProject = document.querySelector(".project-item-selected");
  if (lastActiveProject !== null) {
    lastActiveProject.classList.remove("project-item-selected");
  }
  updateTodoList(myTodo, "week");
  weekButton.classList.add("project-item-selected");
});

todayButton.addEventListener("click", () => {
  const lastActiveProject = document.querySelector(".project-item-selected");
  if (lastActiveProject !== null) {
    lastActiveProject.classList.remove("project-item-selected");
  }
  updateTodoList(myTodo, "today");
  todayButton.classList.add("project-item-selected");
});

homeButton.addEventListener("click", () => {
  const lastActiveProject = document.querySelector(".project-item-selected");
  if (lastActiveProject !== null) {
    lastActiveProject.classList.remove("project-item-selected");
  }
  updateTodoList(myTodo, "all-projects");
  homeButton.classList.add("project-item-selected");
});

addTodoItemButton.addEventListener("click", () => {
  const modalBackgroundNewTodo = document.getElementById(
    "modal-background-new-todo"
  );
  const body = document.getElementById("root");
  modalBackgroundNewTodo.classList.add("new-todo-item-background-visible");
  body.classList.add("body-no-scroll");
});

populateAppButton.addEventListener("click", () => {
  if (myTodo.getTodoList("all-projects").length === 0) {
    myTodo.addProject("Garden", false);
    myTodo.addProject("Work", false);
    myTodo.addProject("Play", false);

    myTodo.addTodoItem(
      "Mow the lawn",
      "Can be done with the new lawnmower",
      "low",
      "2022-01-03",
      "Garden",
      generateID(),
      false
    );
    myTodo.addTodoItem(
      "Plant the roses",
      "Only plant on the stoep",
      "medium",
      "2022-01-03",
      "Garden",
      generateID(),
      false
    );
    myTodo.addTodoItem(
      "Cut down the tree",
      "Call 072 987 2628",
      "high",
      "2022-01-03",
      "Garden",
      generateID(),
      false
    );

    myTodo.addTodoItem(
      "Call Mike",
      "Call to organize meeting with Jill",
      "high",
      "2022-10-21",
      "Work",
      generateID(),
      false
    );
    myTodo.addTodoItem(
      "Do taxes",
      "From January to February",
      "medium",
      "2022-10-20",
      "Work",
      generateID(),
      false
    );
    myTodo.addTodoItem(
      "Buy more paperclips",
      "James needs paperclips too",
      "low",
      "2022-10-20",
      "Work",
      generateID(),
      false
    );

    myTodo.addTodoItem(
      "Beat Little Ricky",
      "Need to level up to level 67 in borderlands to do this",
      "low",
      "2022-10-11",
      "Play",
      generateID(),
      false
    );
    myTodo.addTodoItem(
      "Look into Invoker",
      "Have to learn more heroes",
      "medium",
      "2022-10-16",
      "Play",
      generateID(),
      false
    );
    myTodo.addTodoItem(
      "Buy Death Trash",
      "Have to support the developers",
      "high",
      "2022-10-14",
      "Play",
      generateID(),
      false
    );
    updateDisplays(myTodo);
  } else {
    alert("Can only populate when there are no todo items present");
  }

  updateTodoList(myTodo, "all-projects");
  updateProjectList(myTodo);
});

// SHOW THE NEW TODO MODAL

newTodoModal(myTodo);
updateTodoList(myTodo, "all-projects");
populateProjectList(myTodo);
updateDisplays(myTodo);

function generateID() {
  return Math.floor(Math.random() * 10000 + 1);
}
