import { updateTodoList } from "./UpdateTodoList";
import { updateDisplays } from "../Update/UpdateDisplays.js";

export function populateProjectList(myTodo) {
  const projectContainer = document.getElementById("side-bar-projects");

  const projectList = myTodo.getProjectList();

  projectList.forEach((project) => {
    const numOfTodoItems = myTodo.getProjectNumbers(project.projectName);

    const projectItem = document.createElement("div");
    projectItem.classList.add("project-item");
    projectItem.setAttribute(
      "data-project-item-name",
      `${project.projectName}`
    );

    projectItem.addEventListener("click", (e) => {
      const lastActiveProject = document.querySelector(
        ".project-item-selected"
      );
      if (lastActiveProject !== null) {
        lastActiveProject.classList.remove("project-item-selected");
      }
      updateTodoList(myTodo, project.projectName);
      projectItem.classList.add("project-item-selected");
    });

    const projectName = document.createElement("h2");
    projectName.textContent = project.projectName;

    projectItem.append(projectName);

    const projectItemEnd = document.createElement("div");
    projectItemEnd.classList.add("project-item-end");

    const projectNumbers = document.createElement("span");
    projectNumbers.classList.add("number-of-todo-items");
    projectNumbers.setAttribute("data-project-name", `${project.projectName}`);
    projectNumbers.textContent = numOfTodoItems;

    projectItemEnd.append(projectNumbers);

    const removeProject = document.createElement("div");
    removeProject.classList.add("remove-project");
    removeProject.textContent = "X";

    removeProject.addEventListener("click", () => {
      let safeToRemove = confirm(
        "Deleting project will delete all todo items associated with it. Are you sure you want to delete this project?"
      );

      if (safeToRemove) {
        myTodo.removeProject(project.projectName);
        removeProject.parentElement.parentElement.remove();
        updateTodoList(myTodo, "all-projects");
        updateDisplays(myTodo);
      }
    });

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
  });
}
