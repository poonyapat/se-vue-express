 const {
     Task,
     Project
 } = require('../models')

 module.exports = {
     async create(req, res) {
         try {
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
             await task.update(req.body.data)
             res.send(task)
         } catch (error) {
             res.status(500).send({
                 error: error
             })
         }
     },
     async delete(req, res) {
         try {
             const task = await Task.findOne({
                 where: req.body
             })
             task.destroy()
             res.send({
                 msg: 'Process Complete'
             })
         } catch (error) {
             res.status(500).send({
                 error: error
             })
         }
     }
 }