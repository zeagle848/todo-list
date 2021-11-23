export function newTodoModal() {
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
  todoItemNameInput.classList.add("new-todo-item-name");

  modalContainer.append(todoItemNameInput);

  const todoItemDescriptionInput = document.createElement("textarea");
  todoItemDescriptionInput.setAttribute("placeholder", "Details:");
  todoItemDescriptionInput.classList.add("todo-description");

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

  priorityContainer.append(mediumPriorityButton);

  todoModalFooter.append(priorityContainer);

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

  exitModal.addEventListener("click", () => {
    modalBackgroundNewTodo.classList.remove("new-todo-item-background-visible");

    todoItemNameInput.value = "";
    todoItemDescriptionInput.value = "";
    dateInput.value = "";
  });

  modalBackgroundNewTodo.addEventListener("click", (event) => {
    if (event.target === modalBackgroundNewTodo) {
      modalBackgroundNewTodo.classList.remove(
        "new-todo-item-background-visible"
      );

      todoItemNameInput.value = "";
      todoItemDescriptionInput.value = "";
      dateInput.value = "";
    }
  });
}
