describe('Home Page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('feat: loads primary home page content', () => {
    cy.contains('Racer159');
    cy.contains('Wayne Starr');
    cy.contains('Software Engineer');
  });
});
