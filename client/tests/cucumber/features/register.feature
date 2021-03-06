Feature: Create user account

    Scenario: Create account entire data
        Given username is "test0001"
        And password is "password"
        And phonenumber is "0899999999"
        And email is "helloworld@gmail.com"
        When create account
        Then create account success
        
    Scenario: Create account without username
        And password is "password"
        And phonenumber is "0899999999"
        And email is "helloworld@gmail.com"
        When create account
        Then error status code 400 with "Require more information"

    Scenario: Create account without password
        Given username is "test0001"
        And phonenumber is "0899999999"
        And email is "helloworld@gmail.com"
        When create account
        Then error status code 400 with "Require more information"
    Scenario: Create account without phonenumber
        Given username is "test0001"
        And password is "password"
        And email is "helloworld@gmail.com"
        When create account
        Then error status code 400 with "Require more information"
    Scenario: Create account without email
        Given username is "test0001"
        And password is "password"
        And phonenumber is "0899999999"
        When create account
        Then error status code 400 with "Require more information"
    Scenario: Create account with existed username
        Given username is "test0001"
        And password is "password"
        And phonenumber is "0899999999"
        When create account
        Then error status code 400 with "This account is already exist"
    Scenario: Create account with wrong format phonenumber
    
    Scenario: Create account with wrong format email
