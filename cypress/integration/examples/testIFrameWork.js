//cypress - spec
/// <reference types = "Cypress"/>

/// <reference types= "cypress-iframe"/>

import "cypress-iframe"
import CheckOutPage from "../PageObjects/CheckOutPage"
import HomePage from '../PageObjects/HomePage'
import ProductPage from '../PageObjects/ProductPage'

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

        const homePage=new HomePage()
        const productPage=new ProductPage()
        const checkOutPage=new CheckOutPage()

        // Type name and gender in name and gender textbox
     
        cy.visit(Cypress.env('url')+"/angularpractice/")



        // This below get is not working since ng class can be change during run time. So use name attribute
        //cy.get(":nth-child(1) > .form-control").type("Bop")
        //cy.get("input[name='name']:nth-child(2)").type("Bop")
        //cy.get('select').select("Female")
        //we added key value in fixtures/example.json
        homePage.getEditBox().type(this.data.name)
        homePage.getGender().select(this.data.gender)

        //Validation
        //While type name It automatically filled in two way data binding. Verify two names are same
        homePage.getTwoWayDataBinding().should('have.value', this.data.name)
        // Above will be done, resolving promise and use text 
        // Vaidating min lenth property shoud be in 2, This can be done using prop(). Like get the text then check the Property
        homePage.getEditBox().should('have.attr', 'minlength','2')
        //Vaidating entrepruner is disabled
        homePage.getEntrepreneaur().should('be.disabled')

        //cy.pause()

        // shop any product and one or more products.
        //Click ths shop button
        homePage.getShopTab().click()

        //selectProduct is a command which is added in support/command.js
        //cy.selectProduct("Blackberry")
        //cy.selectProduct("Nokia Edge")

        //To use again and again we add the products in array format in fixtures/example.json and cal
        //Now we have added in Example.json but we shoud iterate all the values in the select product
        
        this.data.productName.forEach(function(element){
            cy.selectProduct(element)

        });
       
        //To click Checkout
        productPage.getCheckOutButton().click()

        var sum=0

        cy.get('tr td:nth-child(4) strong').each(($el, index, $list)=>{
            cy.log($el.text())
        //Now the amount is displayed as $. 50000, $. 60000 like this. First we have to remove the whitespace, $ and dot. Then convert this into integer
        //Then perform sum operation. spit is used to spit before and after space

        const amount=$el.text()

        // To resuse the res variable, It is declared as var 
        var res=amount.split(" ")
        res=res[1].trim()
        //Now it shows the result as amount correctly. But in string, We have to tell tis as a integer. Then only cypress sum these
        // res is a string, we should convert as integer then ony we can sum. Otherwise It will result as 0
        sum=Number(sum)+Number(res)
        }

        //resolve the promise using then since It is JS method.  It will be run on assynchronous mode and print sum 0 which is iniatized
    
        ).then(function(){
            cy.log(sum)
        }
        )
        cy.get('h3 strong').then(function(element)
        {
            const amount=element.text()
            var res=amount.split(" ")
            var total=res[1].trim()
            cy.log("Total Amount",total)
            expect(Number(total)).to.equal(sum)
        })
        checkOutPage.getCheckOutButton().click()

        
        cy.get('#country').type('India')
        cy.get('.suggestions > ul > li > a').click()
        cy.get('#checkbox2').click({force:true})
        cy.get('input[type="submit"]').click()
        //cy.get('.alert').should('have.text',"Success! Thank you! Your order will be delivered in next few weeks :-).")
        cy.get('.alert').then(function(element){
            const actualText=element.text()
            expect(actualText.includes('Success')).to.be.true
        })
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

