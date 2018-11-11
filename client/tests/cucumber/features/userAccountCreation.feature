Feature: Create user account

    Scenario: Create account entire data
        Given username is "test0001"
        And password is "password"
        And phonenumber is "0899999999"
        And email is "helloworld@gmail.com"
        When create account
        Then complete creation
        
    Scenario: Create account without username
        And password is "password"
        And phonenumber is "0899999999"
        And email is "helloworld@gmail.com"
        When create account
        Then error status code 400 with "Require more information"

    Scenario: Create account without password
    Scenario: Create account without phonenumber
    Scenario: Create account without email
    Scenario: Create account with existed username
    Scenario: Create account with wrong format phonenumber
    Scenario: Create account with wrong format email
