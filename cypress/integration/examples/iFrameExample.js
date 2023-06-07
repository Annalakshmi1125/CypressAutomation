//cypress - spec
/// <reference types = "Cypress"/>

/// <reference types= "cypress-iframe"/>

import "cypress-iframe"

describe('My Eighth Test Suite',function(){

    it('Handle Frame',function(){
    // When hover mouse It will display menu
    cy.visit("https://rahulshettyacademy.com/AutomationPractice/#/")
    // Load below frame to work with in the frame
    cy.frameLoaded('#courses-iframe')
    //Switch into iframe mode and Cick mentorship. Using find we can find the link
    cy.iframe().find("a[href*='mentorship']").eq(0).click()
    //Now verify Mentorship has two entries
    cy.iframe().find("h1[class*'pricing-title']").should('have.length',2)

    })
})
