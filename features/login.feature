Feature: SauceDemo Login, Cart and Checkout

  Background:
    Given I am on the login page

  Scenario: Successful login
    When I login with valid credentials
    Then I should be on the Products page

  Scenario: Locked out user
    When I try to login with a locked out user
    Then I should see an error message "Epic sadface: Username and password do not match any user in this service"

    Scenario: Wrong password
        When I login with invalid credentials
        Then I should see an error message "Epic sadface: Username and password do not match any user in this service"
