describe('When: I use the reading list feature', () => {
  beforeEach(() => {
    cy.startAt('/');
  });

  it('Then: I should see my reading list', () => {
    cy.get('[data-testing="toggle-reading-list"]').click();

    cy.get('[data-testing="reading-list-container"]').should(
      'contain.text',
      'My Reading List'
    );
  });

  it('Then: I should see book marked as finished', () => {
    cy.get('input[type="search"]').type('javascript');

    cy.get('form').submit();

    if (!(cy.get('[data-testing="book-item"]').find('button:not(:disabled)'))) return;
    cy.get('[data-testing="book-item"]').find('button:not(:disabled)').first().click();

    cy.get('[data-testing="toggle-reading-list"]').click();
    cy.get('.btn-finished-reading').click({ multiple: true });
    expect(cy.get('.finished-date')).to.exist;
  });
});