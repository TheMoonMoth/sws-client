describe("#Reads content of main page", () => {
  it("checks content on the main page exists", () => {
    cy.visit("https://sixwordstories.herokuapp.com/")
    cy.title().should("include", "Six Word Stories")
    cy.get("h1").should("have.text", "Six Word Stories")

    cy.get("div#philosophy h2").should("have.text", "ABOUT")
    cy.get("div #philosophy p").eq(0).should("have.text", "This app allows users to read and write six word stories. Each story gets processed by the sentiment.js algorithm and then assigned emotional value, displayed below the story. Users can then vote on stories and maybe find the next Ernest Hemingway!")

    cy.get(".content-window")
    cy.get(".content-window").should("not.be.empty")
    cy.get(".content-window #story-card").as("card")

    cy.get("@card").get("h2").should("not.be.empty")
    cy.get("@card").get("small").should("not.be.empty")

    cy.get(".content-window .voters")
    cy.get(".content-window .voters button").eq(0).click()
    cy.get(".content-window .voters p").should("not.be", 0)

    cy.get(".content-window #emolyzer h2").should("not.be.empty")
    cy.get(".content-window #emolyzer p").should("not.be.empty")

  })
})
