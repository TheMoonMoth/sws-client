describe("#Reads content", () => {
  it("checks content on the page exists", () => {
    cy.visit("https://sixwordstories.herokuapp.com/")

    cy.get("#add-story").should("contain", "+")
    cy.get("#add-story").click()
    cy.url().should("include", "/new-story")

    cy.get("h1").should("have.text", "Six Word Stories")

    cy.get("#story").type("Story attempt.")
    cy.get("#author").type("Author Test")
    cy.get("#submit").click()
    cy.get(".form-warner").should("have.text", "--Your story is too short--")

    cy.get("#story").clear().type("Story attempt number two which is one time too many.")
    cy.get("#author").clear().type("Author Test")
    cy.get("#submit").click()
    cy.get(".form-warner").should("have.text", "--Your story is too long--")

    cy.get("#story").clear().type("A story about this wonderful test.")
    cy.get("#author").clear().type("Author Test")
    cy.get("#submit").click()
    cy.url().should("not.include", "/new-story")
  })
})
