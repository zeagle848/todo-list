function renderProject({
  projectName,
  projectClickFunction,
  projectTodoCount,
  removeProjectFunction,
}) {
  // Set up root elements and variables
  const projectContainer = document.getElementById('side-bar-projects');
  /* Before, I had an if-else statement to check whether the project item has already been rendered on the side-bar.
     If it had then I would simply update the number of todo-items associated with the project rather than rebuilding
     the whole project item on the side bar. Doing so however meant that I had to add an 'exists' property to the
     project item. I also needed two modules: one to render the projects once the user refreshes the webpage, and one 
     to update the project side bar. The two modules were called PopulateProjectList and UpdateProject list respectivly. 
  */

  const numOfTodoItems = projectTodoCount;
  const projectItem = document.createElement('div');
  projectItem.classList.add('project-item');
  projectItem.setAttribute('data-project-item-name', `${projectName}`);

  projectItem.addEventListener('click', projectClickFunction);

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

  removeProject.addEventListener('click', removeProjectFunction);

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
