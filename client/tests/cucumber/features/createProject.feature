Feature: Create Project
    Background:
        Given username is "test0011"
        And password is "password"
        And phonenumber is "0899999999"
        And email is "helloworld@gmail.com"
        When create account
        Then create account success

    Scenario: Create Project Success
        Given project name is "project001"
        And project's manager is "test0011"
        When create project
        Then create project success

    Scenario: Create Project without Project name
        Given project's manager is "test0011"
        When create project
        Then error status code 400 with "Project name cannot be null"

    Scenario: Update Project description
        Given project description is "project001 description"
        When update project
        Then new project description is "project001 description"

    Scenario: Update Project deadline
        Given project deadline is "2018-12-04"
        When update project
        Then new project deadline is "2018-12-04"

    Scenario: Update Project name
        Given project name is "project002"
        When update project
        Then new project name is "project002"

    Scenario: Update Project name with null
        Given project name is ""
        When update project
        Then error status code 400 with "Project name cannot be null"