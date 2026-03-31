Feature: SauceDemo Login, Cart and Checkout

  Background:
    Given I am on the login page

  Scenario: Successful login
    When I login with username "standard_user" and password "secret_sauce"
    Then I should be on the inventory page

  Scenario: Failed login
    When I login with username "invalid_user" and password "wrong_password"
    Then I should see an error message "Epic sadface: Username and password do not match any user in this service"

  Scenario: Add product to cart
    When I login with username "standard_user" and password "secret_sauce"
    And I add "Sauce Labs Backpack" to the cart
    Then I should see 1 item in the cart badge

  Scenario: View cart with added products
    When I login with username "standard_user" and password "secret_sauce"
    And I add "Sauce Labs Backpack" to the cart
    And I click on the cart icon
    Then I should see the cart page with "Sauce Labs Backpack"

  Scenario: Complete purchase process
    When I login with username "standard_user" and password "secret_sauce"
    And I add "Sauce Labs Backpack" to the cart
    And I click on the cart icon
    And I proceed to checkout
    And I fill checkout information with "Juan" "Perez" "12345"
    And I complete the purchase
    Then I should see the order confirmation