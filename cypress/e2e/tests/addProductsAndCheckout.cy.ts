import { sweetshopPage } from '../pages/sweetshopPage'
import { checkoutPage } from '../pages/checkoutPage'

interface Product {
    name: string;
    quantity: string;
    price: string;
}

function calculateTotalPrice(items: any) {
    return items.reduce((total: any, item: any) => {
        const price = parseFloat(item.price.replace('£', ''));
        const quantity = parseInt(item.quantity, 10);
        return total + price * quantity;
    }, 0).toFixed(2); 
}


describe("SweetShop Basket and Checkout Tests", () => {
    beforeEach(function () {
        sweetshopPage.launchApplication();
        cy.fixture('products').as('products');
    });
    after(() => {
        cy.assertAll();
    });

    it("Add different products to basket and verify them on the checkout page, switch delivery to standard shipping", function () {
        this.products.forEach((product: Product, index: number) => {
            sweetshopPage.addToBasket(index+1);
        });
        sweetshopPage.clickOnBasket()
        this.products.forEach((product: Product, index: number) => {
            checkoutPage.validateProductTitlePriceAndQuantity(index, product.name,product.price,product.quantity);
        });
        checkoutPage.validateBasketCount(this.products.length)
        checkoutPage.validateCheckoutCurrency("GBP")
        checkoutPage.validateTotalTotalPrice(`£${calculateTotalPrice(this.products)}`)
        checkoutPage.clickOnStandardShippingCheckboxAndVerifyTotalPrice(`£${calculateTotalPrice(this.products)}`)
    });


    it("Add different products to basket, verify them on the checkout page, and fill in checkout details", function () {
        cy.wrap(this.products).each((product: Product, index: number) => {
            sweetshopPage.addToBasket(index + 1);
        });
    
        sweetshopPage.clickOnBasket();
    
        this.products.forEach((product: Product, index: number) => {
            checkoutPage.validateProductTitlePriceAndQuantity(index, product.name, product.price, product.quantity);
        });
    
        checkoutPage.validateBasketCount(this.products.length);
        checkoutPage.validateCheckoutCurrency("GBP");
    
        checkoutPage.validateTotalTotalPrice(`£${calculateTotalPrice(this.products)}`);
    
        cy.fillCheckoutForm();
    
        checkoutPage.clickOnCheckoutBtn();
    });


});