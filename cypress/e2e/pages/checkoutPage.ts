/// <reference types="cypress" />

class CheckoutPage {

    get navbarToggler() { return cy.get('.navbar-toggler') }
    get basketLink() { return cy.get('a[href="/basket"]') }
    get basketCount() { return cy.get('#basketCount') }
    get standardShippingCheckbox() { return cy.get('#exampleRadios2') }
    get nameInput() { return cy.get('#name').eq(0) }
    get lastNameInput() { return cy.get('label[for="lastName"]+input') }
    get emailInput() { return cy.get('#email') }
    get addressInput() { return cy.get('#address') }
    get citySelect() { return cy.get('#city') } 
    get zipInput() { return cy.get('#zip') }
    get countrySelect() { return cy.get('#country') } 
    get cardNameInput() { return cy.get('#cc-name') }
    get cardNumberInput() { return cy.get('#cc-number') }
    get cardExpDateInput() { return cy.get('#cc-expiration') }
    get cardCvvInput() { return cy.get('#cc-cvv') }

    public openNavbar() {
        this.navbarToggler.click();
    }
    
    public clickOnBasket() {
        this.basketLink.click();
    }

    public fillName(name: string) {
        this.nameInput.type(name);
    }

    public fillLastName(lastname: string) {
        this.lastNameInput.type(lastname);
    }

    public fillEmail(email: string) {
        this.emailInput.type(email);
    }

    public fillAddress(address: string) {
        this.addressInput.type(address);
    }

    public clickOnStandardShippingCheckboxAndVerifyTotalPrice(price: string) {
        this.standardShippingCheckbox.click({force: true});
        this.validateTotalTotalPrice(price)
    }

    public selectCity(city: string) {
        this.citySelect.select(city); 
    }

    public fillZip(zip: string) {
        this.zipInput.type(zip);
    }

    public selectCountry(country: string) {
        this.countrySelect.select(country); 
    }

    public fillCardName(cardName: string) {
        this.cardNameInput.type(cardName);
    }

    public fillCardNumber(cardNumber: string) {
        this.cardNumberInput.type(cardNumber);
    }

    public fillCardExpDate(cardExpDate: string) {
        this.cardExpDateInput.type(cardExpDate);
    }

    public fillCardCvv(cardCvv: string) {
        this.cardCvvInput.type(cardCvv);
    }

    public validateProductTitlePriceAndQuantity(number:number ,productTitle: string, productPrice: string, quantity: string) {
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
    
    public validateCheckoutCurrency(currency: string) {
        cy.contains('span',`Total (${currency})`).then($el => {
            cy.softAssert($el.text(), `Total (${currency})`, `Checkout currency should be "${currency}"`);
        });
        cy.contains('span',`Total (${currency})`).then($el => {
            cy.softAssert($el.is(':visible'), true, 'Checkout currency visibility should be true');
        });
    }
    
    public validateTotalTotalPrice(value: string) {
        cy.contains('strong', value).then($el => {
            cy.softAssert($el.text(), value, `Total price should be "${value}"`);
        });
        cy.contains('strong', value).then($el => {
            cy.softAssert($el.is(':visible'), true, 'Total price visibility should be true');
        });
    }

    public validateBasketCount(count: number) {
        this.basketCount.then($el => {
            cy.softAssert($el.text(), count.toString(), `Basket count should be "${count}"`);
        });
    }

    public clickOnCheckoutBtn() {
        cy.get('button[type="submit"]').eq(0).click();
    }
}

export const checkoutPage: CheckoutPage = new CheckoutPage();