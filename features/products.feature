Feature: Products
    Background:
        Given I am on the login page
        When I login with valid credentials
        Then I should be on the Products page

    Scenario: Add product to cart
        When I add "Sauce Labs Backpack" to the cart
        Then I should see 1 item in the cart badge