describe('High scores', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
      .wait(3000)
      .get('[data-cy="cell2826"]')
      .click()
      .get('[data-cy="cell3025"]')
      .click()
      .get('[data-cy="cell3026"]')
      .click()
      .get('[data-cy="cell2927"]')
      .click()
      .get('[data-cy="cell2825"]')
      .click()
      .get('[data-cy="cell2924"]')
      .click()
  })

  it('should be able to save a new high score if that score is equal to or greater than the lowest score currently on the high scores board', () => {
    cy.get('[data-cy="cell2925"]')
      .click()
      .get('[data-cy="beginGame"]')
      .click()
      .wait(1700)
      .get('[data-cy="namePlayer"]')
      .should('be.visible')
  })

  it('should not be able to save a new score if that score is less than the lowest score currently on the high scores board', () => {
    cy.get('[data-cy="beginGame"]')
      .click()
      .wait(500)
      .get('[data-cy="namePlayer"]')
      .should('not.exist')
  })

  it('should be able to enter in a player name to attach to the new high score', () => {
    cy.get('[data-cy="cell2925"]')
      .click()
      .get('[data-cy="beginGame"]')
      .click()
      .wait(1700)
      .get('[data-cy="namePlayer"]')
      .type('top score')
      .get('[data-cy="submitHighScore"]')
      .click()
      .get('[data-cy="highScore0"]')
      .should('include.text', 'top score')
  })

  it('should default to \'ANONYMOUS USER\' if no player name is entered', () => {
    cy.get('[data-cy="cell2925"]')
      .click()
      .get('[data-cy="beginGame"]')
      .click()
      .wait(1700)
      .get('[data-cy="submitHighScore"]')
      .click()
      .get('[data-cy="highScore0"]')
      .should('include.text', 'ANONYMOUS USER')
  })
})
