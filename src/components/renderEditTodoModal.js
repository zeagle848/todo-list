import { MODAL_EDIT_ID } from '../constants';

function getPriority() {
  const highPriorityRadio = document.querySelector('.high-priority-radio');
  const mediumPriorityRadio = document.querySelector('.medium-priority-radio');

  if (highPriorityRadio.checked) {
    return 'high';
  }

  return mediumPriorityRadio.checked ? 'medium' : 'low';
}

function renderEditTodoModal({
  todoItem,
  onEditModalSubmit,
  allProjects,
  addNewProjectFunction,
  onEditModalClose,
}) {
  const rootElement = document.getElementById('root');
  const fragment = document.createDocumentFragment();

  const modalBackgroundEditTodo = document.createElement('div');
  modalBackgroundEditTodo.classList.add('modal-background');
  modalBackgroundEditTodo.classList.add('edit-todo-background-visible');
  modalBackgroundEditTodo.setAttribute('id', MODAL_EDIT_ID);

  // CREATE MODAL ELEMENTS

  const modalContainer = document.createElement('div');
  modalContainer.classList.add('modal-container');

  const exitModal = document.createElement('p');
  exitModal.classList.add('close-modal');
  exitModal.setAttribute('id', 'close-modal');
  exitModal.textContent = 'X';

  modalContainer.append(exitModal);

  // CREATE NAME AND DESCRIPTION ELEMENTS

  const todoName = document.createElement('h2');
  todoName.classList.add('todo-item-name-header');
  todoName.textContent = todoItem.name;

  modalContainer.append(todoName);

  const todoDescription = document.createElement('textarea');
  todoDescription.classList.add('todo-description');
  todoDescription.textContent = todoItem.description;

  modalContainer.append(todoDescription);

  // CREATE DUE DATE ELEMENTS

  const dateContainer = document.createElement('div');
  dateContainer.classList.add('todo-modal-due-date');

  const dateHeader = document.createElement('h3');
  dateHeader.textContent = 'Due Date:';

  dateContainer.append(dateHeader);

  const dateContent = document.createElement('input');
  dateContent.classList.add('todo-modal-due-date-input');
  dateContent.setAttribute('type', 'date');
  dateContent.value = todoItem.dueDate;

  dateContainer.append(dateContent);

  modalContainer.append(dateContainer);

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

  switch (todoItem.priority) {
    case 'low':
      lowPriorityRadio.checked = true;
      break;
    case 'medium':
      mediumPriorityRadio.checked = true;
      break;
    case 'high':
      highPriorityRadio.checked = true;
      break;
    default:
      alert('NO PRIORITY BUTTON GIVEN ERROR');
      break;
  }

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

  dropdownButton.textContent = todoItem.project;

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
  submitTodoButton.setAttribute('data-todo-id', `${todoItem.id}`);
  submitTodoButton.textContent = 'Submit';

  todoModalFooter.append(submitTodoButton);

  modalContainer.append(todoModalFooter);

  // APPEND ELEMENTS TO ROOT ELEMENTS

  modalBackgroundEditTodo.append(modalContainer);
  fragment.append(modalBackgroundEditTodo);
  rootElement.append(fragment);

  // CLOSE MODAL FUNCTIONS

  modalBackgroundEditTodo.addEventListener('click', (event) => {
    if (event.target === modalBackgroundEditTodo) {
      onEditModalClose();
    }
  });
  exitModal.addEventListener('click', onEditModalClose);
  submitTodoButton.addEventListener('click', () => {
    const description = modalContainer
      .querySelector('.todo-description')
      .value.trim();
    const priority = getPriority();
    const dueDate = modalContainer.querySelector(
      '.todo-modal-due-date-input'
    ).value;
    const project =
      modalContainer.querySelector('.dropdown-button').textContent;

    onEditModalSubmit({
      todoId: todoItem.id,
      description,
      priority,
      dueDate,
      project,
    });
    onEditModalClose();
  });
}

export default renderEditTodoModal;
