/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function () {
    beforeEach(function () {
        cy.visit('./src/index.html')
    })

    it('verifica o título da aplicação', function () {

        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })


    //******************************** INPUT E CLICK ************************************\\

    it('Preenche campos obrigatórios e envia o formulário', function () {

        const longText = 'Teste, teste, teste, Teste, teste,Teste, teste,Teste, teste,Teste,teste'

        cy.get('#firstName').type('Matheus')
        cy.get('#lastName').type('Reinert')
        cy.get('#email').type('matheus.reinert@gmail.com')
        cy.get('#open-text-area').type(longText, { delay: 0 })
        cy.get('button[type="submit"]').click()

        cy.get('.success').should('be.visible')

    })


    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function () {

        cy.get('#firstName').type('Matheus')
        cy.get('#lastName').type('Reinert')
        cy.get('#email').type('matheus.reinert@gmail,com')
        cy.get('#open-text-area').type('queijo', { delay: 0 })
        cy.get('button[type="submit"]').click()

        cy.get('.error').should('be.visible')

    })

    it('Campo telefone continua vazio quanto preenchido com valor não numérico', function () {

        cy.get('#phone')
            .type('abcdef')
            .should('have.value', '')

    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function () {

        cy.get('#firstName').type('Matheus')
        cy.get('#lastName').type('Reinert')
        cy.get('#email').type('matheus.reinert@gmail.com')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('queijo', { delay: 0 })
        cy.get('button[type="submit"]').click()

        cy.get('.error').should('be.visible')

    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function () {

        cy.get('#firstName').type('Matheus').should('have.value', 'Matheus').clear()
        cy.get('#lastName').type('Reinert').should('have.value', 'Reinert').clear()
        cy.get('#email').type('matheus.reinert@gmail.com').should('have.value', 'matheus.reinert@gmail.com').clear()
        cy.get('#phone').type('40028922').should('have.value', '40028922').clear()

    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function () {


        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')

    })

    it('envia o formulario com sucesso usando um comando customizado', function () {

        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.success').should('be.visible')
    })

    //******************************** SELECT ************************************\\

    it('seleciona um produto (YouTube) por seu texto', function () {
        cy.get('#product')
            .select('YouTube')
            .should('have.value', 'youtube')
    })

    it('seleciona um produto (Mentoria) por seu valor (value)', function () {
        cy.get('#product')
            .select('mentoria')
            .should('have.value', 'mentoria')
    })

    it('seleciona um produto (Blog) por seu índice', function () {
        cy.get('#product')
            .select(1)
            .should('have.value', 'blog')
    })

    //*********************************** CHECKBOX **************************************\\

    it('marca o tipo de atendimento "Feedback"', function () {
        cy.get('input[type="radio"][value="feedback"]')
            .check()
            .should('have.value', 'feedback')
    })

    it('marca cada tipo atendimento', function () {
        cy.get('input[type="radio"]')
            .should('have.length', 3)
            .each(function ($radio) {
                cy.wrap($radio).check()
                cy.wrap($radio).should('be.checked')
            })
    })

    it('marca cada tipo atendimento', function () {
        cy.get('input[type="checkbox"]')
            .check()
            .should('be.checked')
            .last()
            .uncheck()
            .should('not.be.checked')

    })

    //***************************** ANEXAR ARQUIVO ********************************\\

    it('seleciona um arquivo da pasta fixtures', function () {
        cy.get('#file-upload')
            .should('not.have.value')
            .selectFile('cypress/fixtures/example.json')
            .should(function ($input) {
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })

    it('seleciona um arquivo simulando um drag-and-drop', function () {
        cy.get('#file-upload')
            .should('not.have.value')
            .selectFile('cypress/fixtures/example.json', { action: 'drag-drop'})
            .should(function ($input) {
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function () {
        
        cy.fixture('example.json').as('sampleFile')

        cy.get('#file-upload')
            .should('not.have.value')
            .selectFile('@sampleFile')
            .should(function ($input) {
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })


    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function () 
    {
        cy.get('#privacy a').should('have.attr', 'target', '_blank')
    })

    it('acessa a página da política de privacidade removendo o target e então clicanco no link', function () 
    {
        cy.get('#privacy a')
        .invoke('removeAttr', 'target')
        .click()

        cy.contains('Talking About Testing').should('be.visible')
    })
})
