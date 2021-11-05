/// <reference types="cypress" />

const PORT = process.env.PORT || 3000

describe('Pinia demo with counters', () => {
  beforeEach(() => {
    cy.visit(`http://localhost:${PORT}`)
  })

  it('works', () => {
    cy.wait(500) // wait for the JS to load
      .get('[data-testid=add-items] input')
      .type('one')
      .get('[data-testid=add-items]')
      .submit()
      .get('[data-testid=add-items] input')
      .type('two')
      .get('[data-testid=add-items]')
      .submit()
      .get('[data-testid=items] li')
      .should('contain.text', 'one')
      .should('contain.text', 'two')
      .get('[data-testid=items] li')
      .should('have.length', 2)
      .get('[data-testid=clear]')
      .click()
      .get('[data-testid=items] li')
      .should('have.length', 0)
  })
})
