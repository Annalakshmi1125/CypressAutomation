
//cypress - spec
/// <reference types = "Cypress"/>

describe('My Second Test Suite',function(){

    it('ADD Cashews to CART and Proceed, Pace Order',function(){
  
      cy.visit("https://rahulshettyacademy.com/seleniumPractise/#/")
      cy.get('.search-keyword').type('ca')
      //wait 2 second
      cy.wait(2000)
      //Using Parent child chaining we can verify the length without visible. Get the whole class of a elements then apply search on tis particular class
      cy.get('.products').as('productlocator')
      // Add Cashews in Cart
    cy.get('@productlocator').find('.product').each(($el, index, $list) => {
  
      const testVeg = $el.find('h4.product-name').text()
      if(testVeg.includes('Cashews')){
        cy.wrap($el).find('button').click()
      }
    })

    cy.get('.cart-icon > img').click()
    cy.contains('PROCEED TO CHECKOUT').click()
    cy.contains('Place Order').click()

  }
  )}
    )
    