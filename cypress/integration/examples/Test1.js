//cypress - spec
/// <reference types = "Cypress"/>

describe('My First Test Suite',function(){

  it('My First Testcase',function(){

    cy.visit("https://rahulshettyacademy.com/seleniumPractise/#/")
    cy.get('.search-keyword').type('ca')
    //wait 2 second
    cy.wait(2000)
    //Selenium get hit url in browser, cypress get acts like findelement of selenium
    cy.get('.product:visible').should('have.length',4)
    // Without using Visible
    cy.get('.product').should('have.length',5)
    //Using Parent child chaining we can verify the length without visible. Get the whole class of a elements then apply search on tis particular class
    cy.get('.products').as('productlocator')
    cy.get('@productlocator').find('.product').should('have.length',4)
    //Click Particular product Add to cart
    cy.get('@productlocator').find('.product').should('have.length',4).eq(2).contains('ADD TO CART').click().then(function(){
      console.log('sf')
    })
    
    // Add Cashews in Cart
  cy.get('@productlocator').find('.product').each(($el, index, $list) => {

    const testVeg = $el.find('h4.product-name').text()
    if(testVeg.includes('Cashews')){
      cy.wrap($el).find('button').click()
    }
  })

  /* Below shoud show the error to resolve this promise or not since we are assigning to variable. Shows error as logo.text is not a function
  const logo = cy.get('.brand')
  cy.log(logo.text())
  */
  
  //Assert if the LOGO text is correctly displayed
  cy.get('.brand').should('have.text','GREENKART')


  // To resolve above we use then... This is to print GREENKART in log
  cy.get('.brand').then(function(logoelement){
   cy.log(logoelement.text())
  })

  //Text is not a cypress command to grap the element from the locator. It is JQuery method that cypress supports jquery
  //cy.log(cy.get('.brand').text())
}
)}
  )
  