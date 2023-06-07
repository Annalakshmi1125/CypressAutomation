
//cypress - spec
/// <reference types = "Cypress"/>

describe('My Third Test Suite',function(){

    it('Automate CheckBoxes',function(){
    
    //Checkboxes
  
      cy.visit("https://rahulshettyacademy.com/AutomationPractice/#/")
      //Get on checkbox and checked(clicked) then verify whether checked and then value is same
      cy.get('input#checkBoxOption1').check().should('be.checked').and ('have.value','option1')
      
      //Uncheck the checked box and verify not checked
      cy.get('input#checkBoxOption1').uncheck().should('not.be.checked')

      //Checked all the three checkboxes
      cy.get('input[type="checkbox"]').check(['option2','option3'])
      cy.get('input[type="checkbox"]').uncheck().should('not.be.checked')

      //Dropdown - Dynamic and Static
      // Static Dropdowns

      cy.get('select').select('option2').should('have.value','option2')

      //Dynamic Drop down - Search ind in search box and get the India in drop down text

      cy.get('#autocomplete').type('ind')
      //Loop to get the matches elements
      cy.get('.ui-menu-item div').each(($el, index, $list) => {
        if($el.text()=="India"){
          cy.wrap($el).click()
        }
      }
      )
    cy.get('#autocomplete').should('have.value','India').clear()

/*
    
    // Search et and Ethiopia

    cy.get('#autocomplete').type('et')
      //Loop to get the matches elements
      cy.get('.ui-menu-item div').each(($el1, index, $list) => {
        if($el1.text()=="Ethiopia"){
          cy.wrap($el1).click()
        }
      }
      )
    cy.get('#autocomplete').should('have.value','Ethiopia') */


    //Invisible and visible mode and how to set with Assertion

    // Verify the text box is visible first
    cy.get('#displayed-text').should('be.visible')
    //Click Hide to disappear and verify invisible
    cy.get('#hide-textbox').click()
    cy.get('#displayed-text').should('not.be.visible')
    //Click show and verify
    cy.get('#show-textbox').click()
    cy.get('#displayed-text').should('be.visible')

    //Verify Radio Button
    cy.get('[value="radio2"]').check().should('be.visible')


  }
  )}
    )
    