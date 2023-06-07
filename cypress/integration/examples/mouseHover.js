//cypress - spec
/// <reference types = "Cypress"/>

describe('My Sixth Test Suite',function(){

    it('Handle Mouse Hover',function(){
    // When hover mouse It will display menu
    cy.visit("https://rahulshettyacademy.com/AutomationPractice/#/")

    /* Run as method 1. Hover the mouse using Show Jquery method and click the hidden element

    //Show is a Jquery method is used to visible the hidden element. ivoke is a function to invoke Juery method in Cypress
    //get method shows error since mousehover is the grant parent of TOP. If u inspect and check class mouse-hover-content is the parent of TOp
     //cy.get('#mousehover').invoke('show')
     cy.get('div.mouse-hover-content').invoke('show')
    //Cick the Top menu.
    cy.contains('Top').click()
    //Get the current URL and verify is correctly load the Top URL
    cy.url().should('include','top')

    */
   /*
    Run method 2: Without pointing Mouse hover just do click. Shows error element in not visible
    cy.contains('Top').click()
    cy.url().should('include','top')

    */
   
    //Run method3: Use force method to click invisble element
    cy.contains('Top').click({force: true})
    cy.url().should('include','top')

    })
})
