describe('New configs', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
      .wait(3000)
      .get('[data-cy="cell2825"]')
      .click()
      .get('[data-cy="cell2826"]')
      .click()
      .get('[data-cy="cell2924"]')
      .click()
      .get('[data-cy="cell3025"]')
      .click()
      .get('[data-cy="cell3026"]')
      .click()
      .get('[data-cy="cell2927"]')
      .click()
      .get('[data-cy="cell2925"]')
      .click()
  })

  it('should be able to save the most recent configuration for later use', () => {
    cy.get('[data-cy="openSaveConfig"]')
      .click()
      .get('[data-cy="nameSavedConfig"]')
      .type('My saved config')
      .get('[data-cy="submitSavedConfig"]')
      .click()
      .get('[data-cy="openLoadConfig"]')
      .click()
      .get('[data-cy="My saved config2"]')
      .should('have.text', 'My saved config')
  })

  it('should have \'Untitled\' be the default title of any newly saved config', () => {
    cy.get('[data-cy="openSaveConfig"]')
      .click()
      .get('[data-cy="submitSavedConfig"]')
      .click()
      .get('[data-cy="openLoadConfig"]')
      .click()
      .get('[data-cy="Untitled2"]')
      .should('have.text', 'Untitled')
  })

  it('should be able to cancel creation of saved config at any point during its initial creation', () => {
    cy.get('[data-cy="openSaveConfig"]')
      .click()
      .get('[data-cy="nameSavedConfig"]')
      .type('My saved config')
      .get('[data-cy="cancelSaveConfig"]')
      .click()
      .get('[data-cy="openLoadConfig"]')
      .click()
      .get('[data-cy="My saved config2"]')
      .should('not.exist')
  })
})
