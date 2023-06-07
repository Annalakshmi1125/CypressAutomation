
//cypress - spec
/// <reference types = "Cypress"/>

describe('My Fifth Test Suite',function(){

    it('Handle Web Tables',function(){
    // Wether the price is 25 for Master selenium Automation in Simple Python language
    cy.visit("https://rahulshettyacademy.com/AutomationPractice/#/")
    // Get the course column that is in 2nd place then iterate the course column
    cy.get ('tr td:nth-child(2)').each(($el, index, $list) => {
      // All the texts is iterated and stored in text variable
      const text=$el.text()

      //Now verify the course name includes our course name Master selenium Automation in Simple Python language. We use Python keyword
      //since on course has python word
      if(text.includes("Python")){   // If true

        // We have to check the price 25. so we have get the info about 25. It is sibing of course. To find the date we use  next()
        // Correct way to use next() is using get (). We already comes into Python course tab. So do as below,
        // Get the course column again and pass the index since index should have the our course number then use next().eq get the particular index value
        //cy.get ('tr td:nth-child(2)').eq(index).next()

        //We went to next and shoud have the value and compare. cy.get ('tr td:nth-child(2)').eq(index).next().text. We couldn't apply text() after next() since text() is a jquery method. Cypress didn't resolve promise
        //we should resolve the promise
      cy.get("tr td:nth-child(2)").eq(index).next().then(function(price){
        const priceText=price.text()
        expect(priceText).to.equal('25')
      }
      )
        
      }
      
      }
    )

    })
  }
)
    