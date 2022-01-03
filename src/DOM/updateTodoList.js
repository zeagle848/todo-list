import { newTodoItem } from "./CreateTodoItem.js";

export function updateTodoList(myTodo, project) {
  const todoItems = myTodo.getTodoList(project);
  const todoContainer = document.getElementById("todo-items-container");
  removeAllChildNodes(todoContainer);
  todoItems.forEach((todoItem) => {
    newTodoItem(
      todoItem.name,
      todoItem.description,
      todoItem.priority,
      todoItem.dueDate,
      todoItem.project,
      todoItem.isComplete,
      todoItem.id,
      myTodo
    );
  });
}

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}
