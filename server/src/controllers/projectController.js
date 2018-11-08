const {Project,User} = require('../models')

module.exports = {
    async create(req, res) {
        try {
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

    async addMembers(req, res){
        try{
            // if(req.body.user1 != null){ //กันไว้ก่อน ค่อยเอาออก
                console.log(req.body)
                const project = await Project.findOne({
                    where:{
                        id : req.body.projectId
                    }
                })
                console.log(project)
                const user1 = await User.findOne({
                    where :{
                        username : req.body.user1
                    }
                })
                project.members.push(user1.id) // id  of  user
                project.update({
                    members: project.members
                })
                // if(req.body.user2 != null){
                //     const user2 = await User.findOne({
                //         where :{
                //             username : req.body.user2
                //         }
                //     })
                //     project.members.push(user2.id) // id  of  user
                //     project.update({
                //         members: project.members
                //     })
                // }
                // if(req.body.user3 != null){
                //     const user3 = await User.findOne({
                //         where :{
                //             username : req.body.user3
                //         }
                //     })
                //     project.members.push(user3.id) // id  of  user
                //     project.update({
                //         members: project.members
                //     })
                // }
             
            // }
        }catch(err){
            res.status(501).send({
                // error: 'An error has occured trying to login'
                error: err
            })
        }
    }

  
}