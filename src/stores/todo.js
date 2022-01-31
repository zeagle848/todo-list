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

  getTodoList(project) {
    if (project === "all-projects") {
      return this.todoList;
    } else if (project === "today") {
      const today = new Date();
      const currentDate =
        today.getFullYear() +
        "-" +
        ("0" + today.getMonth() + 1).slice(-2) +
        "-" +
        ("0" + today.getDate()).slice(-2);

      return this.todoList.filter((todoItem) => {
        return todoItem.dueDate === currentDate;
      });
    } else if (project === "week") {
      const currentDate = new Date();
      let week = [];

      for (let i = 1; i <= 7; i++) {
        let first = currentDate.getDate() - currentDate.getDay() + i;
        let day = new Date(currentDate.setDate(first))
          .toISOString()
          .slice(0, 10);

        week.push(day);
      }

      return this.todoList.filter((todoItem) => {
        return week.includes(todoItem.dueDate);
      });
    } else {
      return this.todoList.filter((todoItem) => {
        return todoItem.project === project;
      });
    }
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
      if (this.projectList[i].projectName === project) {
        this.projectList.splice(i, 1);
      }
    }
    this.todoList = this.todoList.filter((todoItem) => {
      return todoItem.project !== project;
    });
    this.#storeTodoList();
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

  deleteTodoList() {
    this.todoList = [];
    this.projectList = [];
    this.#storeTodoList();
    this.#storeProjectList();
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
