function renderDescriptionModal(todoItem) {
  // CREATE ROOT ELEMENTS
  const rootElement = document.getElementById('root');
  const fragment = document.createDocumentFragment();

  const modalBackgroundTodoDescription = document.createElement('div');
  modalBackgroundTodoDescription.classList.add('modal-background');
  modalBackgroundTodoDescription.classList.add(
    'todo-description-background-visible'
  );
  modalBackgroundTodoDescription.setAttribute(
    'id',
    'modal-background-todo-description'
  );

  // CREATE MODAL ELEMENTS

  const modalContainerTodoDescription = document.createElement('div');
  modalContainerTodoDescription.classList.add('modal-container');
  modalContainerTodoDescription.classList.add('todo-description-modal');

  const exitModal = document.createElement('p');
  exitModal.classList.add('close-modal');
  exitModal.setAttribute('id', 'close-modal');
  exitModal.textContent = 'X';

  modalContainerTodoDescription.append(exitModal);

  const todoItemName = document.createElement('h1');
  todoItemName.classList.add('todo-description-main-header');
  todoItemName.textContent = todoItem.name;

  modalContainerTodoDescription.append(todoItemName);

  // CREATE DESCRIPTION ELEMENTS

  const descriptionContainer = document.createElement('div');
  descriptionContainer.classList.add('todo-description-description-section');

  const descriptionHeader = document.createElement('h2');
  descriptionHeader.classList.add('todo-description-header');
  descriptionHeader.textContent = 'Description:';

  descriptionContainer.append(descriptionHeader);

  const descriptionParagraph = document.createElement('p');
  descriptionParagraph.classList.add('todo-description-paragraph');
  descriptionParagraph.textContent = todoItem.description;

  descriptionContainer.append(descriptionParagraph);

  modalContainerTodoDescription.append(descriptionContainer);

  // PRIORITY ELEMENTS
  const priorityContainer = document.createElement('div');
  priorityContainer.classList.add('todo-description-section-container');

  const priorityHeader = document.createElement('h2');
  priorityHeader.classList.add('todo-description-header');
  priorityHeader.textContent = 'Priority:';

  priorityContainer.append(priorityHeader);

  const prioritySpan = document.createElement('span');
  prioritySpan.classList.add('todo-description-span');

  switch (todoItem.priority) {
    case 'low':
      prioritySpan.classList.add('low-priority');
      prioritySpan.textContent = 'Low';
      break;
    case 'medium':
      prioritySpan.classList.add('medium-priority');
      prioritySpan.textContent = 'Medium';
      break;
    case 'high':
      prioritySpan.classList.add('high-priority');
      prioritySpan.textContent = 'High';
      break;
    default:
      prioritySpan.classList.add('high-priority');
      prioritySpan.textContent = 'NO PRIORITY ERROR';
      break;
  }

  priorityContainer.append(prioritySpan);

  modalContainerTodoDescription.append(priorityContainer);

  // DUE DATE ELEMENTS

  const dueDateContainer = document.createElement('div');
  dueDateContainer.classList.add('todo-description-section-container');

  const dueDateHeader = document.createElement('h2');
  dueDateHeader.classList.add('todo-description-header');
  dueDateHeader.textContent = 'Due Date:';

  dueDateContainer.append(dueDateHeader);

  const dueDateSpan = document.createElement('span');
  dueDateSpan.classList.add('todo-description-span');
  dueDateSpan.textContent = todoItem.dueDate;

  dueDateContainer.append(dueDateSpan);

  modalContainerTodoDescription.append(dueDateContainer);

  // PROJECT ELEMENTS

  const projectContainer = document.createElement('div');
  projectContainer.classList.add('todo-description-section-container');

  const projectHeader = document.createElement('h2');
  projectHeader.classList.add('todo-description-header');
  projectHeader.textContent = 'Project:';

  projectContainer.append(projectHeader);

  const projectSpan = document.createElement('span');
  projectSpan.classList.add('todo-description-span');
  projectSpan.textContent = todoItem.project;

  projectContainer.append(projectSpan);

  modalContainerTodoDescription.append(projectContainer);

  // APPEND ELEMENTS TO ROOT ELEMENTS

  modalBackgroundTodoDescription.append(modalContainerTodoDescription);
  fragment.append(modalBackgroundTodoDescription);
  rootElement.append(fragment);

  // CLOSE MODAL FUNCTIONS

  function removeAllChildNodes(parent) {
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }
  }

  function exitModalFunction() {
    removeAllChildNodes(modalBackgroundTodoDescription);
    modalBackgroundTodoDescription.remove();
  }

  modalBackgroundTodoDescription.addEventListener('click', (event) => {
    if (event.target === modalBackgroundTodoDescription) {
      exitModalFunction();
    }
  });
  exitModal.addEventListener('click', exitModalFunction);
}

export default renderDescriptionModal;
