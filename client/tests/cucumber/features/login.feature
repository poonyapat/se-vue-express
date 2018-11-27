Feature: Login
    Background:
        Given username is "test0011"
        And password is "password"
        And phonenumber is "0899999999"
        And email is "helloworld@gmail.com"
        When create account
        Then complete creation

    Scenario: Login Success
        Given username is "test0011"
        And password is "password"
        When login
        Then complete login

    Scenario: Login with incomplete information
        Given username is "test0011"
        When login
        Then error status code 400 with "Require more information"

    Scenario: Login with not existed user
        Given username is "test0011"
        When login
        Then error status code 403 with "This account doesn't exist"

    Scenario: Login with wrong password
        Given username is "test0011"
        And password is "helloworld"
        When login
        Then error status code 403 with "Wrong password"
    