Feature: Cart
    Background:
        Given I am on the login page
        When I login with valid credentials
        Then I should be on the Products page
        And I add "Sauce Labs Backpack" to the cart
        And I click on the cart icon           
Scenario: View cart with added products
    Then I should see the cart page with "Sauce Labs Backpack"
