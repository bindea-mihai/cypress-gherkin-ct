import { AppComponent } from "./app.component";

describe('ApplicationListComponent', () => {
  it('should load the component', () => {
    cy.mount(AppComponent, {
      declarations: [AppComponent],
    });
  });
});
