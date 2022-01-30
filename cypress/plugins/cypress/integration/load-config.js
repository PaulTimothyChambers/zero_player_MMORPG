describe('Load configs', () => {
  beforeEach(()=> {
    cy.visit('http://localhost:3000/')
      .wait(1000)
      .get('[data-cy="openLoadConfig"]')
      .click()
  })

  it('should be able to delete any saved configs', () => {
    cy.get('[data-cy="removeConfig0"]')
      .click()
      .get('[data-cy="Preset One0"]')
      .should('not.exist')
  })

  it('should be able to load a saved config to the game board', () => {
    cy.get('[data-cy="loadConfigToBoard1"]')
      .click()
      .get('[data-test="cell2443a"]')
      .should('be.visible')
  })
})
