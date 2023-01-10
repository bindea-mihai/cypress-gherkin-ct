import {Given, Then} from '@badeball/cypress-cucumber-preprocessor'

import { AppComponent } from 'src/app/app.component';

Given ('I load the app component', ()=>{
  cy.mount(AppComponent);
});

Then ('I want to see my hello message', ()=>{
  cy.get('[data-cy]="app-component_hello-message"').should('be','yep, it works');
});
