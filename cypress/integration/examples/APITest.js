describe('My Twelth Test Suite',function(){

    it('API Test POST GET',function(){
        //cy.request(method,url,body)
        cy.request('POST','http://216.10.245.166/Library/Addbook.php',
        {
            "name":"Java",
            "isbn":"bcdswwww",
            "aisle":"2271",
            "author":"John foe"
        }).then(function(response){
            expect(response.body).to.have.property('Msg','successfully added')
            expect(response.status).to.equal(200)
    
        })
    })

})