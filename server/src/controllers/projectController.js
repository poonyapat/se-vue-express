const {Project} = require('../models')

module.exports = {
    async create(req, res) {
        try {
            req.body.tasks = []
            req.body.members = []
            req.body.status = "Open"
            const project = await Project.create(req.body)
            res.send(project.toJSON())
        } catch (err) {
            res.status(500).send({
                error: 'An error occured trying to create project'
            })
        }
    },

    async findAll(req, res) {
        try {
            const projects = await Project.findAll({
                where: req.query
            })
            if (!projects) {
                res.status(204).send([])
            }
            res.send(projects)
        } catch (err) {
            res.status(500).send({
                error: err
            })
        }
    },
}