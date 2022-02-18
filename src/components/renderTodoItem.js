function renderTodoItem({
  todoItem,
  toggleIsCompleteFunction,
  descriptionButtonFunction,
  editButtonFunction,
  removeTodoItemFunction,
}) {
  // CREATE ROOT ELEMENTS
  const contentContainer = document.getElementById('todo-items-container');
  const fragment = document.createDocumentFragment();

  // CREATE TODO ITEM ELEMENTS
  const todoItemContent = document.createElement('div');
  todoItemContent.classList.add('todo-item');
  todoItemContent.setAttribute('data-todo-id', `${todoItem.id}`);

  switch (todoItem.priority) {
    case 'low':
      todoItemContent.classList.add('todo-item-low-priority');
      break;
    case 'medium':
      todoItemContent.classList.add('todo-item-medium-priority');
      break;
    case 'high':
      todoItemContent.classList.add('todo-item-high-priority');
      break;
    default:
      break;
  }

  // CREATE TODO ITEM BEGINNING
  const todoItemBeginning = document.createElement('div');
  todoItemBeginning.classList.add('todo-beginning');

  const completedCheckbox = document.createElement('input');
  completedCheckbox.classList.add('completed-task-checkbox');
  completedCheckbox.setAttribute('type', 'checkbox');

  todoItemBeginning.append(completedCheckbox);

  const todoItemName = document.createElement('span');
  todoItemName.textContent = todoItem.name;

  if (todoItem.isComplete) {
    todoItemName.classList.add('task-complete');
    completedCheckbox.checked = todoItem.isComplete;
  }

  todoItemBeginning.append(todoItemName);

  todoItemContent.append(todoItemBeginning);

  // ADD EVENT LISTENER FOR COMPLETE CHECKBOX ON CLICK
  completedCheckbox.addEventListener('click', toggleIsCompleteFunction);

  // CREATE TODO ITEM END
  const todoItemEnd = document.createElement('div');
  todoItemEnd.classList.add('todo-end');
  // CREATE TODO ITEM DUE DATES
  const todoDueDate = document.createElement('span');
  todoDueDate.classList.add('todo-date');
  todoDueDate.textContent = todoItem.dueDate;

  todoItemEnd.append(todoDueDate);

  // CREATE TODO ITEM DETAILS BUTTON
  const detailsButton = document.createElement('button');
  detailsButton.classList.add('todo-details-button');
  detailsButton.textContent = 'Details';

  detailsButton.addEventListener('click', descriptionButtonFunction);

  todoItemEnd.append(detailsButton);

  const editButton = document.createElement('i');
  editButton.classList.add('far');
  editButton.classList.add('fa-edit');
  editButton.classList.add('edit-todo-button');
  editButton.setAttribute('data-todo-id', `${todoItem.id}`);

  editButton.addEventListener('click', editButtonFunction);

  todoItemEnd.append(editButton);

  // CREATE REMOVE TODO ITEM BUTTON
  const removeTodoItem = document.createElement('div');
  removeTodoItem.classList.add('remove-todo-item');
  removeTodoItem.textContent = 'X';

  removeTodoItem.addEventListener('click', removeTodoItemFunction);

  todoItemEnd.append(removeTodoItem);

  todoItemContent.append(todoItemEnd);

  // APPEND TO ROOT ELEMENTS
  fragment.append(todoItemContent);
  contentContainer.append(fragment);
}

export default renderTodoItem;
