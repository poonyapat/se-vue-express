 const {Project, User} = require('../models')
 module.exports = {
     async create(req, res) {
         try {
             req.body.members = []
             req.body.status = "Open"
             console.log(req.body)
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
         } catch (err) {
             res.status(501).send({
                 // error: 'An error has occured trying to login'
                 error: err
             })
         }
     },

     async addMember(req, res) {
         try {
             if (req.body.user != '') { //กันไว้ก่อน ค่อยเอาออก
                 const project = await Project.findOne({
                     where: {
                         id: req.body.projectId
                     }
                 })
                 const user = await User.findOne({
                     where: {
                         username: req.body.user
                     }
                 })
                 var i;
                 var fact = false;
                 for(i = 0; i< project.members.length; i++){
                    if(user.username == project.members[i]){
                            fact = true;
                    }
                 }
                 if(fact != true){
                    console.log(project.members)
                    project.members.push(user.username) // id  of  user
                    console.log("555555555")
                    project.update({
                        members: project.members
                    })
                 }else{
                     console.log("redundant")
                 }
            
            //     console.log(user.username)
                //  if (user != null) {
                //      console.log(project.members)
                //      project.members.push(user.username) // id  of  user
                //      console.log("555555555")
                //      project.update({
                //          members: project.members
                //      })
                //  }


             }
         } catch (err) {
             res.status(501).send({
                 // error: 'An error has occured trying to login'
                 error: err
             })
         }
     }


 }