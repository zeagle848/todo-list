import { addProject } from '../state/storage';

export function addNewProject(event) {
  const newProjectName = prompt('Project name').trim();
  if (newProjectName) {
    const dropDownButton = document.querySelector('.dropdown-button');
    dropDownButton.textContent = newProjectName;

    const dropDownNewProject = event.target;
    const dropDownContent = dropDownNewProject.parentElement;
    dropDownContent.removeChild(dropDownNewProject);

    const newDropDownElement = document.createElement('span');
    newDropDownElement.textContent = newProjectName;

    dropDownContent.append(newDropDownElement);

    dropDownContent.append(dropDownNewProject);
    addProject({ name: newProjectName });
  }
}
