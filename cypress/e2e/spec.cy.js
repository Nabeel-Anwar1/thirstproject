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

describe("Arrives at login page and can sign up", () => {
  it("logs in as test999@test.com", function () {
    //goes to site
    cy.visit("http://localhost:5173/");
    //finds sign up button and clicks it
    cy.contains("Sign Up!").click();
    //finds username input box and types email
    cy.get("input[name=username]").type("test999@test.com");
    //finds password input box and inputs password and presses enter(submit) after
    cy.get("input[name=password]").type("test123{enter}");
    //checks to see if there is a p tag and if it contains the email of the user
    cy.get("p").should("contain", "Signed In as test@test.com");
    //signs out after running the above
    cy.contains("Sign Out").click();
  });
});

describe("After login, page should display 37 species of characters", () => {
  it("logs in and checks for number of species", function () {
    //goes to site
    cy.visit("http://localhost:5173/");
    //finds username input box and types email
    cy.get("input[name=username]").type("test@test.com");
    //finds password input box and inputs password and presses enter(submit) after
    cy.get("input[name=password]").type("test123{enter}");
    //checks to see if there are 37 occurences of the li tag
    cy.get("li").should("have.length", 37);
    //signs out after running the above
    cy.contains("Sign Out").click();
  });
});

describe("After login, user is able to add to favourites list", () => {
  it("logs in and checks favourite list length and then clicks favourite button and favourite list length should increase by 1", function () {
    //goes to site
    cy.visit("http://localhost:5173/");
    //finds username input box and types email
    cy.get("input[name=username]").type("test@test.com");
    //finds password input box and inputs password and presses enter(submit) after
    cy.get("input[name=password]").type("test123{enter}");
    //gets the current favourite list length and remembers that length
    cy.get(".favouritesList > li")
      .its("length")
      .then((length) => {
        cy.contains("Favourite!").click();
        //clicks one of buttons to add a favourite species and then checks the original list length updates to length + 1
        cy.get(".favouritesList > li").should("have.length", length + 1);
      });
    //signs out after running the above
    cy.contains("Sign Out").click();
  });
});

describe("After login, user is able to delete from favourites list", () => {
  it("logs in and checks favourite list length and then clicks delete button and favourite list length should decrease by 1", function () {
    //goes to site
    cy.visit("http://localhost:5173/");
    //finds username input box and types email
    cy.get("input[name=username]").type("test@test.com");
    //finds password input box and inputs password and presses enter(submit) after
    cy.get("input[name=password]").type("test123{enter}");
    //gets the current favourite list length and remembers that length
    cy.get(".favouritesList > li")
      .its("length")
      .then((length) => {
        cy.contains("Remove Favourite!").click();
        //clicks one of buttons to add a favourite species and then checks the original list length updates to length + 1
        cy.get(".favouritesList > li").should("have.length", length - 1);
      });
    //signs out after running the above
    cy.contains("Sign Out").click();
  });
});
