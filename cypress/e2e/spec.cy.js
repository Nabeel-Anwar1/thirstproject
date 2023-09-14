// this is my first time using Cypress so the tests I write may be inefficient
describe("First test", () => {
  it("Goes to localhosted project", () => {
    cy.visit("http://localhost:5173/");
  });
});

describe("Arrives at login page and can log in", () => {
  it("logs in as test@test.com", function () {
    //goes to site
    cy.visit("http://localhost:5173/");
    //finds username input box and types email
    cy.get("input[name=username]").type("test@test.com");
    //finds password input box and inputs password and presses enter(submit) after
    cy.get("input[name=password]").type("test123{enter}");
    //checks to see if there is a p tag and if it contains the email of the user
    cy.get("p").should("contain", "Signed In as test@test.com");
    //signs out after running the above
    cy.contains("Sign Out").click();
  });
});
