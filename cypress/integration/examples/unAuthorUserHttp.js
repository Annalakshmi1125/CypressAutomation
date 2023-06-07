//cypress - spec
/// <reference types = "Cypress"/>

//const { should } = require("chai")

describe('My eleventh Test Suite',function(){

    it('Modify/Mock HTTP Request-Change Author name in the HTTP request while click View ibrary',function(){

        cy.visit("https://rahulshettyacademy.com/angularAppdemo/")

        //cy.intercept(method, url, routeHandler).routehandler (req)is having data of method,url 
        cy.intercept('GET','https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=shetty',
        (req)=>
        {
            //we are changing original url to another url author name sivathmika for (req)
            req.url="https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=malhotra"

            //continue will hit the server with modified user and get te reponse object (res)
            req.continue((res)=>
            {
                //res object yield the status code
                //verify the response of data should be 403 error
                //expect(res.statusCode).to.equal(403)
                //expect(res.statusCode).to.equal(403)

            })
        } ).as("dummyUrl")
         cy.get("button[class='btn btn-primary']").click()
        cy.wait('@dummyUrl')
    })

})