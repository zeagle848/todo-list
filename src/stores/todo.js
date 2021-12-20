import { format, endOfDay } from "date-fns";

export class Todo {
  #retrieveTodoList() {
    try {
      return JSON.parse(sessionStorage.getItem("my_todo_list"));
    } catch (error) {
      console.error(error);
    }
  }

  #retrieveProjectList() {
    try {
      return JSON.parse(sessionStorage.getItem("my_project_list"));
    } catch (error) {
      console.error(error);
    }
  }

  #storeTodoList() {
    sessionStorage.setItem("my_todo_list", JSON.stringify(this.todoList));
  }

  #storeProjectList() {
    sessionStorage.setItem("my_project_list", JSON.stringify(this.projectList));
  }

  #sortTodoList() {
    this.todoList.sort(function compare(a, b) {
      const dateA = new Date(a.dueDate);
      const dateB = new Date(b.dueDate);
      return dateA - dateB;
    });
  }

  constructor() {
    this.todoList = this.#retrieveTodoList() || [];
    this.projectList = this.#retrieveProjectList() || [];
  }

  getTodoList() {
    return this.todoList;
  }

  getProjectList() {
    return this.projectList;
  }

  addTodoItem(name, description, priority, dueDate, project, id, isComplete) {
    this.todoList.push({
      name,
      description,
      priority,
      dueDate,
      project,
      id,
      isComplete,
    });

    this.#sortTodoList();
    this.#storeTodoList();
  }

  addProject(projectName, exists) {
    this.projectList.push({
      projectName,
      exists,
    });
    this.#storeProjectList();
  }

  removeProject(project) {
    for (let i = 0; i < this.projectList.length; i++) {
      if (this.projectList[i] === project) {
        this.projectList.splice(i, 1);
      }
    }
    this.#storeProjectList();
  }

  removeTodoItem(todoID) {
    for (let i = 0; i < this.todoList.length; i++) {
      if (this.todoList[i].id === todoID) {
        this.todoList.splice(i, 1);
      }
    }
    this.#storeTodoList();
  }

  toggleIsComplete(checkBox, todoID, todoName) {
    checkBox.addEventListener("change", () => {
      if (checkBox.checked) {
        todoName.classList.add("task-complete");
      } else {
        todoName.classList.remove("task-complete");
      }
      for (let i = 0; i < this.todoList.length; i++) {
        if (this.todoList[i].id === todoID) {
          this.todoList[i].isComplete = checkBox.checked;
          this.#storeTodoList();
        }
      }
    });
  }

  editTodoItem(description, dueDate, priority, project, todoID) {
    for (let i = 0; i < this.todoList.length; i++) {
      if (this.todoList[i].id === todoID) {
        this.todoList[i].description = description;
        this.todoList[i].dueDate = dueDate;
        this.todoList[i].priority = priority;
        this.todoList[i].project = project;
        this.#sortTodoList();
        this.#storeTodoList();
      }
    }
  }

  getProjectNumbers(projectName) {
    const numberOfProjects = this.todoList.filter((todoItem) => {
      return todoItem.project === projectName;
    }).length;

    if (numberOfProjects == false) {
      return 0;
    } else {
      return numberOfProjects;
    }
  }
}
