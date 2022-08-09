Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function() {
  cy.get('#firstName').type('Everaldo'),
  cy.get('#lastName').type('Zanin')
  cy.get('#email').type('everaladozanin@teste.com')
  cy.get('#open-text-area').type('Teste')
  cy.contains('button', 'Enviar').click()
})