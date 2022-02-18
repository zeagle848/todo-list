import './style.css';
import {
  getState,
  addProject,
  addTodoItem,
  setInitialStateFromStorage,
  initialiseStateFromStorage,
  toggleIsCompleteTodoItem,
  editTodoItem,
  deleteTodoItem,
  deleteProject,
} from './state/storage';
import renderDescriptionModal from './components/renderDescriptionModal';
import renderTodoItem from './components/renderTodoItem';
import renderProject from './components/renderSideBarProjects';
import renderNewTodoModal from './components/renderNewTodoModal';
import renderEditTodoModal from './components/renderEditTodoModal';
import {
  getTodoItems,
  getProjectList,
  getProjectNumbers,
  getSpecificTodoItem,
} from './services/getStateDetails';
import updateDisplays from './services/updateDisplays';

// UTILITY FUNCTIONS
function generateID() {
  return Math.floor(Math.random() * 10000 + 1).toString();
}

// DOM RELATED FUNCTIONS

function addAndRemoveSelectedClass({ elementToAddClass }) {
  const lastActiveProject = document.querySelector('.project-item-selected');
  if (lastActiveProject !== null) {
    lastActiveProject.classList.remove('project-item-selected');
  }
  elementToAddClass.classList.add('project-item-selected');
}

function clearTodoContainer() {
  const todoContainer = document.getElementById('todo-items-container');
  while (todoContainer.firstChild) {
    todoContainer.removeChild(todoContainer.firstChild);
  }
}

function clearProjectContainer() {
  const projectContainer = document.getElementById('side-bar-projects');
  while (projectContainer.firstChild) {
    projectContainer.removeChild(projectContainer.firstChild);
  }
}
// FUNCTIONS ASSOCIATED WITH ADDING A TODO ITEM
function addNewProject(event) {
  const newProjectName = prompt('Project name').trim();
  if (newProjectName) {
    const dropDownButton = document.querySelector('.dropdown-button');
    dropDownButton.textContent = newProjectName;

    const dropDownNewProject = event.target;
    dropDownNewProject.parentElement.removeChild(dropDownNewProject);

    const newDropDownElement = document.createElement('span');
    newDropDownElement.textContent = newProjectName;

    const dropDownContent = document.querySelector('.dropdown-content');

    dropDownContent.append(newDropDownElement);

    dropDownContent.append(dropDownNewProject);
  }
}

function submitNewTodoModalMethod() {
  const todoNameInput = document.querySelector('.new-todo-item-name');
  const todoDescriptionInput = document.querySelector('.todo-description');
  const dateInput = document.querySelector('#todo-modal-due-date-input');
  const dropDownButton = document.querySelector('.dropdown-button');
  const lowPriorityRadio = document.querySelector('.low-priority-radio');
  const mediumPriorityRadio = document.querySelector('.medium-priority-radio');
  const highPriorityRadio = document.querySelector('.high-priority-radio');

  const todoName = todoNameInput.value.trim();
  const todoDescription = todoDescriptionInput.value.trim();
  const todoDueDate = dateInput.value;
  let todoPriority;
  const todoProject = dropDownButton.textContent;

  if (lowPriorityRadio.checked === true) {
    todoPriority = 'low';
  }
  if (mediumPriorityRadio.checked === true) {
    todoPriority = 'medium';
  }
  if (highPriorityRadio.checked === true) {
    todoPriority = 'high';
  }

  if (todoName === '') {
    alert('Please name your todo item');
  }

  if (todoPriority === undefined) {
    alert('Please provide a priority for your todo item');
  }

  if (todoProject === 'Choose project...') {
    alert('Please specify a project for your todo item');
  }

  if (
    todoName !== '' &&
    todoPriority !== undefined &&
    todoProject !== 'Choose project...'
  ) {
    addProject({ name: todoProject });
    addTodoItem({
      name: todoName,
      description: todoDescription,
      priority: todoPriority,
      dueDate: todoDueDate,
      project: todoProject,
      id: generateID(),
      isComplete: false,
    });
    renderTodoItems({ state: getState(), filter: todoProject });
    renderProjectItems({ projectList: getProjectList({ state: getState() }) });
    updateDisplays({ state: getState(), getProjectNumbers, getTodoItems });
    addAndRemoveSelectedClass({
      elementToAddClass: document.querySelector(
        `[data-project-item-name=${todoProject}]`
      ),
    });
    return true;
  }
}

const addNewTodoItemButton = document.getElementById('add-todo-item-button');

addNewTodoItemButton.addEventListener('click', () => {
  renderNewTodoModal({
    allProjects: getProjectList({ state: getState() }),
    addNewProjectFunction: addNewProject,
    submitNewTodoMethod: submitNewTodoModalMethod,
  });
});

// FUNCTIONS ASSOCIATED WITH THE EDIT MODAL

function submitEditTodoFunction(event) {
  const todoDescriptionInput = document.querySelector('.todo-description');
  const dateInput = document.querySelector('.todo-modal-due-date-input');
  const dropDownButton = document.querySelector('.dropdown-button');
  const lowPriorityRadio = document.querySelector('.low-priority-radio');
  const mediumPriorityRadio = document.querySelector('.medium-priority-radio');
  const highPriorityRadio = document.querySelector('.high-priority-radio');

  const finalDescription = todoDescriptionInput.value.trim();
  const finalDueDate = dateInput.value;
  let finalPriority;
  const finalProject = dropDownButton.textContent;

  if (lowPriorityRadio.checked === true) {
    finalPriority = 'low';
  }
  if (mediumPriorityRadio.checked === true) {
    finalPriority = 'medium';
  }
  if (highPriorityRadio.checked === true) {
    finalPriority = 'high';
  }

  const todoID = event.target.getAttribute('data-todo-id');
  editTodoItem({});
  editTodoItem({
    todoItemId: todoID,
    newDescription: finalDescription,
    newPriority: finalPriority,
    newDueDate: finalDueDate,
    newProject: finalProject,
  });
  renderTodoItems({ state: getState(), filter: finalProject });
  renderProjectItems({ projectList: getProjectList({ state: getState() }) });
  updateDisplays({ state: getState(), getProjectNumbers, getTodoItems });
  addAndRemoveSelectedClass({
    elementToAddClass: document.querySelector(
      `[data-project-item-name=${finalProject}]`
    ),
  });
}

// FUNCTIONS ASSOCIATED WITH INDIVIDUAL TODO ITEMS

function onDescriptionClick(event) {
  const todoID =
    event.target.parentNode.parentNode.getAttribute('data-todo-id');
  const todoItem = getSpecificTodoItem({
    state: getState(),
    todoItemID: todoID,
  });
  renderDescriptionModal(todoItem);
}

function onEditClick(event) {
  const todoItem = getSpecificTodoItem({
    state: getState(),
    todoItemID: event.target.getAttribute('data-todo-id'),
  });
  renderEditTodoModal({
    todoItem,
    submitEditTodoFunction,
    allProjects: getProjectList({
      state: getState(),
      addNewProjectFunction: addNewProject,
    }),
  });
}

function toggleIsComplete(event) {
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

function removeTodoItem(event) {
  const todoID =
    event.target.parentNode.parentNode.getAttribute('data-todo-id');
  deleteTodoItem({ todoItemIdToDelete: todoID });
  event.target.parentNode.parentNode.remove();
  updateDisplays({ state: getState(), getProjectNumbers, getTodoItems });
}

function renderTodoItems({ state, filter }) {
  clearTodoContainer();
  const todoItemList = getTodoItems({ state, selectedFilter: filter });
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

// FUNCTIONS ASSOCIATED WITH PROJECT ITEMS ON THE SIDE BAR

function projectClickFunction(event) {
  const projectName = event.target.getAttribute('data-project-item-name');
  renderTodoItems({ state: getState(), filter: projectName });
  addAndRemoveSelectedClass({ elementToAddClass: event.target });
}

function removeProject(event) {
  event.stopPropagation();
  const projectName = event.target.id;
  deleteProject({ projectToDelete: projectName });
  renderTodoItems({ state: getState(), filter: 'all-projects' });
  event.target.parentNode.parentNode.remove();
  addAndRemoveSelectedClass({
    elementToAddClass: document.getElementById('home-container'),
  });
  updateDisplays({ state: getState(), getProjectNumbers, getTodoItems });
}

function renderProjectItems({ projectList }) {
  clearProjectContainer();
  projectList.forEach((project) => {
    const projectNumbers = getProjectNumbers({
      state: getState(),
      projectName: project.name,
    });
    renderProject({
      projectName: project.name,
      projectClickFunction,
      projectTodoCount: projectNumbers,
      removeProjectFunction: removeProject,
    });
  });
}

// EVENT LISTENERS FOR THE SIDE BAR

const homeButton = document.getElementById('home-container');
const todayButton = document.getElementById('today-container');
const weekButton = document.getElementById('week-container');

homeButton.addEventListener('click', () => {
  renderTodoItems({ state: getState(), filter: 'all-projects' });
  addAndRemoveSelectedClass({ elementToAddClass: homeButton });
});

todayButton.addEventListener('click', () => {
  renderTodoItems({ state: getState(), filter: 'today' });
  addAndRemoveSelectedClass({ elementToAddClass: todayButton });
});

weekButton.addEventListener('click', () => {
  renderTodoItems({ state: getState(), filter: 'week' });
  addAndRemoveSelectedClass({ elementToAddClass: weekButton });
});

// INITIALIZE FUNCTION

function onInit() {
  setInitialStateFromStorage({ storedState: initialiseStateFromStorage() });
  renderTodoItems({ state: getState(), filter: 'all-projects' });
  const allProjects = getProjectList({ state: getState() });
  renderProjectItems({ projectList: allProjects });
  updateDisplays({ state: getState(), getProjectNumbers, getTodoItems });
}

onInit();
