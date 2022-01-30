describe('Initial game configuration', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
      .wait(3000)
      .get('[data-cy="cell2825"]')
      .click()
  })

  it('should be able to manually toggle inactive cells into an active state', () => {
    cy.get('[data-test="cell2825a"]')
      .should('not.have.class', 'hidden')
  })

  it('should be able to manually toggle active cells into an inactive state', () => {
    cy.get('[data-test="cell2825a"]')
      .click()
      .get('[data-test="cell2825a"]')
      .should('have.class', 'hidden')
  })
})

describe('Game controls', () => {
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
      .get('[data-cy="beginGame"]')
      .click()
  })

  it('should be able to begin the game, once one or more cells have been manually toggled to their active state', () => {
    cy.get('[data-test="cell2824a"]')
      .should('not.have.class', 'hidden')
      .get('[data-test="cell3024a"]')
      .should('not.have.class', 'hidden')
  })

  it('should be able to pause the game', () => {
    cy.get('[data-test="cell2824a"]')
      .should('not.have.class', 'hidden')
      .get('[data-cy="beginGame"]')
      .click()
      .get('[data-test="cell2925a"]')
      .should('have.class', 'hidden')
  })

  it('should be able to end the game and clear the board of all currently active cells', () => {
    cy.get('[data-cy="endGame"]')
      .click()
      .get('[data-test="cell2925a"]')
      .should('be.visible')
      .get('[data-test="cell2924a"]')
      .should('have.class', 'hidden')
  })
})
