 const {
     Task
 } = require('../models')

 module.exports = {
     async create(req, res) {
         try {
             if (req.body.parent != 0) {
                 req.body.status = (await Task.findOne({
                     attributes: ['status'],
                     where: {
                         id: req.body.parent
                     }
                 })).status
             }
             const task = await Task.create(req.body)
             res.send({
                 task: task
             })
         } catch (err) {
             res.status(500).send({
                 error: err
             })
         }
     },

     async findAll(req, res) {
         try {
             if (!req.query.parent && req.query.parent != 0) {
                 res.status(403).send('Invalid Parent Tasks')
             }
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
     async findOne(req, res) {
         try {
             const task = await Task.findOne({
                 where: {
                     id: req.query.id
                 }
             })
             res.send(task)
         } catch (err) {
             res.status(501).send({
                 error: err
             })
         }
     },

     async update(req, res) {
         try {
             const task = await Task.findOne({
                 where: {
                     id: req.body.id
                 }
             })
             if (!task) {
                 res.status(404).send({
                     error: 'Task is not found'
                 })
             }
             let taskStatus = task.status
             await task.update(req.body.data)
             if (taskStatus !== req.body.data.status && taskStatus) {
                 const tasks = await Task.findAll({
                     where: {
                         parent: req.body.id
                     },
                     attributes: ['id']
                 })
                 let taskIds = tasks.map(e => e.id)
                 let allIds = [req.body.parent]
                 while (taskIds.length > 0) {
                     let subTasks = await Task.findAll({
                         where: {
                             parent: { in: taskIds
                             }
                         }
                     })
                     allIds = allIds.concat(taskIds)
                     taskIds = subTasks.map(e => e.id)
                 }
                 await Task.update({
                     status: req.body.data.status
                 }, {
                     where: {
                         id: { in: allIds
                         }
                     },
                 })
             }
             if (task.parent != 0) {
                 const brethrenTaskStatuses = await Task.count({
                     group: 'status',
                     where: {
                         parent: task.parent
                     },
                 })
                 if (brethrenTaskStatuses.length === 1) {
                     console.log(task.status, task.parent)
                     await Task.update({
                         status: task.status
                     }, {
                         where: {
                             id: task.parent
                         },
                     })
                 }
             }
            //  console.log(taskFriStatuses.length)
             res.send({msg: 'Complete Process'})
         } catch (error) {
             res.status(500).send({
                 error: error
             })
         }
     },
     async delete(req, res) {
         try {
             const tasks = await Task.findAll({
                 where: req.body,
                 attributes: ['id']
             })
             let taskIds = tasks.map(e => e.id)
             let allIds = [req.body.parent]
             while (taskIds.length > 0) {
                 let subTasks = await Task.findAll({
                     where: {
                         parent: { in: taskIds
                         }
                     }
                 })
                 allIds = allIds.concat(taskIds)
                 taskIds = subTasks.map(e => e.id)
             }
             await Task.destroy({
                 where: {
                     id: { in: allIds
                     }
                 }
             })
             res.send({
                 msg: "complete"
             })
         } catch (error) {
             res.status(500).send({
                 error: error
             })
         }
     }
 }