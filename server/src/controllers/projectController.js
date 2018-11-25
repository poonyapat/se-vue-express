 const {
     Project,
     User
 } = require('../models')
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
             res.send(project)
         } catch (err) {
             res.status(501).send({
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
                 let fact = false;
                 for (let i = 0; i < project.members.length; i++) {
                     if (user.username == project.members[i] || user.username == project.username) {
                         fact = true;
                     }
                 }
                 if (fact != true) {
                     console.log(project.members)
                     project.members.push(user.username) // id  of  user
                     console.log("555555555")
                     await project.update({
                         members: project.members
                     })
                     res.send("Add Finish")
                 } else {
                     res.send("Can not add")
                     console.log("redundant")
                 }
             }
         } catch (err) {
             res.status(400).send({
                 error: err
             })
         }
     },


     async removeMember(req, res) {
         try {
             console.log(req.body)
             const project = await Project.findOne({
                 where: {
                     id: req.body.projectId
                 }
             })
             console.log(req.body)
             username = req.body.user;
             var i;
             var fact = false;
             for (i = 0; i < project.members.length; i++) {
                 if (username == project.members[i]) {
                     fact = true;
                 }
             }
             if (fact == true) {
                 project.members.pop(username) // id  of  user
                 await project.update({
                     members: project.members
                 })
                 res.send("remove complete")
             } else {
                 console.log("Not match")
             }


         } catch (err) {
             res.status(501).send({
                 // error: 'An error has occured trying to login'
                 error: err
             })
         }


     }


 }