export function editTodoModule(
  name,
  description,
  priority,
  date,
  selectedProject,
  allProjects
) {
  const capitalizedProjectName =
    selectedProject.charAt(0).toUpperCase() + selectedProject.slice(1);
  // CREATE ROOT ELEMENTS
  const rootElement = document.getElementById("root");
  const fragment = document.createDocumentFragment();

  const modalBackgroundEditTodo = document.createElement("div");
  modalBackgroundEditTodo.classList.add("modal-background");
  modalBackgroundEditTodo.classList.add("edit-todo-background-visible");

  // CREATE MODAL ELEMENTS

  const modalContainer = document.createElement("div");
  modalContainer.classList.add("modal-container");

  const exitModal = document.createElement("p");
  exitModal.classList.add("close-modal");
  exitModal.setAttribute("id", "close-modal");
  exitModal.textContent = "X";

  modalContainer.append(exitModal);

  // CREATE NAME AND DESCRIPTION ELEMENTS

  const todoName = document.createElement("h2");
  todoName.classList.add("todo-item-name-header");
  todoName.textContent = name;

  modalContainer.append(todoName);

  const todoDetails = document.createElement("textarea");
  todoDetails.classList.add("todo-description");
  todoDetails.textContent = description;

  modalContainer.append(todoDetails);

  // CREATE DUE DATE ELEMENTS

  const dateContainer = document.createElement("div");
  dateContainer.classList.add("todo-modal-due-date");

  const dateHeader = document.createElement("h3");
  dateHeader.textContent = "Due Date:";

  dateContainer.append(dateHeader);

  const dateContent = document.createElement("input");
  dateContent.classList.add("todo-modal-due-date-input");
  dateContent.setAttribute("type", "date");
  dateContent.value = date;

  dateContainer.append(dateContent);

  modalContainer.append(dateContainer);

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

  const lowPriorityButton = document.createElement("button");
  lowPriorityButton.classList.add("todo-modal-priority-button");
  lowPriorityButton.classList.add("low-priority-button");
  lowPriorityButton.textContent = "Low";

  priorityContainer.append(lowPriorityButton);

  const mediumPriorityButton = document.createElement("button");
  mediumPriorityButton.classList.add("todo-modal-priority-button");
  mediumPriorityButton.classList.add("medium-priority-button");
  mediumPriorityButton.textContent = "Medium";

  priorityContainer.append(mediumPriorityButton);

  const highPriorityButton = document.createElement("button");
  highPriorityButton.classList.add("todo-modal-priority-button");
  highPriorityButton.classList.add("high-priority-button");
  highPriorityButton.textContent = "High";

  priorityContainer.append(highPriorityButton);

  switch (priority) {
    case "low":
      lowPriorityButton.focus();
      break;
    case "medium":
      mediumPriorityButton.focus();
      break;
    case "high":
      highPriorityButton.focus();
      break;
    default:
      alert("NO PRIORITY BUTTON GIVEN ERROR");
      break;
  }

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

  dropdownButton.textContent = capitalizedProjectName;

  projectDropdownContainer.append(dropdownButton);

  const dropdownContent = document.createElement("div");
  dropdownContent.classList.add("dropdown-content");

  allProjects.forEach((project, currentIndex) => {
    const dropDownElement = document.createElement("span");
    const projectName = project;
    const projectNameFirstCharCapitalize =
      projectName.charAt(0).toUpperCase() + projectName.slice(1);
    dropDownElement.textContent = projectNameFirstCharCapitalize;

    if (currentIndex === 0) {
      dropDownElement.classList.add("first-dropdown-element");
    }

    if (currentIndex === allProjects.length - 1) {
      dropDownElement.classList.add("last-drop-down-element");
    }

    dropdownContent.append(dropDownElement);
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

  modalBackgroundEditTodo.append(modalContainer);
  fragment.append(modalBackgroundEditTodo);
  rootElement.append(fragment);

  // CLOSE MODAL FUNCTIONS

  exitModal.addEventListener("click", () => {
    modalBackgroundEditTodo.classList.remove("edit-todo-background-visible");

    todoDetails.value = description;
    dateContent.value = date;
    dropdownButton.textContent = capitalizedProjectName;

    switch (priority) {
      case "low":
        lowPriorityButton.focus();
        break;
      case "medium":
        mediumPriorityButton.focus();
        break;
      case "high":
        highPriorityButton.focus();
        break;
      default:
        alert("NO PRIORITY BUTTON GIVEN ERROR");
        break;
    }
  });

  modalBackgroundEditTodo.addEventListener("click", (event) => {
    if (event.target === modalBackgroundEditTodo) {
      modalBackgroundEditTodo.classList.remove("edit-todo-background-visible");
      todoDetails.value = description;
      dateContent.value = date;
      dropdownButton.textContent = capitalizedProjectName;

      switch (priority) {
        case "low":
          lowPriorityButton.focus();
          break;
        case "medium":
          mediumPriorityButton.focus();
          break;
        case "high":
          highPriorityButton.focus();
          break;
        default:
          alert("NO PRIORITY BUTTON GIVEN ERROR");
          break;
      }
    }
  });
}
