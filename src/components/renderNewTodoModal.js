import { format, endOfDay } from 'date-fns';

function renderNewTodoModal({
  allProjects,
  addNewProjectFunction,
  submitNewTodoMethod,
}) {
  // CREATE ROOT ELEMENTS
  const rootElement = document.getElementById('root');
  const fragment = document.createDocumentFragment();

  const modalBackgroundNewTodo = document.createElement('div');
  modalBackgroundNewTodo.classList.add('modal-background');
  modalBackgroundNewTodo.setAttribute('id', 'modal-background-new-todo');

  // CREATE MODAL ELEMENTS

  const modalContainer = document.createElement('div');
  modalContainer.classList.add('modal-container');

  const exitModal = document.createElement('p');
  exitModal.classList.add('close-modal');
  exitModal.setAttribute('id', 'close-modal');
  exitModal.textContent = 'X';

  modalContainer.append(exitModal);

  const todoItemNameInput = document.createElement('input');
  todoItemNameInput.setAttribute('type', 'text');
  todoItemNameInput.setAttribute('placeholder', 'Title of todo item:');
  todoItemNameInput.classList.add('todo-item-name-header');
  todoItemNameInput.classList.add('new-todo-item-name');
  todoItemNameInput.id = 'new-todo-item-name';

  modalContainer.append(todoItemNameInput);

  const todoItemDescriptionInput = document.createElement('textarea');
  todoItemDescriptionInput.setAttribute('placeholder', 'Details:');
  todoItemDescriptionInput.classList.add('todo-description');
  todoItemDescriptionInput.id = 'todo-description';

  modalContainer.append(todoItemDescriptionInput);

  // CREATE DUE DATE ELEMENTS

  const dateInputContainer = document.createElement('div');
  dateInputContainer.classList.add('todo-modal-due-date');

  const dateInputHeader = document.createElement('h3');
  dateInputHeader.textContent = 'Due Date:';

  dateInputContainer.append(dateInputHeader);

  const dateInput = document.createElement('input');
  dateInput.classList.add('todo-modal-due-date-input');
  dateInput.setAttribute('type', 'date');
  dateInput.id = 'todo-modal-due-date-input';
  dateInput.value = format(endOfDay(new Date()), 'yyyy-MM-dd');

  dateInputContainer.append(dateInput);

  modalContainer.append(dateInputContainer);

  // CREATE MODAL FOOTER ELEMENTS

  const todoModalFooter = document.createElement('div');
  todoModalFooter.classList.add('todo-modal-footer');

  // CREATE PRIORITY ELEMENTS

  const priorityContainer = document.createElement('div');
  priorityContainer.classList.add('todo-modal-priority');

  const priorityHeader = document.createElement('h3');
  priorityHeader.classList.add('todo-modal-priority-header');
  priorityHeader.textContent = 'Priority:';

  priorityContainer.append(priorityHeader);

  const lowPriorityLabel = document.createElement('label');
  lowPriorityLabel.setAttribute('for', 'low-priority-radio');
  lowPriorityLabel.textContent = 'Low';
  lowPriorityLabel.classList.add('low-priority-label');

  priorityContainer.append(lowPriorityLabel);

  const lowPriorityRadio = document.createElement('input');
  lowPriorityRadio.setAttribute('type', 'radio');
  lowPriorityRadio.setAttribute('id', 'low-priority-radio');
  lowPriorityRadio.setAttribute('value', 'low');
  lowPriorityRadio.setAttribute('name', 'todo-priority');
  lowPriorityRadio.classList.add('priority-radio');
  lowPriorityRadio.classList.add('low-priority-radio');

  priorityContainer.append(lowPriorityRadio);

  const mediumPriorityLabel = document.createElement('label');
  mediumPriorityLabel.setAttribute('for', 'medium-priority-radio');
  mediumPriorityLabel.textContent = 'Medium';
  mediumPriorityLabel.classList.add('medium-priority-label');

  priorityContainer.append(mediumPriorityLabel);

  const mediumPriorityRadio = document.createElement('input');
  mediumPriorityRadio.setAttribute('type', 'radio');
  mediumPriorityRadio.setAttribute('id', 'medium-priority-radio');
  mediumPriorityRadio.setAttribute('value', 'meduim');
  mediumPriorityRadio.setAttribute('name', 'todo-priority');
  mediumPriorityRadio.classList.add('priority-radio');
  mediumPriorityRadio.classList.add('medium-priority-radio');

  priorityContainer.append(mediumPriorityRadio);

  const highPriorityLabel = document.createElement('label');
  highPriorityLabel.setAttribute('for', 'high-priority-radio');
  highPriorityLabel.textContent = 'High';
  highPriorityLabel.classList.add('high-priority-label');

  priorityContainer.append(highPriorityLabel);

  const highPriorityRadio = document.createElement('input');
  highPriorityRadio.setAttribute('type', 'radio');
  highPriorityRadio.setAttribute('id', 'high-priority-radio');
  highPriorityRadio.setAttribute('value', 'high');
  highPriorityRadio.setAttribute('name', 'todo-priority');
  highPriorityRadio.classList.add('priority-radio');
  highPriorityRadio.classList.add('high-priority-radio');

  priorityContainer.append(highPriorityRadio);

  todoModalFooter.append(priorityContainer);

  // CREATE PROJECT SELECTION ELEMENTS

  const projectDropDownSection = document.createElement('div');
  projectDropDownSection.classList.add('project-edit-todo-modal');

  const projectHeader = document.createElement('h3');
  projectHeader.textContent = 'Projects:';

  projectDropDownSection.append(projectHeader);

  const projectDropdownContainer = document.createElement('div');
  projectDropdownContainer.classList.add('project-dropdown');

  const dropdownButton = document.createElement('button');
  dropdownButton.classList.add('dropdown-button');

  dropdownButton.textContent = 'Choose project...';

  projectDropdownContainer.append(dropdownButton);

  const dropdownContent = document.createElement('div');
  dropdownContent.classList.add('dropdown-content');

  // POPULATE DROPDOWN MENU WITH SAVED PROJECTS
  allProjects.forEach((project, currentIndex) => {
    const dropDownElement = document.createElement('span');
    const { name } = project;
    dropDownElement.textContent = name;

    if (currentIndex === 0) {
      dropDownElement.classList.add('first-dropdown-element');
    }

    dropdownContent.append(dropDownElement);
  });

  // ADD EVENT LISTENER FOR SELECTING PROJECT
  dropdownContent.addEventListener('click', (e) => {
    const selectedProject = e.target.textContent;
    if (selectedProject !== '+ New Project') {
      dropdownButton.textContent = e.target.textContent;
    }
  });

  const dropDownNewProject = document.createElement('span');
  dropDownNewProject.textContent = '+ New Project';
  dropDownNewProject.classList.add('last-drop-down-element');

  dropdownContent.append(dropDownNewProject);

  dropDownNewProject.addEventListener('click', addNewProjectFunction);

  projectDropdownContainer.append(dropdownContent);

  projectDropDownSection.append(projectDropdownContainer);

  todoModalFooter.append(projectDropDownSection);

  // CREATE SUBMIT ELEMENT

  const submitTodoButton = document.createElement('button');
  submitTodoButton.classList.add('submit-new-todo-modal');
  submitTodoButton.textContent = 'Submit';

  todoModalFooter.append(submitTodoButton);

  modalContainer.append(todoModalFooter);

  // APPEND ELEMENTS TO ROOT ELEMENTS

  modalBackgroundNewTodo.append(modalContainer);
  fragment.append(modalBackgroundNewTodo);
  rootElement.append(fragment);

  // CLOSE MODAL FUNCTIONS

  function removeAllChildNodes(parent) {
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }
  }

  function exitModalFunction() {
    removeAllChildNodes(modalBackgroundNewTodo);
    modalBackgroundNewTodo.remove();
  }

  modalBackgroundNewTodo.addEventListener('click', (event) => {
    if (event.target === modalBackgroundNewTodo) {
      exitModalFunction();
    }
  });
  exitModal.addEventListener('click', exitModalFunction);

  // SUBMIT BUTTON EVENT HANDLER
  submitTodoButton.addEventListener('click', () => {
    const canClose = submitNewTodoMethod();
    if (canClose) {
      exitModalFunction();
    }
  });
}

export default renderNewTodoModal;
