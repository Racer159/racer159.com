describe('Accessibility Test', () => {
  it('feat: home meets base wcag requirements', () => {
    cy.visit('/');
    cy.wait(250); // Wait for animations to finish
    cy.injectAxe();
    cy.checkA11y();
  });

  it('feat: developer mode meets base wcag requirements', () => {
    cy.visit('/developer');
    cy.wait(250); // Wait for animations to finish
    cy.injectAxe();
    cy.checkA11y();
  });

  it('feat: privacy policy meets base wcag requirements', () => {
    cy.visit('/privacy');
    cy.wait(250); // Wait for animations to finish
    cy.injectAxe();
    cy.checkA11y();
  });

  it('feat: info page meets base wcag requirements', () => {
    cy.visit('/info');
    cy.wait(250); // Wait for animations to finish
    cy.injectAxe();
    cy.checkA11y();
  });
});
