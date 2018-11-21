const { TaskIssue } = require('../models')
const sequelize = require('sequelize')
module.exports = {
    async findAll(req, res) {
        try {
            const taskIssue = await TaskIssue.findAll({
                where: req.query
            })
            if (!taskIssue) {
                res.status(204).send([])
            }
            res.send(taskIssue)
        } catch (err) {
            res.status(500).send({
                error: err
            })
        }
    },
    async countAll(req, res) {
        try {
            console.log(req.query.ids)
            const issueCounter = await TaskIssue.findAll({
                where: { taskId: { in: req.query.ids ? req.query.ids: []}},
                group: ['taskId'],
                attributes: ['taskId', [sequelize.fn('COUNT', 'taskId'), 'issueCount']],
            })
            res.send(issueCounter)
        } catch (error) {
            res.status(500).send({
                error: error
            })
        }
    },
    async create(req, res) {
        try {
            const taskIssue = await TaskIssue.create(req.body)
            res.send(taskIssue)
        } catch (error) {
            res.status(500).send({
                error : error
            })
        }
    }
}