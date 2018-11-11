import assert from 'assert'
import {
    Given,
    When,
    Then
} from 'cucumber'

import UserService from '../../../../src/services/userService'

Given('username is {string}', function (string) {
    // Write code here that turns the phrase above into concrete actions
    this.username = string
});

Given('password is {string}', function (string) {
    // Write code here that turns the phrase above into concrete actions
    this.password = string
});

Given('phonenumber is {string}', function (string) {
    // Write code here that turns the phrase above into concrete actions
    this.phoneNumber = string
});

Given('email is {string}', function (string) {
    // Write code here that turns the phrase above into concrete actions
    this.email = string
});
When('create account', async function () {
    try {
        this.result = (await UserService.register({
            username: this.username,
            password: this.password,
            phoneNumber: this.phoneNumber,
            email: this.email
        })).data

    } catch (err) {
        this.error = err
    }
});

Then('complete creation', function () {
    assert.deepEqual((({
        username,
        phoneNumber,
        email,
        skills,
        avatarURL
    }) => ({
        username,
        phoneNumber,
        email,
        skills,
        avatarURL
    }))(this.result), {
        username: 'test0001',
        phoneNumber: '0899999999',
        email: 'helloworld@gmail.com',
        skills: {},
        avatarURL: null
    })
});

Then('error status code {int} with {string}', function (int, string) {
    // Write code here that turns the phrase above into concrete actions
    assert.equal(this.error.response.status, int)
    assert.equal(this.error.response.data.error, string)
});