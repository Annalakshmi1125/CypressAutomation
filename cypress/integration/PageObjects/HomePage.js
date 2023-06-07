class HomePage
{
    //To get name
    getEditBox()
    {
        return cy.get("input[name='name']:nth-child(2)")
    }

    //Twoway Data Binding
    getTwoWayDataBinding()
    {
        return cy.get(':nth-child(4) > .ng-untouched')
    }

    //Gender
    getGender()
    {
        return cy.get('select')
    }

    //Entreprenaur
    getEntrepreneaur()
    {
        return cy.get('#inlineRadio3')
    }

    //GetShop
    getShopTab()
    {
        return cy.get(':nth-child(2) > .nav-link')
    }
}

export default HomePage;
