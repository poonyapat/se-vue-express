const { Task, Project } = require('../models')

module.exports = {
    async create(req, res) {
        try {
            req.body.status = "ToDo"
            req.body.children = []
            const task = await Task.create(req.body)
            taskId = task.id
            const project = await Project.findOne({
                where: {
                    id: task.projectId
                }
            })
            project.tasks.push(task.id)
            project.update({
                tasks: project.tasks
            })
            res.send({
                task: task,
                project: project
            })
        } catch (err) {
            Task.destroy({
                where: {
                    id: taskId
                }
            })
            res.status(500).send({
                error: err
            })
        } 
    },

    async findAll(req, res) {
        try {
            const tasks = await Task.findAll({
                where: req.query
            })
            if (!tasks) {
                res.status(204).send([])
            }
            res.send(tasks)
        } catch (err) {
            res.status(500).send({
                error: err
            })
        }
    },
}