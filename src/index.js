import './style.css';
import {
  getState,
  addTodoItem,
  editTodoItem,
  deleteTodoItem,
  deleteProject,
  getTodoItems,
  getTodoItem,
  getProjectNumbers,
  getProjectList,
  deleteAllItems,
} from './state/storage';
import renderDescriptionModal from './components/renderDescriptionModal';
import renderTodoItem from './components/renderTodoItem';
import renderProjectItems from './components/renderProjectItems';
import renderNewTodoModal from './components/renderNewTodoModal';
import renderEditTodoModal from './components/renderEditTodoModal';
import updateDisplays from './services/updateDisplays';
import { setUiProjectItemSelected } from './utils/projectItems';
import { toggleIsComplete } from './utils/toggleIsComplete';
import { addNewProject } from './ComponentUtils/addNewProject';
import { MODAL_EDIT_ID, MODAL_CREATE_ID } from './constants';
import { clearTodoContainer, clearProjectItems } from './utils/clearContainers';

// CLOSE MODAL FUNCTIONS

function closeCreateTodoModal() {
  const createModal = document.getElementById(MODAL_CREATE_ID);
  createModal.remove();
}

function onCreateModalClose() {
  closeCreateTodoModal();
}

function closeEditModal() {
  const editModal = document.getElementById(MODAL_EDIT_ID);
  editModal.remove();
}

function onEditModalClose() {
  closeEditModal();
}

// OPEN MODAL ON CLICK FUNCTIONS

function onDescriptionClick(event) {
  const todoID =
    event.target.parentNode.parentNode.getAttribute('data-todo-id');
  const todoItem = getTodoItem({
    todoItemId: todoID,
  });
  renderDescriptionModal(todoItem);
}

function onEditClick(event) {
  const todoItem = getTodoItem({
    todoItemId: event.target.getAttribute('data-todo-id'),
  });
  renderEditTodoModal({
    todoItem,
    onEditModalSubmit,
    onEditModalClose,
    addNewProjectFunction: addNewProject,
    allProjects: getProjectList({
      state: getState(),
    }),
  });
}

// TODO ITEM FUNCTIONS

function removeTodoItem(event) {
  const todoID =
    event.target.parentNode.parentNode.getAttribute('data-todo-id');
  deleteTodoItem({ todoItemIdToDelete: todoID });
  event.target.parentNode.parentNode.remove();
  updateDisplays({ state: getState(), getProjectNumbers, getTodoItems });
}

function renderTodoItems({ filter }) {
  const todoItemList = getTodoItems({ selectedFilter: filter });
  todoItemList.forEach((todoItem) => {
    renderTodoItem({
      todoItem,
      toggleIsCompleteFunction: toggleIsComplete,
      descriptionButtonFunction: onDescriptionClick,
      editButtonFunction: onEditClick,
      removeTodoItemFunction: removeTodoItem,
    });
  });
}

function updateTodoItems(filter) {
  clearTodoContainer();
  renderTodoItems({ filter });
}

// MODAL SUBMIT FUNCTIONS

function onCreateModalSubmit({
  name,
  description,
  priority,
  dueDate,
  project,
}) {
  addTodoItem({
    name,
    description,
    priority,
    dueDate,
    project,
    isComplete: false,
  });

  const state = getState();
  updateTodoItems(project);
  updateProjectItems();
  updateDisplays({ state, getProjectNumbers, getTodoItems });
  setUiProjectItemSelected({
    projectItemElement: document.querySelector(
      `[data-project-item-name='${project}']`
    ),
  });
}

function onEditModalSubmit({
  todoId,
  description,
  priority,
  dueDate,
  project,
}) {
  editTodoItem({
    todoItemId: todoId,
    newDescription: description,
    newPriority: priority,
    newDueDate: dueDate,
    newProject: project,
  });

  const state = getState();
  updateTodoItems(project);
  updateProjectItems();
  updateDisplays({ state, getProjectNumbers, getTodoItems });
  setUiProjectItemSelected({
    projectItemElement: document.querySelector(
      `[data-project-item-name=${project}]`
    ),
  });
}

// PROJECT FUNCTIONS

function onProjectRemove(projectName) {
  deleteProject({ projectToDelete: projectName });
  updateProjectItems();
  updateTodoItems('all-projects');
  setUiProjectItemSelected({
    projectItemElement: document.getElementById('home-container'),
  });
  updateDisplays({ state: getState(), getProjectNumbers, getTodoItems }); // Let's talk about this next time
}

function onProjectSelect(projectName) {
  updateTodoItems(projectName);
  setUiProjectItemSelected({
    projectItemElement: document.querySelector(
      `[data-project-item-name=${projectName}`
    ),
  });
}

function updateProjectItems() {
  clearProjectItems();
  renderProjectItems({
    projectList: getProjectList({ state: getState() }), // doesnt need state
    onProjectSelect,
    onProjectRemove,
  });
}

// EVENT LISTENERS FOR THE SIDE BAR

const homeButton = document.getElementById('home-container');
const todayButton = document.getElementById('today-container');
const weekButton = document.getElementById('week-container');
const addNewTodoItemButton = document.getElementById('add-todo-item-button');
const clearAppButton = document.getElementById('delete-todo-list');

homeButton.addEventListener('click', () => {
  updateTodoItems('all-projects');
  setUiProjectItemSelected({ projectItemElement: homeButton });
});

todayButton.addEventListener('click', () => {
  updateTodoItems('today');
  setUiProjectItemSelected({ projectItemElement: todayButton });
});

weekButton.addEventListener('click', () => {
  updateTodoItems('week');
  setUiProjectItemSelected({ projectItemElement: weekButton });
});

addNewTodoItemButton.addEventListener('click', () => {
  renderNewTodoModal({
    allProjects: getProjectList({ state: getState() }),
    addNewProjectFunction: addNewProject,
    onCreateModalSubmit,
    onCreateModalClose,
  });
});

clearAppButton.addEventListener('click', () => {
  if (confirm('Are you sure you want to remove all todo items?')) {
    deleteAllItems();
    updateProjectItems();
    updateTodoItems('all-projects');
    setUiProjectItemSelected({
      projectItemElement: document.getElementById('home-container'),
    });
    updateDisplays({ state: getState(), getProjectNumbers, getTodoItems });
  }
});

// INITIALIZE FUNCTION

function onInit() {
  updateTodoItems('all-projects');
  setUiProjectItemSelected({ projectItemElement: homeButton });
  updateProjectItems();
  updateDisplays({ state: getState(), getProjectNumbers, getTodoItems });
}

onInit();
