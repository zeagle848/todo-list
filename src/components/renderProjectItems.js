import renderProject from './renderSideBarProjects';
import { getProjectNumbers } from '../state/storage';

export default function renderProjectItems({
  projectList,
  onProjectSelect,
  onProjectRemove,
}) {
  projectList.forEach((project) => {
    const projectNumbers = getProjectNumbers({
      projectName: project.name,
    });
    renderProject({
      projectName: project.name,
      projectTodoCount: projectNumbers,
      onProjectSelect,
      onProjectRemove,
    });
  });
}
