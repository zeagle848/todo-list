export function getTodoItems({ state, selectedFilter }) {
  if (selectedFilter === 'all-projects') {
    return state.todoItems;
  }
  if (selectedFilter === 'today') {
    const today = new Date();
    const fullYear = today.getFullYear();
    const fullMonth = `0${today.getMonth() + 1}`.slice(-2);
    const fullDay = `0${today.getDate()}`.slice(-2);
    const currentDate = `${fullYear}-${fullMonth}-${fullDay}`;
    return state.todoItems.filter(
      (todoItem) => todoItem.dueDate === currentDate
    );
  }
  if (selectedFilter === 'week') {
    const currentDate = new Date();
    const week = [];

    for (let i = 1; i <= 7; i += 1) {
      const first = currentDate.getDate() - currentDate.getDay() + i;
      const day = new Date(currentDate.setDate(first))
        .toISOString()
        .slice(0, 10);

      week.push(day);
    }

    return state.todoItems.filter((todoItem) =>
      week.includes(todoItem.dueDate)
    );
  }
  return state.todoItems.filter(
    (todoItem) => todoItem.project === selectedFilter
  );
}

export function getProjectList({ state }) {
  return state.projects;
}

export function getProjectNumbers({ state, projectName }) {
  const numberOfProjects = state.todoItems.filter(
    (todoItem) => todoItem.project === projectName
  ).length;

  if (!numberOfProjects) {
    return 0;
  }
  return numberOfProjects;
}

export function getSpecificTodoItem({ state, todoItemID }) {
  return state.todoItems.find((todoItem) => todoItem.id == todoItemID); // Why does triple comparison (===) not work here?
}
