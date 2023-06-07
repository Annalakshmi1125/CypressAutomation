//cypress - spec
/// <reference types = "Cypress"/>

//const { should } = require("chai")

describe('My Tenth Test Suite',function(){

    it('Modify/Mock HTTP Request REsponse',function(){

        cy.visit("https://rahulshettyacademy.com/angularAppdemo/")

        //Syntax cy.intercept({requestobject},{responseobject})
        cy.intercept({
            //Cypress Listen for this call to made on the browser.
            method:'GET',
            url:'https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=shetty'

        },
        //Once It listen the call, Cypress let me know I want to set in real response or Mocked response.
        //Here we mock the response
        {
            //we can check the official doc for response object properties
            statusCode:200,
            body:[{
                    "book_name": "RobotFramework",
                    "isbn": "984353",
                    "aisle": "982053",

                    "book_name": "Learn Postman",
                    "isbn": "RS457",
                    "aisle": "2529856"

                }]
        }).as ('bookretrievals')
        //yeild to one variable since the result should be in bookretrieval variable

        cy.get("button[class='btn btn-primary']").click()

        //once this get is called cypress will isten that request get method and set ths response
        //you have to wait untill the intercept is solved. 
        //cy.wait('@bookretrievals')
        cy.wait('@bookretrievals').then(({request,response})=>
        {
         //Testcase: result (grid data) count should be equal to response result.
         //Length of the response array=rows of the table(result)
         //Like Front end (result grid data) and back end(json) should be equal
         //tr is selecting all the rows then response.body lenght. Y we add +1 means tr data is with row header and actual data
            cy.get('tr').should('have.length',response.body.length+1)

        })
        
      cy.get('p').should('have.text','Oops only 1 Book available')




    })

})