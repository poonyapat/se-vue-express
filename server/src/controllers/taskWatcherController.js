const { TaskWatcher } = require('../models')
module.exports = {
    async findAll(req, res) {
        try {
            const taskWatcher = await TaskWatcher.findAll({
                where: req.query
            })
            if (!taskWatcher) {
                res.status(204).send([])
            }
            res.send(taskWatcher)
        } catch (err) {
            res.status(500).send({
                error: err
            })
        }
    },
}