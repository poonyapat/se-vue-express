const Joi = require('joi')

module.exports = {
    create(req, res, next) {
        if (req.body.name) {
            next()
        }
        else {
            res.status(400).send({error: 'Project name cannot be null'})
        }
    },
    update(req, res, next) {
        if (req.body.name === null) {
            res.status(400).send({error: 'Project name cannot be null'})
        }
        else {
            next()
        }
    }
}