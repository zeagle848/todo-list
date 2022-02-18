/// <reference types="Cypress" />
describe("Testing Todo list", () => {
  beforeEach(() => {
    cy.visit("http://localhost:8080/");
  });

  it("Can populate todo list application after clicking populate button", () => {
    cy.get("#populate-app").click({ force: true });

    cy.get("#todo-items-container").children().should("have.length", 9);
    cy.get("#side-bar-projects").children().should("have.length", 3);

    cy.get('[data-project-item-name="Garden"] > h2').should(
      "have.text",
      "Garden"
    );

    cy.get();
    cy.get("#delete-todo-list").click({ force: true });
    cy.on("window:confirm", (text) => {
      expect(text).to.eql("Are you sure you want to remove all todo items?");
    });
  });

  it("Can add new todo items through the add todo item modal", () => {
    cy.get("#add-todo-item-button").click({ force: true });

    cy.get("#new-todo-item-name").type("Write e2e testing");
    cy.get("#todo-description").type("Make sure that you test all the modals");
    cy.get("#todo-modal-due-date-input").type("2022-01-11");
    cy.get("#low-priority-radio").click();
    cy.get(".project-dropdown").trigger("mouseover");

    cy.window().then((win) => {
      const stub = cy.stub(win, "prompt");
      stub.returns("Coding");
      cy.get(".last-drop-down-element").click({ force: true });
    });

    cy.get(".submit-new-todo-modal").click();

    cy.get(".todo-beginning>span").should("have.text", "Write e2e testing");
    cy.get(".todo-item").should("have.class", "todo-item-low-priority");

    cy.get("#delete-todo-list").click({ force: true });
    cy.on("window:confirm", () => {});
  });

  it("Can delete projects and all todo items associated with it and default to home screen", () => {
    cy.get("#populate-app").click({ force: true });

    cy.get(
      '[data-project-item-name="Garden"] > .project-item-end > .remove-project'
    ).click({ force: true });

    cy.on("window:confirm", () => {});

    cy.get(".project-item-selected > h1").should("have.text", "Home");

    cy.get("#todo-items-container").children().should("have.length", 6);

    cy.get("#delete-todo-list").click({ force: true });
    cy.on("window:confirm", () => {});
  });

  it("Can change change the project associated with a todo item", () => {
    cy.get("#populate-app").click({ force: true });

    cy.get('[data-project-item-name="Garden"]').click({ force: true });
    cy.get(".edit-todo-button").first().click({ force: true });
    cy.get(".dropdown-content > span").eq(1).click({ force: true });
    cy.get(".submit-new-todo-modal").click();

    cy.get('[data-project-name="Work"]').should("have.text", "4");

    cy.get("#delete-todo-list").click({ force: true });
    cy.on("window:confirm", () => {});
  });

  it("Can change a todo items priority", () => {
    cy.get("#add-todo-item-button").click({ force: true });

    cy.get("#new-todo-item-name").type("Write e2e testing");
    cy.get("#todo-description").type("Make sure that you test all the modals");
    cy.get("#todo-modal-due-date-input").type("2022-01-11");
    cy.get("#low-priority-radio").click();
    cy.get(".project-dropdown").trigger("mouseover");
    cy.window().then((win) => {
      const stub = cy.stub(win, "prompt");
      stub.returns("Coding");
      cy.get(".last-drop-down-element").click({ force: true });
    });
    cy.get(".submit-new-todo-modal").click();

    cy.get(".todo-item-low-priority").should("be.visible");

    cy.get(".todo-end > i").first().click({ force: true });
    cy.get("#high-priority-radio").click();
    cy.get(".submit-new-todo-modal").click();

    cy.get(".todo-item-high-priority").should("be.visible");

    cy.get("#delete-todo-list").click({ force: true });
    cy.on("window:confirm", () => {});
  });

  it("Can save changes made to a todo item after refreshing the page such as marking it as done", () => {
    cy.get("#add-todo-item-button").click({ force: true });

    cy.get("#new-todo-item-name").type("Write e2e testing");
    cy.get("#todo-description").type("Make sure that you test all the modals");
    cy.get("#todo-modal-due-date-input").type("2022-01-11");
    cy.get("#low-priority-radio").click();
    cy.get(".project-dropdown").trigger("mouseover");
    cy.window().then((win) => {
      const stub = cy.stub(win, "prompt");
      stub.returns("Coding");
      cy.get(".last-drop-down-element").click({ force: true });
    });
    cy.get(".submit-new-todo-modal").click();

    cy.get(".completed-task-checkbox").click();

    cy.get(".todo-beginning > span").should("have.class", "task-complete");

    cy.reload();

    cy.get(".todo-beginning > span").should("have.class", "task-complete");

    cy.get("#delete-todo-list").click({ force: true });
    cy.on("window:confirm", (text) => {
      expect(text).to.eql("Are you sure you want to remove all todo items?");
    });
  });

  it("Can add new projects even if the project has no todo items", () => {
    cy.get("#populate-app").click({ force: true });

    cy.get('[data-project-item-name="Garden"]').click({ force: true });
    cy.get(".edit-todo-button").first().click({ force: true });

    cy.get(".project-dropdown").trigger("mouseover");
    cy.window().then((win) => {
      const stub = cy.stub(win, "prompt");
      stub.returns("Coding");
      cy.get(".last-drop-down-element").click({ force: true });
    });

    cy.get(".first-dropdown-element").click({ force: true });
    cy.get(".submit-new-todo-modal").click();

    cy.get('[data-project-name="Coding"]').should("have.text", "0");

    cy.get("#delete-todo-list").click({ force: true });
    cy.on("window:confirm", () => {});
  });

  // it("Shows projects created in the newTodoModal in the editTodoModal and visa versa", () => {
  //   cy.get("#populate-app").click({ force: true });

  //   cy.get('[data-project-item-name="Garden"]').click({ force: true });
  //   cy.get(".edit-todo-button").first().click({ force: true });

  //   cy.get(".project-dropdown").trigger("mouseover");
  //   cy.window().then((win) => {
  //     const stub = cy.stub(win, "prompt");
  //     stub.returns("Coding");
  //     cy.get(".last-drop-down-element").click({ force: true });
  //   });
  //   cy.get(".first-dropdown-element").click({ force: true });
  //   cy.get(".submit-new-todo-modal").click();

  //   cy.get("#add-todo-item-button").click({ force: true });

  //   cy.get(".dropdown-content").children().should("have.length", 5);

  //   cy.get("#new-todo-item-name").type("See Lucy");
  //   cy.get("#todo-description").type("Ask her about coffee");
  //   cy.get("#todo-modal-due-date-input").type("2022-02-11");
  //   cy.get("#medium-priority-radio").click();
  //   cy.get(".project-dropdown").trigger("mouseover");

  //   cy.window().then((win) => {
  //     const stub = cy.stub(win, "prompt");
  //     stub.returns("Friends");
  //     cy.get(".last-drop-down-element").click({ force: true });
  //   });

  //   cy.get(".submit-new-todo-modal").click();

  //   cy.get('[data-project-item-name="Garden"]').click({ force: true });
  //   cy.get(".edit-todo-button").first().click({ force: true });

  //   cy.get(".dropdown-content").children().should("have.length", 6);

  //   cy.get("#close-modal").click();

  //   cy.get("#delete-todo-list").click({ force: true });
  //   cy.on("window:confirm", () => {});
  // });
});
