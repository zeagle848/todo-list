import Project from './Project';
import TodoItem from './TodoItem';
import { getDefaultState } from './debug';
import { getStateFromStorage, setStateToStorage } from '../services/storage';

let state = {
  todoItems: [],
  projects: [],
};

function sortByDate({ dueDate: a }, { dueDate: b }) {
  return new Date(a) - new Date(b);
}

function setInitialStateFromStorage() {
  const storedState = getStateFromStorage();
  if (
    storedState &&
    storedState.todoItems.length !== 0 &&
    storedState.projects.length !== 0
  ) {
    state = storedState;
  } else {
    populateAppWithData();
    state.todoItems = state.todoItems.sort(sortByDate);
    setStateToStorage(state);
  }
}

export function populateAppWithData() {
  state = getDefaultState();
}

export function addProject({ name }) {
  state = {
    ...state,
    projects: [...state.projects, Project({ name })],
  };

  setStateToStorage(state);
  return state;
}

export function addTodoItem({
  name,
  description,
  priority,
  dueDate,
  project,
  isComplete,
  id = null,
}) {
  state = {
    ...state,
    todoItems: [
      ...state.todoItems,
      TodoItem({
        name,
        description,
        priority,
        dueDate,
        project,
        isComplete,
        id,
      }),
    ].sort(sortByDate),
  };

  setStateToStorage(state);
  return state;
}

export function toggleIsCompleteTodoItem(todoItemId) {
  state = {
    ...state,
    todoItems: state.todoItems.map((todoItem) => {
      if (todoItem.id === todoItemId) {
        return {
          ...todoItem,
          isComplete: !todoItem.isComplete,
        };
      }
      return todoItem;
    }),
  };
  setStateToStorage(state);
}

export function editTodoItem({
  todoItemId,
  newDescription,
  newPriority,
  newDueDate,
  newProject,
}) {
  state = {
    ...state,
    todoItems: state.todoItems
      .map((todoItem) => {
        if (todoItem.id !== todoItemId) {
          return todoItem;
        }

        return {
          ...todoItem,
          id: todoItemId,
          description: newDescription,
          priority: newPriority,
          dueDate: newDueDate,
          project: newProject,
        };
      })
      .sort(sortByDate),
  };
  setStateToStorage(state);
  return state; // Why do I need to return state here when I'm already setting state to be equal to the new state
}

export function deleteTodoItem({ todoItemIdToDelete }) {
  state = {
    ...state,
    todoItems: state.todoItems
      .filter((todoItem) => todoItem.id !== todoItemIdToDelete)
      .sort(sortByDate),
  };

  setStateToStorage(state);
  return state;
}

export function deleteProject({ projectToDelete }) {
  state = {
    projects: state.projects.filter(
      (project) => project.name !== projectToDelete
    ),
    todoItems: state.todoItems
      .filter((todoItem) => todoItem.project !== projectToDelete)
      .sort(sortByDate),
  };

  setStateToStorage(state);
  return state;
}

export function getState() {
  return state;
}

export function getProjectList() {
  return state.projects;
}

export function getTodoItems({ selectedFilter }) {
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

export function getProjectNumbers({ projectName }) {
  const numberOfProjects = state.todoItems.filter(
    (todoItem) => todoItem.project === projectName
  ).length;

  if (!numberOfProjects) {
    return 0;
  }
  return numberOfProjects;
}

export function getTodoItem({ todoItemId }) {
  return state.todoItems.find((todoItem) => todoItem.id === todoItemId);
}

export function deleteAllItems() {
  state = {
    todoItems: [],
    projects: [],
  };

  return state;
  setStateToStorage(state);
}

setInitialStateFromStorage();
