//cypress - spec
/// <reference types = "Cypress"/>

/// <reference types= "cypress-iframe"/>

import "cypress-iframe"

describe('My Ningth Test Suite - Handles data from fixtures',function(){

    before(function(){
        //runs once before test. Before all It blocks
        //se need to resolve since we access data file
        cy.fixture('example').then(function(data)
        {
            this.data=data
        //we canot access name, gender from example file in entire program. Scope of the variabe finished with in this block.
        //Since we use this keyword to assign value and use in entire program

        })

    })

    it('Handle Frame',function(){

        // Type name and gender in name and gender textbox
     
        cy.visit("https://rahulshettyacademy.com/angularpractice/")

        // This below get is not working since ng class can be change during run time. So use name attribute
        //cy.get(":nth-child(1) > .form-control").type("Bop")
        //cy.get("input[name='name']:nth-child(2)").type("Bop")
        //cy.get('select').select("Female")
        //we added key value in fixtures/example.json
        cy.get("input[name='name']:nth-child(2)").type(this.data.name)
        cy.get('select').select(this.data.gender)

        //Validation
        //While type name It automatically filled in two way data binding. Verify two names are same
        cy.get(':nth-child(4) > .ng-untouched').should('have.value', this.data.name)
        // Above will be done, resolving promise and use text 
        // Vaidating min lenth property shoud be in 2, This can be done using prop(). Like get the text then check the Property
        cy.get("input[name='name']:nth-child(2)").should('have.attr', 'minlength','2')
        //Vaidating entrepruner is disabled
        cy.get('#inlineRadio3').should('be.disabled')

        cy.pause()

        // shop any product and one or more products.
        //Click ths shop button
        cy.get(':nth-child(2) > .nav-link').click()

        //selectProduct is a command which is added in support/command.js
        //cy.selectProduct("Blackberry")
        //cy.selectProduct("Nokia Edge")

        //To use again and again we add the products in array format in fixtures/example.json and cal
        //Now we have added in Example.json but we shoud iterate all the values in the select product
        
        this.data.productName.forEach(function(element){
            cy.selectProduct(element)

        });


        /*
        //Click on Blackberry - Statically
        cy.get('h4.card-title').each(($el, index, $list) => {
            if($el.text().includes('Blackberry'))
            {
                cy.get('button.btn.btn-info').eq(index).click()
            }

        } )
        */
    })

})

