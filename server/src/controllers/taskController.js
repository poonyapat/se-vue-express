 const { Task, Project } = require('../models')

module.exports = {
    async create(req, res) {
        try {
            req.body.status = "ToDo"
            req.body.children = []
            taskId = null          
            const task = await Task.create(req.body)
            console.log(req.body)
            taskId = task.id         
            const project = await Project.findOne({
                where: {
                    id: task.projectId
                }
            })
           console.log(task.body)
        console.log(project.name)
            project.tasks.push(task.id)       
            project.update({
                tasks: project.tasks
            })
           //tum add
            if ( req.body.parentId != null){
                    const parentTask = await Task.findOne({
                        where:{
                            id: req.body.parentId
                        }
                    })
                    console.log(parentTask.body)
                    parentTask.children.push(task.id)
                    parentTask.update({
                        children :parentTask.children
                    })
             }
           //
            res.send({
                task: task,
                project: project,
                // //tum add
                // parentTask: parentTask
                // //
            })
        } catch (err) {
            Task.destroy({
                where: {
                    id: taskId
                }
            }),
            // Project.destroy({
            //     where: {
            //         tasks: taskId
            //     }  
            // })
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
    async findOne(req, res){
        try {
            const task = await Task.findOne({
                where: {
                    id: req.query.id
                }
            })
            res.send(task)
        }catch (err) {
            res.status(501).send({
                error: err
            })
        }
    },
}