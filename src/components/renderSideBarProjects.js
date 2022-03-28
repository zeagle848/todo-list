// For some reason whenever I click on the project number or project name elements the click
// isn't propogating, therefore no todoItems are rendered and the project item isn't highlighted.

function renderProject({
  projectName,
  projectTodoCount,
  onProjectSelect,
  onProjectRemove,
}) {
  // Set up root elements and variables
  const projectContainer = document.getElementById('side-bar-projects');

  const numOfTodoItems = projectTodoCount;
  const projectItem = document.createElement('div');
  projectItem.classList.add('project-item');
  projectItem.setAttribute('data-project-item-name', `${projectName}`);

  projectItem.addEventListener('click', (event) => {
    const projectName = event.currentTarget.getAttribute(
      'data-project-item-name'
    );
    onProjectSelect(projectName);
  });

  const projectNameElement = document.createElement('h2');
  projectNameElement.textContent = projectName;

  projectItem.append(projectNameElement);

  const projectItemEnd = document.createElement('div');
  projectItemEnd.classList.add('project-item-end');

  const projectNumbers = document.createElement('span');
  projectNumbers.classList.add('number-of-todo-items');
  projectNumbers.setAttribute('data-todo-items-associated', `${projectName}`);

  projectNumbers.textContent = numOfTodoItems;

  projectItemEnd.append(projectNumbers);

  const removeProject = document.createElement('div');
  removeProject.classList.add('remove-project');
  removeProject.textContent = 'X';
  removeProject.id = projectName;

  removeProject.addEventListener('click', (event) => {
    event.stopPropagation();
    const projectName = event.target.id;
    onProjectRemove(projectName);
    projectItem.remove();
  });

  projectItemEnd.append(removeProject);

  projectItem.addEventListener('mouseover', () => {
    removeProject.classList.add('remove-project-visible');
  });
  projectItem.addEventListener('mouseout', () => {
    removeProject.classList.remove('remove-project-visible');
  });

  projectItem.append(projectItemEnd);

  projectContainer.append(projectItem);
}

export default renderProject;
