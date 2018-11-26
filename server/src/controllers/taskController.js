 const {
     Task,
     TaskWatcher
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
             await TaskWatcher.create({
                status: task.status,
                taskId: task.id,
                projectId: task.projectId
            })
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
            //  if (!req.query.parent && req.query.parent != 0) {
            //     console.log(req.query)
            //     console.log("-----------------------------------asdsad----------")
            //     res.status(403).send('Invalid Parent Tasks')
            //  }
             const tasks = await Task.findAll({
                 where: req.query
             })
             for (let index = 0; index < tasks.length; index++) {
                 const element = tasks[index];
                if (element.parent != 0) {
                        res.status(403).send('Invalid Parent Tasks')
                     }
             }
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

     async findAllWithSelectedAttributes(req, res) {
         try {
            const tasks = await Task.findAll({
                where: JSON.parse(req.query.query),
                attributes: req.query.attributes
             })
            if (!tasks) {
                res.status(204).send([])
            }
            res.send(tasks)
         } catch (err) {
             console.log(err)
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
             console.log(req.body)
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
                 await TaskWatcher.create({
                     status: task.status,
                     taskId: task.id,
                     projectId: task.projectId
                 })
                 const tasks = await Task.findAll({
                     where: {
                         parent: req.body.id
                     },
                     attributes: ['id']
                 })
                 let taskIds = tasks.map(e => e.id)
                 let allIds = []
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
                 let temp = []
                 for (let index in allIds) {
                     temp.push({
                         status: task.status,
                         taskId: allIds[index],
                         projectId: task.projectId
                     })
                 }
                 console.log(temp, allIds)
                 await TaskWatcher.bulkCreate(temp)
             }
             if (task.parent != 0 && taskStatus !== req.body.data.status) {
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
                     await TaskWatcher.create({
                         status: task.status,
                         taskId: task.parent,
                         projectId: task.projectId
                     })
                 }
             }
             res.send({
                 msg: 'Complete Process'
             })
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
     },
 }