function updateDisplays({ state, getProjectNumbers, getTodoItems }) {
  const projectTodoCountElements = document.querySelectorAll(
    '.number-of-todo-items'
  );
  projectTodoCountElements.forEach((element) => {
    const project = element.getAttribute('data-todo-items-associated');
    element.textContent = getProjectNumbers({ state, projectName: project });
  });

  const homeNums = document.getElementById('home-num-todo-items');
  const todayNums = document.getElementById('today-num-todo-items');
  const weekNums = document.getElementById('week-num-todo-items');

  homeNums.textContent = getTodoItems({
    state,
    selectedFilter: 'all-projects',
  }).length;

  todayNums.textContent = getTodoItems({
    state,
    selectedFilter: 'today',
  }).length;

  weekNums.textContent = getTodoItems({
    state,
    selectedFilter: 'week',
  }).length;
}

export default updateDisplays;
