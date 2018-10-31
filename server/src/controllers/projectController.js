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
    async findOne(req, res) {
        try {
            const project = await Project.findOne({
                where: {
                    id: req.query.id
                }
            })
            // if (!id) {
            //     res.status(403).send({
            //         error: 'This project doesn\'t exist'
            //     })
            // }
           // delete user.password
            res.send(project)
        }catch (err) {
            res.status(501).send({
                // error: 'An error has occured trying to login'
                error: err
            })
        }
    },

  
}