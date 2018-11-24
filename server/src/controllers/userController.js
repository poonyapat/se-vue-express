const {User} = require('../models')
const jwt = require('jsonwebtoken')
const config = require('../config/config')

function jwtSignUser(user) {
    const ONE_WEEK = 7 * 24 * 60 * 60
    return jwt.sign(user, config.authentication.jwtSecret, {
        expiresIn: ONE_WEEK
    })
}

module.exports = {
    async register(req, res) {
        try {
            req.body.skills = {}
            const user = await User.create(req.body)
            res.send(user.toJSON())
        } catch (err) {
            res.status(400).send({
                error: 'This account is already exist'
                // error: err
            })
        }
    },
    async findOne(req, res) {
        try {
            const user = await User.findOne({
                where: {
                    username: req.query.username
                }
            })
            if (!user) {
                res.status(403).send({
                    error: 'This account doesn\'t exist'
                })
            }
            delete user.password
            res.send(user)
        }catch (err) {
            res.status(500).send({
                // error: 'An error has occured trying to login'
                error: err
            })
        }
    },
    async authenticate(req, res) {
        try {
            const { username, password } = req.body
            const user = await User.findOne({
                where: {
                    username: username
                }
            })
            if (!user) {
                res.status(403).send({
                    error: 'This account doesn\'t exist'
                })
            }
            const isPasswordValid = await user.comparePassword(password)
            if (!isPasswordValid) {
                res.status(403).send({
                    error: 'Wrong password'
                })
            }
            res.send({
                username: user.username,
                token: jwtSignUser(user.toJSON())
            })
        } catch (err) {
            res.status(500).send({
                // error: 'An error has occured trying to login'
                error: err
            })
        }
    },

    async update(req, res){
        try{
            console.log("------------------update------------------")
            console.log(req.body)
            const user = await User.findOne({
                where: {
                    username: req.body.username
                }
            })
            const {phone,email} = req.body.userData;
            console.log(phone)
            console.log(email)
            if(phone != "" ){
                await user.update({
                   phoneNumber : phone
                })
            }
            console.log("11111")
            if(email != ""){
                console.log("1.5")
                await user.update({
                   email: email
                 })
            }
                console.log("22222")

                res.send({msg: 'Add Complete'})
        }catch(err) {
            res.status(501).send({
                error: 'Can not update profile'
                // error: err
            })
        }
    }
}