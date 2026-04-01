Feature: Checkout
    Background:
        Given I am on the login page
        When I login with valid credentials
        Then I should be on the Products page
        And I add "Sauce Labs Backpack" to the cart
        And I click on the cart icon

 Scenario: Complete purchase process
    When I proceed to checkout
    And I fill checkout information with "Juan" "Perez" "90210"
    And I click the continue button
    And I click the finish button
    Then I should see the order confirmation