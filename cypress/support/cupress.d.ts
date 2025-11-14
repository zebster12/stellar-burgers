import './commands';

declare global {
  namespace Cypress {
    interface Chainable {
      mockLogin(): void;
      clearMemory(): void;

      getBySelId(
        selector: string,
        childSelector?: string,
        options?: Partial<Cypress.Loggable & Cypress.Timeoutable & Cypress.Withinable & Cypress.Shadow>
      ): Chainable<JQuery<HTMLElement>>;
    }
  }
}
