
//cypress - spec
/// <reference types = "Cypress"/>

describe('My Fourth Test Suite',function(){

    it('Handle Popups',function(){
    
    //How Cypress is auto accepting Popup
  
      cy.visit("https://rahulshettyacademy.com/AutomationPractice/#/")
      
      cy.get('#alertbtn').click()
      cy.get('input[value="Confirm"]').click()
      
    //When the Alert is open, in general event called Window alert that triggers in the browser
    //Window:alert will be captured the popup ten we can get the text. 
    cy.on('window:alert', (str) => {
        expect(str).to.equal('Hello , share this practice page and share your knowledge')
    }
    )

    //Confirm
    cy.on('window:confirm', (str) => {
        expect(str).to.equal('Hello , Are you sure you want to confirm?')
    }
    )

    //REmove attribute to open another link in the same window rather opening in the anoter window
    //get the button
    cy.get('#opentab').invoke('removeAttr','target').click()

    //To open child Window
    //cy.get('#opentab').click()
    cy.url().should('include','rahulshettyacademy')
    cy.go('back')
  }
  )}
    )
    