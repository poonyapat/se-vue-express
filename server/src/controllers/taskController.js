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
        console.log(req.body)
         try {
             if (!req.query.parent && req.query.parent != 0) {
                 res.status(403).send('Invalid Parent Tasks')
             }
             console.log(req.query)
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
 }