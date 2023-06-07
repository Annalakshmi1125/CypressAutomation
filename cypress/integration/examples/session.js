//cypress - spec
/// <reference types = "Cypress"/>

const neatCSV = require('neat-csv')
let productName

describe('My Thirteenth Test Suite',function(){

    it('Login using browser local storage-session token',async function(){
        //Call the loginAPI tat will set env token to the local
        cy.LoginAPI().then(function()
        {
        //visit url has optional arg. So we use onbeforeload() to load the token before hit the url
        cy.visit("https://rahulshettyacademy.com/client/",{

        //Onbefreload is a funtion which is used to load before visit commands work. So ony we can set
        //token to local storage. window is where url run.
            onBeforeLoad: function(window)
            {
                //Cypress.env(token) is the token which is got from command.js file
                window.localStorage.setItem('token',Cypress.env('token'))
            }
        })
    })

    //Purchase the order and verify CSV files
    //Capture the product name in the variable to compare csv file product name and thhis product name
    cy.get(".card-body b").eq(1).then(function(ele){
        productName=ele.text();

    })
    //Cick the product
    //cy.get(".cart-body button:last-of-type").eq(2).click() - It is not working since we are using below
    cy.get(':nth-child(2) > .card > .card-body > .w-10').click()
    //customized selectory
    cy.get("[routerlink*='cart']").click()
    //Click chekcout using text
    cy.contains("Checkout").click()
    //Type india in country
    //cy.get('.form-group > .input').type("Ind")
    cy.get("[placeholder*='Country']").type("Ind")
    cy.log("for loop begins")
    cy.get(".ta-results button").each(($el,index,$list)=> {
        if ($el.text() === "India"){
            //If we want to perform any action to the element which is retrived through list we need to wrap that element then perform click()
            cy.wrap($el).click()
        }
    })

    //Place Order
    cy.get(".action__submit").click({force:true});
    cy.wait(3000)
    //Click to Download order details. Downloaded csv wil be in downloaded folder
    cy.get(".order-summary button").click()

    //To parse the csv file 
    //In top we have import csv dependency
    //we have to specify dynamic path(fileFoder is used get the project directory default)
    //Readfile is a methhod is used to read the content of the file and expand the text out of it
    //It is chained yeild promise so we have to resolve

    cy.readFile(Cypress.config("fileServerFolder")+"/cypress/downloads/order-invoice_annalakshmi.ramasamyy.csv")
    .then(async function(text)
    {
        //csv is the java script object so we have to resolve promise. we can resolve using then and await(asynchronous way)
        //Whie using await u should use function name as async. We use in test level(It block)
        const csv = await neatCSV(text)
        console.log(csv)
        //It prints csv content as array with 0 index. Only one row and one value. It can be accessible now
        //To access this(We can see in the console window).csv has these array value. we have space in the property name, so we use[]
        const actualProductCSV= csv[0]["Product Name"]
        expect(productName).to.equal(actualProductCSV)


    })



    })
})

/* REsult will be

0:
    Address: "India"
    Invoice Number: "641ef733568c3e9fb13dbf65"
    Ordered By: "annalakshmi.ramasamyy@gmail.com"
	Product Description: "adidas original"
	Product Name: "adidas original"
	Product Price: "31500"
	"﻿S.No": "1"
	[[Prototype]]: Object
	length:1

    Tis whole is the object. Column field(address,invoice number,..) is the property, row field is the value
*/