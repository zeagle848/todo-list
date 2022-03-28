export function clearTodoContainer() {
  const todoContainer = document.getElementById('todo-items-container');
  while (todoContainer.firstChild) {
    todoContainer.removeChild(todoContainer.firstChild);
  }
}

export function clearProjectItems() {
  const projectContainer = document.getElementById('side-bar-projects');
  while (projectContainer.firstChild) {
    projectContainer.removeChild(projectContainer.firstChild);
  }
}
