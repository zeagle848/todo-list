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
    cy.get("#delete-todo-list").click({ force: true });

    cy.on("window:confirm", (text) => {
      expect(text).to.contain(
        "Are you sure you want to remove all todo items?"
      );
    });
  });
  it("Can add new todo items through the add todo item modal", () => {
    cy.get("#add-todo-item-button").click({ force: true });

    cy.get("#new-todo-item-name").type("Write e2e testing");
    cy.get("#todo-description").type("Make sure that you test all the modals");
    cy.get("#todo-modal-due-date-input").type("2022-01-11");
    cy.get("#low-priority-radio").click();
    cy.get(".project-dropdown").trigger("mouseover");
    cy.get(".last-drop-down-element").click({ force: true });
    cy.window().then((win) => {
      cy.stub(win, "prompt").returns("Coding");
    });

    cy.get(".submit-new-todo-modal").click();

    cy.get(".todo-beginning>span").should("have.text", "Write e2e testing");
    cy.get(".todo-item").should("have.class", "todo-item-low-priority");
    cy.get(".remove-todo-item").click();
  });
});
