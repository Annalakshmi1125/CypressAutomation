//cypress - spec
/// <reference types = "Cypress"/>

describe('My Seventh Test Suite',function(){

    it('Handle Child Window',function(){
    // When hover mouse It will display menu
    cy.visit("https://rahulshettyacademy.com/AutomationPractice/#/")

    //Get the button ID and then target href. Prop() method is used to get the property of element. It is a Jquery method so should resove the promise

    cy.get('#opentab').then(function(el){
        const url=el.prop('href')
        cy.log(url)
        cy.visit(url)
    }
    )



    })
})

