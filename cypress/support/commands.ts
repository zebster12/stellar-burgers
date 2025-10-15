// cypress\support\commands.ts
// /// <reference types="cypress" />

import type {} from './commands';

const URL = 'https://norma.nomoreparties.space/api';

Cypress.Commands.add('mockLogin', (): void => {

  cy.intercept('POST', '**/auth/login', { fixture: 'login' }).as('postLogin');
  cy.intercept('GET', '**/auth/user', { fixture: 'user' }).as('getUser');
  cy.intercept('POST', '**/orders', { fixture: 'order' }).as('order');
  window.localStorage.setItem(
      'refreshToken',
      JSON.stringify('test-refreshToken')
  );
  cy.setCookie('accessToken', 'test-accessToken');
  cy.visit('/');
});

Cypress.Commands.add('clearMemory', (): void => {
  cy.clearLocalStorage();
  cy.clearCookies();
});


Cypress.Commands.add('getBySelId', (
  selector: string,
  childSelector?: string,
  options?: Partial<Cypress.Loggable & Cypress.Timeoutable & Cypress.Withinable & Cypress.Shadow>
) => {
  const fullSelector = `[data-testid=${selector}]${childSelector ? ' ' + childSelector : ''}`;
  return cy.get(fullSelector, options);
});
