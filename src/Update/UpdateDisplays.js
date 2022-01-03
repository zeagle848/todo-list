export function updateDisplays(myTodo) {
  document.querySelector("#home-num-todo-items").textContent =
    myTodo.getTodoList("all-projects").length;

  document.querySelector("#today-num-todo-items").textContent =
    myTodo.getTodoList("today").length;

  document.querySelector("#week-num-todo-items").textContent =
    myTodo.getTodoList("week").length;
}
