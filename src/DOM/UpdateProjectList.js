export function updateProjectList(myTodo) {
  const projectContainer = document.getElementById("side-bar-projects");

  const projectList = myTodo.getProjectList();

  projectList.forEach((project) => {
    if (project.exists) {
      const numberElement = document.querySelector(
        `[data-project-name = '${project.projectName}']`
      );
      numberElement.textContent = myTodo.getProjectNumbers(project.projectName);
    } else {
      const numOfTodoItems = myTodo.getProjectNumbers(project.projectName);

      const projectItem = document.createElement("div");
      projectItem.classList.add("project-item");

      const projectName = document.createElement("h2");
      projectName.textContent = project.projectName;

      projectItem.append(projectName);

      const projectItemEnd = document.createElement("div");
      projectItemEnd.classList.add("project-item-end");

      const projectNumbers = document.createElement("span");
      projectNumbers.classList.add("number-of-todo-items");
      projectNumbers.setAttribute(
        "data-project-name",
        `${project.projectName}`
      );
      projectNumbers.textContent = numOfTodoItems;

      projectItemEnd.append(projectNumbers);

      const removeProject = document.createElement("div");
      removeProject.classList.add("remove-project");
      removeProject.textContent = "X";

      projectItemEnd.append(removeProject);

      projectItem.addEventListener("mouseover", () => {
        removeProject.classList.add("remove-project-visible");
      });
      projectItem.addEventListener("mouseout", () => {
        removeProject.classList.remove("remove-project-visible");
      });

      projectItem.append(projectItemEnd);

      projectContainer.append(projectItem);

      project.exists = true;
    }
  });
}
