import { AppComponent } from "./app.component";

describe('ApplicationListComponent', () => {
  it('should load the component', () => {
    cy.mount(AppComponent, {
      declarations: [AppComponent],
    });
  });

  it('should load the component name', () => {
    cy.mount(AppComponent, {
      declarations: [AppComponent]
    });
    cy.get('[data-cy="get-comp-name"]').click();
  });
});
