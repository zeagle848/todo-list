import { getDefaultState } from '../src/state/debug';
import {
  deleteAllItems,
  addTodoItem,
  getState,
  getTodoItem,
  addProject,
  populateAppWithData,
  deleteTodoItem,
  deleteProject,
  editTodoItem,
  toggleIsCompleteTodoItem,
} from '../src/state/storage';
let mockStorage = {};

// The mocking of the Storage object is taken from the online blog https://bholmes.dev/blog/mocking-browser-apis-fetch-localstorage-dates-the-easy-way-with-jest/

beforeAll(() => {
  global.Storage.prototype.setItem = jest.fn((key, value) => {
    mockStorage[key] = value;
  });
  global.Storage.prototype.getItem = jest.fn((key) => mockStorage[key]);
});

beforeEach(() => {
  populateAppWithData();
  mockStorage = {};
});

afterEach(() => {
  deleteAllItems();
});

afterAll(() => {
  global.Storage.prototype.setItem.mockReset();
  global.Storage.prototype.getItem.mockReset();
});

test('Can add todo item', () => {
  addTodoItem({
    name: 'Brush teeth',
    description: 'For four minutes',
    priority: 'high',
    dueDate: '2022-09-30',
    project: 'hygine',
    isComplete: false,
    id: 8487,
  });
  expect(getTodoItem({ todoItemId: 8487 })).toEqual({
    name: 'Brush teeth',
    description: 'For four minutes',
    priority: 'high',
    dueDate: '2022-09-30',
    project: 'hygine',
    isComplete: false,
    id: 8487,
  });
});

test('Can add project', () => {
  addProject({ name: 'Hygine' });
  expect(getState().projects.length).toBe(4);
});

test('Can delete todo item based on id', () => {
  deleteTodoItem({ todoItemIdToDelete: 8673 });
  expect(getState().todoItems.length).toBe(8);
});

test('Can delete project and all todo items associated with it', () => {
  deleteProject({ projectToDelete: 'Garden' });
  expect(getState().projects.length).toBe(2);
  expect(getState().todoItems.length).toBe(6);
});

test('Can edit todo items priority, description, project, and due date', () => {
  editTodoItem({
    todoItemId: 8673,
    newDescription: 'Ask Moses to mow the lawn',
    newPriority: 'high',
    newDueDate: '2022-09-30',
    newProject: 'Milner Chores',
  });

  expect(getTodoItem({ todoItemId: 8673 })).toEqual({
    name: 'Mow the lawn',
    description: 'Ask Moses to mow the lawn',
    priority: 'high',
    dueDate: '2022-09-30',
    project: 'Milner Chores',
    isComplete: false,
    id: 8673,
  });
});

test('Can toggle whether a todo item is completed', () => {
  toggleIsCompleteTodoItem(643);
  expect(getTodoItem({ todoItemId: 643 })).toEqual({
    name: 'Plant the roses',
    description: 'Only plant on the stoep',
    priority: 'medium',
    dueDate: '2022-01-03',
    project: 'Garden',
    isComplete: true,
    id: 643,
  });
});

test('Can delete all todo items and projects', () => {
  expect(deleteAllItems()).toEqual({
    todoItems: [],
    projects: [],
  });
});
