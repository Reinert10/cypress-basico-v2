
Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function() {

        cy.get('#firstName').type('Matheus')
        cy.get('#lastName').type('Reinert')
        cy.get('#email').type('matheus.reinert@gmail.com')
        cy.get('#open-text-area').type('queijo', {delay:0})
        cy.get('button[type="submit"]').click()
})
