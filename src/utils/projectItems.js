export function setUiProjectItemSelected({ projectItemElement }) {
  const lastActiveProject = document.querySelector('.project-item.selected');
  if (lastActiveProject !== null) {
    lastActiveProject.classList.remove('selected');
  }
  projectItemElement.classList.add('selected');
}
