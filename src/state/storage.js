let state = {
  todoItems: [],
  projects: [],
};

function todoItem({
  name,
  description,
  priority,
  dueDate,
  project,
  id,
  isComplete,
}) {
  return { name, description, priority, dueDate, project, id, isComplete };
}

function projectItem({ name }) {
  return { name };
}

function generateID() {
  return Math.floor(Math.random() * 10000 + 1).toString();
}

function setStateToStorage({ newState }) {
  sessionStorage.setItem('my_saved_state', JSON.stringify(newState));
}

function sortTodoList() {
  state = {
    ...state,
    todoItems: state.todoItems.sort((a, b) => {
      const dateA = new Date(a.dueDate);
      const dateB = new Date(b.dueDate);
      return dateA - dateB;
    }),
  };
}

function setDefaultState() {
  const todoItems = [];
  const projects = [];

  const today = new Date();
  const fullYear = today.getFullYear();
  const fullMonth = `0${today.getMonth() + 1}`.slice(-2);
  const fullDay = `0${today.getDate()}`.slice(-2);
  const currentDate = `${fullYear}-${fullMonth}-${fullDay}`;

  projects.push(projectItem({ name: 'Garden' }));
  projects.push(projectItem({ name: 'Work' }));
  projects.push(projectItem({ name: 'Play' }));

  todoItems.push(
    todoItem({
      name: 'Mow the lawn',
      description: 'Can be done with the new lawnmower',
      priority: 'low',
      dueDate: currentDate,
      project: 'Garden',
      id: generateID(),
      isComplete: false,
    })
  );

  todoItems.push(
    todoItem({
      name: 'Plant the roses',
      description: 'Only plant on the stoep',
      priority: 'medium',
      dueDate: '2022-01-03',
      project: 'Garden',
      id: generateID(),
      isComplete: false,
    })
  );

  todoItems.push(
    todoItem({
      name: 'Cut down the tree',
      description: 'Call 072 987 2628',
      priority: 'high',
      dueDate: '2022-01-09',
      project: 'Garden',
      id: generateID(),
      isComplete: false,
    })
  );

  todoItems.push(
    todoItem({
      name: 'Call Mike',
      description: 'Call to organize meeting with Jill',
      priority: 'high',
      dueDate: '2022-10-21',
      project: 'Work',
      id: generateID(),
      isComplete: false,
    })
  );

  todoItems.push(
    todoItem({
      name: 'Do taxes',
      description: 'From January to February',
      priority: 'medium',
      dueDate: currentDate,
      project: 'Work',
      id: generateID(),
      isComplete: false,
    })
  );

  todoItems.push(
    todoItem({
      name: 'Buy more paperclips',
      description: 'James needs paperclips too',
      priority: 'low',
      dueDate: '2022-10-20',
      project: 'Work',
      id: generateID(),
      isComplete: false,
    })
  );

  todoItems.push(
    todoItem({
      name: 'Beat little Ricky',
      description: 'Need to level up to level 67 in borderlands to do this',
      priority: 'low',
      dueDate: currentDate,
      project: 'Play',
      id: generateID(),
      isComplete: false,
    })
  );

  todoItems.push(
    todoItem({
      name: 'Learn Invoker',
      description: 'Have to learn more heroes',
      priority: 'medium',
      dueDate: '2022-10-16',
      project: 'Play',
      id: generateID(),
      isComplete: false,
    })
  );

  todoItems.push(
    todoItem({
      name: 'Buy Death Trash',
      description: 'Have to support the developers',
      priority: 'high',
      dueDate: '2022-10-14',
      project: 'Play',
      id: generateID(),
      isComplete: false,
    })
  );

  state = { ...state, todoItems };
  state = { ...state, projects };

  sortTodoList();
  setStateToStorage({ newState: state });
}

export function getState() {
  return state;
}

export function setInitialStateFromStorage({ storedState }) {
  if (
    storedState &&
    storedState.todoItems.length !== 0 &&
    storedState.projects.length !== 0
  ) {
    state = storedState;
  } else {
    setDefaultState();
    sortTodoList();
    setStateToStorage({ newState: state });
  }
}

export function initialiseStateFromStorage() {
  try {
    return JSON.parse(sessionStorage.getItem('my_saved_state'));
  } catch (error) {
    console.error(error);
    return null;
  }
}

export function addProject({ name }) {
  state = {
    ...state,
    projects: [...state.projects, projectItem({ name })],
  };

  setStateToStorage({ newState: state });
  return state;
}

export function addTodoItem({
  name,
  description,
  priority,
  dueDate,
  project,
  id,
  isComplete,
}) {
  state = {
    ...state,
    todoItems: [
      ...state.todoItems,
      todoItem({
        name,
        description,
        priority,
        dueDate,
        project,
        id,
        isComplete,
      }),
    ],
  };

  sortTodoList();
  setStateToStorage({ newState: state });
  return state;
}

export function toggleIsCompleteTodoItem(todoItemId) {
  state = {
    ...state,
    todoItems: state.todoItems.map((todoItem) => {
      if (todoItem.id == todoItemId) {
        return {
          ...todoItem,
          isComplete: !todoItem.isComplete,
        };
      }
      return todoItem;
    }),
  };
  setStateToStorage({ newState: state });
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
    todoItems: state.todoItems.map((todoItem) => {
      if (todoItem.id != todoItemId) {
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
    }),
  };

  sortTodoList();
  setStateToStorage({ newState: state });
  return state; // Why do I need to return state here when I'm already setting state to be equal to the new state
}

export function deleteTodoItem({ todoItemIdToDelete }) {
  state = {
    ...state,
    todoItems: state.todoItems.filter(
      (todoItem) => todoItem.id !== todoItemIdToDelete // Same issue as before, why doesn't the explicit comparison work??
    ),
  };

  sortTodoList();
  setStateToStorage({ newState: state });
  return state;
}

export function deleteProject({ projectToDelete }) {
  state = {
    ...state,
    projects: state.projects.filter(
      (project) => project.name !== projectToDelete
    ),
  };

  state = {
    ...state,
    todoItems: state.todoItems.filter(
      (todoItem) => todoItem.project !== projectToDelete
    ),
  };

  sortTodoList();
  setStateToStorage({ newState: state });
  return state;
}
