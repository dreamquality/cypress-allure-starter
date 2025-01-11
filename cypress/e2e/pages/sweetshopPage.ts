/// <reference types="cypress" />

class SweetshopPage {

    get navbarToggler() { return cy.get('.navbar-toggler') }
    get basketLink() { return cy.get('a[href="/basket"]') }




    public launchApplication() {
        cy.visit('/')
    }

    public addToBasket(index: number = 0) { 
        return cy.get(`[data-id="${index}"]`).click().wait(500);
    }
    
    public openNavbar() {
        this.navbarToggler.click()
    }
    
    public clickOnBasket() {
        this.basketLink.click()
    }
    
    public validateProductTitlePriceAndQuantity(number:number, productTitle: string,productPrice: string, quantity: string) {
        cy.contains('h6', productTitle).then($el => {
            cy.softAssert($el.text(), productTitle, `Product title should be "${productTitle}"`);
        });
        cy.contains('h6', productTitle).then($el => {
            cy.softAssert($el.is(':visible'), true, 'Product visibility should be true');
        });
        cy.contains('span', productPrice).then($el => {
            cy.softAssert($el.text(), productPrice, `Product price should be "${productPrice}"`);
        });
        cy.contains('span', productPrice).then($el => {
            cy.softAssert($el.is(':visible'), true, 'Product price visibility should be true');
        });
        cy.contains('small', `x ${quantity}`).then($el => {
            cy.softAssert($el.text(), `x ${quantity}`, `Product quantity should be "x ${quantity}"`);
        });
        cy.contains('small', `x ${quantity}`).then($el => {
            cy.softAssert($el.is(':visible'), true, 'Product quantity visibility should be true');
        });
    }
}

export const sweetshopPage: SweetshopPage = new SweetshopPage()