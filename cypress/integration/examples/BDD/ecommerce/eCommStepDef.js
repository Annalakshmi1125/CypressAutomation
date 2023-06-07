/// <reference types="Cypress" />


//Run command: npx cypress run --spec cypress/integration/examples/BDD/ecommerce.feature --headed --browser chrome
//To run anyone feature: npx cypress run --env tags="@Regression" --headed --browser chrome
import HomePage from '/home/kanagaraj/Anita/CypressAutomation/cypress/integration/PageObjects/HomePage'
import ProductPage from '/home/kanagaraj/Anita/CypressAutomation/cypress/integration/PageObjects/ProductPage'
import CheckOutPage from '/home/kanagaraj/Anita/CypressAutomation/cypress/integration/PageObjects/CheckOutPage'

import { Given,When,Then} from "@badeball/cypress-cucumber-preprocessor";

const homePage=new HomePage()
const productPage=new ProductPage()
const checkOutPage=new CheckOutPage()

let name

//I open Ecommerce Page

Given('I open ecommerce page', () =>
{
    cy.visit(Cypress.env('url')+"/angularpractice/")
})

//When I add items to cart
When('I add items to cart',function(element)
{
    homePage.getShopTab().click()
    this.data.productName.forEach(function(element){
    cy.selectProduct(element)
  });
        
  productPage.getCheckOutButton().click()
})

//And Vaidate the total price
When('Vaidate the total price',()=>{
    var sum=0
    cy.get('tr td:nth-child(4) strong').each(($el, index, $list)=>{
    cy.log($el.text())
    const amount=$el.text() 
    var res=amount.split(" ")
    res=res[1].trim()
    sum=Number(sum)+Number(res)
} ).then(function(){
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

})

//Then Select the country submit and verify thank you
Then('Select the country submit and verify thank you',()=>{
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
})

//We have implemented all the above with code. Only one is missing that is We didnt import data from fixture.
//We have before()in main testIFramework.js. Cucumber also have commands to run before test
//Second scenerio. Aready Given Page here. So When I fill the form details. We are expecting send the data in tis. So use function()

When('I fill the form details',function(dataTable)
{
    // [[name,gender],[bobz,male]] result of below. Rawtable is a array of dataTable. refer note for explnation
    name=dataTable.rawTable[1][0]
    homePage.getEditBox().type(dataTable.rawTable[1][0])
    homePage.getGender().select(dataTable.rawTable[1][1])
})

//And Vaidate the form behavioural
Then('Vaidate the form behaviour', function(){
    homePage.getTwoWayDataBinding().should('have.value', name)
    homePage.getEditBox().should('have.attr', 'minlength','2')
    homePage.getEntrepreneaur().should('be.disabled')
    Cypress.config('defaultCommandTimeout',8000)
})

Then('Select the shop Page', ()=>{
    homePage.getShopTab().click()

})