import { format, endOfDay } from "date-fns";
import { updateTodoList } from "./updateTodoList.js";
import { updateProjectList } from "./UpdateProjectList.js";
export function newTodoModal(myTodo) {
  const allProjects = myTodo.getProjectList();

  // CREATE ROOT ELEMENTS
  const rootElement = document.getElementById("root");
  const fragment = document.createDocumentFragment();

  const modalBackgroundNewTodo = document.createElement("div");
  modalBackgroundNewTodo.classList.add("modal-background");
  modalBackgroundNewTodo.setAttribute("id", "modal-background-new-todo");

  // CREATE MODAL ELEMENTS

  const modalContainer = document.createElement("div");
  modalContainer.classList.add("modal-container");

  const exitModal = document.createElement("p");
  exitModal.classList.add("close-modal");
  exitModal.setAttribute("id", "close-modal");
  exitModal.textContent = "X";

  modalContainer.append(exitModal);

  const todoItemNameInput = document.createElement("input");
  todoItemNameInput.setAttribute("type", "text");
  todoItemNameInput.setAttribute("placeholder", "Title of todo item:");
  todoItemNameInput.classList.add("todo-item-name-header");
  todoItemNameInput.classList.add("new-todo-item-name");
  todoItemNameInput.id = "new-todo-item-name";

  modalContainer.append(todoItemNameInput);

  const todoItemDescriptionInput = document.createElement("textarea");
  todoItemDescriptionInput.setAttribute("placeholder", "Details:");
  todoItemDescriptionInput.classList.add("todo-description");
  todoItemDescriptionInput.id = "todo-description";

  modalContainer.append(todoItemDescriptionInput);

  // CREATE DUE DATE ELEMENTS

  const dateInputContainer = document.createElement("div");
  dateInputContainer.classList.add("todo-modal-due-date");

  const dateInputHeader = document.createElement("h3");
  dateInputHeader.textContent = "Due Date:";

  dateInputContainer.append(dateInputHeader);

  const dateInput = document.createElement("input");
  dateInput.classList.add("todo-modal-due-date-input");
  dateInput.setAttribute("type", "date");
  dateInput.id = "todo-modal-due-date-input";
  dateInput.value = format(endOfDay(new Date()), "yyyy-MM-dd");

  dateInputContainer.append(dateInput);

  modalContainer.append(dateInputContainer);

  // CREATE MODAL FOOTER ELEMENTS

  const todoModalFooter = document.createElement("div");
  todoModalFooter.classList.add("todo-modal-footer");

  // CREATE PRIORITY ELEMENTS

  const priorityContainer = document.createElement("div");
  priorityContainer.classList.add("todo-modal-priority");

  const priorityHeader = document.createElement("h3");
  priorityHeader.classList.add("todo-modal-priority-header");
  priorityHeader.textContent = "Priority:";

  priorityContainer.append(priorityHeader);

  const lowPriorityLabel = document.createElement("label");
  lowPriorityLabel.setAttribute("for", "low-priority-radio");
  lowPriorityLabel.textContent = "Low";
  lowPriorityLabel.classList.add("low-priority-label");

  priorityContainer.append(lowPriorityLabel);

  const lowPriorityRadio = document.createElement("input");
  lowPriorityRadio.setAttribute("type", "radio");
  lowPriorityRadio.setAttribute("id", "low-priority-radio");
  lowPriorityRadio.setAttribute("value", "low");
  lowPriorityRadio.setAttribute("name", "todo-priority");
  lowPriorityRadio.classList.add("priority-radio");
  lowPriorityRadio.classList.add("low-priority-radio");

  priorityContainer.append(lowPriorityRadio);

  const mediumPriorityLabel = document.createElement("label");
  mediumPriorityLabel.setAttribute("for", "medium-priority-radio");
  mediumPriorityLabel.textContent = "Medium";
  mediumPriorityLabel.classList.add("medium-priority-label");

  priorityContainer.append(mediumPriorityLabel);

  const mediumPriorityRadio = document.createElement("input");
  mediumPriorityRadio.setAttribute("type", "radio");
  mediumPriorityRadio.setAttribute("id", "medium-priority-radio");
  mediumPriorityRadio.setAttribute("value", "meduim");
  mediumPriorityRadio.setAttribute("name", "todo-priority");
  mediumPriorityRadio.classList.add("priority-radio");
  mediumPriorityRadio.classList.add("medium-priority-radio");

  priorityContainer.append(mediumPriorityRadio);

  const highPriorityLabel = document.createElement("label");
  highPriorityLabel.setAttribute("for", "high-priority-radio");
  highPriorityLabel.textContent = "High";
  highPriorityLabel.classList.add("high-priority-label");

  priorityContainer.append(highPriorityLabel);

  const highPriorityRadio = document.createElement("input");
  highPriorityRadio.setAttribute("type", "radio");
  highPriorityRadio.setAttribute("id", "high-priority-radio");
  highPriorityRadio.setAttribute("value", "high");
  highPriorityRadio.setAttribute("name", "todo-priority");
  highPriorityRadio.classList.add("priority-radio");
  highPriorityRadio.classList.add("high-priority-radio");

  priorityContainer.append(highPriorityRadio);

  todoModalFooter.append(priorityContainer);

  // CREATE PROJECT SELECTION ELEMENTS

  const projectDropDownSection = document.createElement("div");
  projectDropDownSection.classList.add("project-edit-todo-modal");

  const projectHeader = document.createElement("h3");
  projectHeader.textContent = "Projects:";

  projectDropDownSection.append(projectHeader);

  const projectDropdownContainer = document.createElement("div");
  projectDropdownContainer.classList.add("project-dropdown");

  const dropdownButton = document.createElement("button");
  dropdownButton.classList.add("dropdown-button");

  dropdownButton.textContent = "Choose project...";

  projectDropdownContainer.append(dropdownButton);

  const dropdownContent = document.createElement("div");
  dropdownContent.classList.add("dropdown-content");

  // DYNAMICALLY POPULATE DROPDOWN MENU WITH SAVED PROJECTS
  allProjects.forEach((project, currentIndex) => {
    const dropDownElement = document.createElement("span");
    const projectName = project.projectName;
    dropDownElement.textContent = projectName;

    if (currentIndex === 0) {
      dropDownElement.classList.add("first-dropdown-element");
    }

    dropdownContent.append(dropDownElement);
  });

  // ADD EVENT LISTENER FOR SELECTING PROJECT
  dropdownContent.addEventListener("click", (e) => {
    const selectedProject = e.target.textContent;
    if (selectedProject !== "+ New Project") {
      dropdownButton.textContent = e.target.textContent;
    }
  });

  const dropDownNewProject = document.createElement("span");
  dropDownNewProject.textContent = "+ New Project";
  dropDownNewProject.classList.add("last-drop-down-element");

  dropdownContent.append(dropDownNewProject);
  //ADD EVENT LISTENER FOR ADDING NEW PROJECT
  dropDownNewProject.addEventListener("click", () => {
    const newProjectName = prompt("Project name");
    if (
      newProjectName === null ||
      newProjectName === "" ||
      newProjectName === " "
    ) {
    } else {
      myTodo.addProject(newProjectName, false);
      dropdownButton.textContent = newProjectName;
      dropDownNewProject.parentElement.removeChild(dropDownNewProject);
      const newDropDownElement = document.createElement("span");
      newDropDownElement.textContent = newProjectName;

      dropdownContent.append(newDropDownElement);

      dropdownContent.append(dropDownNewProject);
    }
  });

  projectDropdownContainer.append(dropdownContent);

  projectDropDownSection.append(projectDropdownContainer);

  todoModalFooter.append(projectDropDownSection);

  // CREATE SUBMIT ELEMENT

  const submitTodoButton = document.createElement("button");
  submitTodoButton.classList.add("submit-new-todo-modal");
  submitTodoButton.textContent = "Submit";

  todoModalFooter.append(submitTodoButton);

  modalContainer.append(todoModalFooter);

  // APPEND ELEMENTS TO ROOT ELEMENTS

  modalBackgroundNewTodo.append(modalContainer);
  fragment.append(modalBackgroundNewTodo);
  rootElement.append(fragment);

  // CLOSE MODAL FUNCTIONS

  exitModal.addEventListener("click", closeForm);

  modalBackgroundNewTodo.addEventListener("click", (event) => {
    if (event.target === modalBackgroundNewTodo) {
      closeForm();
    }
  });
  // SUBMIT BUTTON EVENT HANDLER
  submitTodoButton.addEventListener("click", () => {
    const todoName = todoItemNameInput.value.trim();
    const todoDescription = todoItemDescriptionInput.value.trim();
    const todoDueDate = dateInput.value;
    let todoPriority;
    const todoProject = dropdownButton.textContent;

    if (lowPriorityRadio.checked === true) {
      todoPriority = "low";
    }
    if (mediumPriorityRadio.checked === true) {
      todoPriority = "medium";
    }
    if (highPriorityRadio.checked === true) {
      todoPriority = "high";
    }

    if (todoName === "") {
      alert("Please name your todo item");
    }

    if (todoPriority === undefined) {
      alert("Please provide a priority for your todo item");
    }

    if (todoProject === "Choose project...") {
      alert("Please specify a project for your todo item");
    }

    if (
      todoName !== "" &&
      todoPriority !== undefined &&
      todoProject !== "Choose project..."
    ) {
      const todoID = generateID();
      myTodo.addTodoItem(
        todoName,
        todoDescription,
        todoPriority,
        todoDueDate,
        todoProject,
        todoID,
        false
      );
      updateTodoList(myTodo);
      updateProjectList(myTodo);
      closeForm();
    }
  });

  function closeForm() {
    modalBackgroundNewTodo.classList.remove("new-todo-item-background-visible");

    todoItemNameInput.value = "";
    todoItemDescriptionInput.value = "";
    dateInput.value = "";
    dropdownButton.textContent = "Choose project...";
  }
}

function generateID() {
  return Math.floor(Math.random() * 10000 + 1);
}
