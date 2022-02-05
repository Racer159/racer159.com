describe('Accessibility Test', () => {
  it('feat: home meets base wcag requirements', () => {
    cy.visit('/');
    cy.injectAxe();
    cy.checkA11y();
  });

  it('feat: developer mode meets base wcag requirements', () => {
    cy.visit('/developer');
    cy.injectAxe();
    cy.checkA11y();
  });
});
