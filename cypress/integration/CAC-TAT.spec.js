/// <reference types="Cypress" />


describe('Central de Atendimento ao Cliente TAT', function() {
beforeEach(function() {
    cy.visit('./src/index.html');
})
it('verifica o titulo da aplicação', function() {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT');
})

it('preenche os campos obrigatórios e envia o formulário', function() {
    const LongText = 'Teste, teste, teste, teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste'
    
    cy.get('#firstName').type('Everaldo'),
    cy.get('#lastName').type('Zanin')
    cy.get('#email').type('everaladozanin@teste.com')
    cy.get('#open-text-area').type(LongText, {delay: 0})
    cy.contains('button', 'Enviar').click()

    cy.get('.success').should('be.visible')
})

it('exibe mensagem de erro ao submeter o formulário com um emailcom formatação inválida', function() {
    cy.get('#firstName').type('Everaldo'),
    cy.get('#lastName').type('Zanin')
    cy.get('#email').type('everaladozanin@teste,com')
    cy.get('#open-text-area').type('Teste')
    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')
})

it('campo telefone continua vazio quando preenchido com valor não-numérico', function() {
    cy.get('#phone')
    .type('abcdefghij')
    .should('have.value', '')
})

it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {
    cy.get('#firstName').type('Everaldo'),
    cy.get('#lastName').type('Zanin')
    cy.get('#email').type('everaladozanin@teste.com')
    cy.get('#phone-checkbox').check() //Função de sempre marcar
    cy.get('#open-text-area').type('Teste')
    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')
})

it('preeenche e limpa os campos nome, sobrenome, email e telefone', function() {
    cy.get('#firstName')
      .type('Everaldo')
      .should('have.value', 'Everaldo')
      .clear()
      .should('have.value', '')
      cy.get('#lastName')
      .type('Zanin')
      .should('have.value', 'Zanin')
      .clear()
      .should('have.value', '')
      cy.get('#email')
      .type('everladozanin@teste.com')
      .should('have.value', 'everladozanin@teste.com')
      .clear()
      .should('have.value', '')
      cy.get('#phone')
      .type('1234567890')
      .should('have.value', '1234567890')
      .clear()
      .should('have.value', '')

    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function() {
        cy.get('button[type="submit"]').click()

        cy.get('.error').should('be.visible')
    })

    it('envia o formulário com sucesso usando um comando customizado', function() {
        cy.fillMandatoryFieldsAndSubmit()
    
        cy.get('.success').should('be.visible')
    })

    it('seleciona um produto (YouTube) por seu texto', function() {
        cy.get('#product')
        .select('YouTube')
        .should('have.value', 'youtube')
    })
    
    it('seleciona um produto (Mentoria) por seu valor (value)', function() {
        cy.get('#product')
        .select('mentoria')
        .should('have.value', 'mentoria')
    })
    
    it('seleciona um produto (Blog) por seu indice', function() {
        cy.get('#product')
        .select(1)
        .should('have.value', 'blog')
    })

    it('marca o tipo de atendimento "Feedback"', function() {
    cy.get('input[type="radio"][value="feedback"]')
      .check()
      .should('have.value', 'feedback')
    })

    it('marca cada tipo de atendimento', function() {
        cy.get('input[type="radio"]')
        .should('have.length', 3) //É o cumprimento p/ verificar se tem 3 mesmo (verificação intermediária p/ ver qtos tinha)
        .each(function($radio) { //Passar por cada um dos elementos
            cy.wrap($radio).check() //Empacotar cada elemento e poder mandar comandos do Cy (check, should,etc)
            cy.wrap($radio).should('be.checked')//Ex: marca o primeiro e verifica que foi marcado e assim por diante
        })
    })

    it('marca ambos checkboxes, depois desmarcao último', function() {
        cy.get('input[type="checkbox"]')
        .check() //Marcou os 2 checkbox (Função que sempre marca)
        .should('be.checked')//Verificou que ambos estão marcados
        .last() //E depois o último foi desmarcado
        .uncheck()//Para garantir que está desmarcando
        .should('not.be.checked')//Verifica que não está mais checado
    })

    it('seleciona um arquivo da pasta', function() {
        cy.get('input[type="file"]')//add o arquivo no input
        .should('not.have.value')// Verificar que não tem nenhum valor marcado (Verificação intermediária)
        .selectFile('./cypress/fixtures/example.json')//add um example.json (caminho relativo)
        .should(function($input) {
          expect($input[0].files[0].name).to.equal('example.json')//Verificou que example.json é o example.jason
        }) // Passou o arquivo que a gente quiz selecionar
    })

    it('seleciona um arquivo simulando um drag-and-drop', function() {
        cy.get('input[type="file"]')
        .should('not.have.value')
        .selectFile('./cypress/fixtures/example.json', { action: 'drag-drop'})//Simulando que está arrastando um arquivo para o nosso input
        .should(function($input) {
            expect($input[0].files[0].name).to.equal('example.json')
    }) // Passou o arquivo e como 2º argumento passou um drag-drop para simular que o arquivo foi arrastado
})

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function() {
        cy.fixture('example.json').as('sampleFile')//Ex para o nome do arquivo
        cy.get('input[type="file"]')
        .selectFile('@sampleFile')//Colocar @ qdo for utilizar o nome do arquivo c/ ex
        .should(function($input) {
          expect($input[0].files[0].name).to.equal('example.json')
        })
    })

    it('verifica que a politica de privacidade abre em outra aba sem a necessidade de um clique', function() {
        cy.get('#privacy a').should('have.attr', 'target', '_blank')
    })

    it('acessa a página da politica de privacidade removendo o target e então clicando no link', function() {
        cy.get('#privacy a')
        .invoke('removeAttr', 'target')
        .click()

        cy.contains('Talking About Testing').should('be.visible')
    })
})
