 const {
     Task,
     TaskWatcher
 } = require('../models')

 async function updateParentStatus(task) {
     if (task.parent != 0 && 'status' in task._changed) {
         const brethrenTaskStatuses = await Task.count({
             group: 'status',
             where: {
                 parent: task.parent
             },
         })
         if (brethrenTaskStatuses.length === 1) {
             const parent = await Task.findOne({
                 where: {
                     id: task.parent
                 }
             })
             await parent.update({
                 status: task.status
             })
             await TaskWatcher.create({
                 status: task.status,
                 taskId: task.parent,
                 projectId: task.projectId
             })
             await updateParentStatus(parent)
         } else {
             const parent = await Task.findOne({
                 where: {
                     id: task.parent
                 }
             })
             await parent.update({
                 status: 'OnGoing'
             })
             if ('status' in parent._changed) {
                 await TaskWatcher.create({
                     status: task.status,
                     taskId: task.parent,
                     projectId: task.projectId
                 })
                 await updateParentStatus(parent)
             }
         }
     }
 }

 async function updateChildrenStatus(task) {
     const tasks = await Task.findAll({
         where: {
             parent: task.id,
             status: {
                 ne: task.status
             }
         },
         attributes: ['id']
     })
     let taskIds = tasks.map(e => e.id)
     let allIds = []
     while (taskIds.length > 0) {
         let subTasks = await Task.findAll({
             where: {
                 parent: { in: taskIds
                 },
                 status: {
                     ne: task.status
                 }
             },
             attributes: ['id']
         })
         allIds = allIds.concat(taskIds)
         taskIds = subTasks.map(e => e.id)
     }
     await Task.update({
         status: task.status
     }, {
         where: {
             id: { in: allIds
             }
         },
     })
     let log = []
     for (let index in allIds) {
         log.push({
             status: task.status,
             taskId: allIds[index],
             projectId: task.projectId
         })
     }
     await TaskWatcher.bulkCreate(log)
 }

 module.exports = {
     async create(req, res) {
         try {
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
             if (!task) {
                 res.status(404).send({
                     error: 'Task is not found'
                 })
             }
             res.send(task)
         } catch (err) {
             res.status(500).send({
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
             await task.update(req.body.data)
             if ('status' in task._changed) {
                 await TaskWatcher.create({
                     status: task.status,
                     taskId: task.id,
                     projectId: task.projectId
                 })
                 await updateChildrenStatus(task)
             }
             await updateParentStatus(task)
             res.send({
                 msg: 'Complete Process'
             })
         } catch (error) {
             console.log(error)
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
             await TaskWatcher.destroy({
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