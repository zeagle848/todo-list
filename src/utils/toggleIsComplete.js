import { toggleIsCompleteTodoItem } from '../state/storage';

export function toggleIsComplete(event) {
  const isComplete = event.target.checked;
  const todoID =
    event.target.parentNode.parentNode.getAttribute('data-todo-id');
  toggleIsCompleteTodoItem(todoID);
  const todoItemElement = document.querySelector(`[data-todo-id='${todoID}']`);
  const todoItemNameElement = todoItemElement.firstChild.firstChild.nextSibling;

  if (isComplete) {
    // todoItemCheckbox.checked = currentTodoItem.isComplete;
    todoItemNameElement.classList.add('task-complete');
  } else {
    todoItemNameElement.classList.remove('task-complete');
  }
}
