 const {
     Project,
     User
 } = require('../models')
 const Sequelize = require('sequelize');
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
     async findAllUserHaveAnotherProject(req, res) {
         try {
             const projects = await Project.findAll({
                 where: Sequelize.or({
                     username: req.query.username
                 }, {
                     members: {
                         [Sequelize.Op.contains]: [req.query.username]
                     }
                 })


             })
             if (!projects) {
                 res.status(204).send([])
             }
             res.send(projects)
         } catch (err) {
             console.log(err)
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
                 if (!project) {
                     res.status(403).send({
                         error: 'Invalid project name'
                     })
                 }
                 const user = await User.findOne({
                     where: {
                         username: req.body.user
                     }
                 })
                 if (!user) {
                     res.status(403).send({
                         error: 'Invalid username'
                     })
                 }
                 if (project.members.indexOf(user.username) == -1) {
                     project.members.push(user.username)
                     await project.update({
                         members: project.members
                     })
                     res.send({
                         msg: "Add Member Complete"
                     })
                 } else {
                     res.status(403).send({
                         error: "This user is already in your project"
                     })
                 }
             }
         } catch (err) {
             res.status(500).send({
                 error: err
             })
         }
     },
     async hasPermission(req, res) {
         try {
             const project = await Project.findOne({
                 where: {
                     id: req.query.projectId
                 }
             })
             if (!project) {
                 res.status(403).send("Invalid Project ID")
             }
             const isMember = project.members.indexOf(req.query.username) != -1
             const isProjectManager = req.query.username == project.username
             if (isMember || isProjectManager) {
                 res.send({
                     validation: true
                 })
             }
             res.send({
                 validation: false
             })
         } catch (err) {
             console.log(err)
             res.status(500).send(err)
         }
     },

     async removeMember(req, res) {
         try {
             const project = await Project.findOne({
                 where: {
                     id: req.body.projectId
                 }
             })
             if (!project) {
                 res.status(404).send({
                     error: "Project is not found"
                 })
             }
             const username = req.body.user;
             for (let i in project.members) {
                 if (project.members[i] == username) {
                     project.members.splice(i,1)
                     await project.update({
                         members: project.members
                     })
                     res.send({
                         msg: "remove complete"
                     })
                 }
             }
             res.status(403).send({
                 error: "Invalid Username"
             })
         } catch (err) {
             res.status(500).send({
                 error: 'An error has occured trying to login'
             })
         }
     },
     async update(req, res) {
         try {
             if (!req.body.project) {
                 res.status(403).send({
                     error: 'New Information is not defined'
                 })
             }
             await Project.update({
                 name: req.body.project.name,
                 description: req.body.project.description,
                 status: req.body.project.status,
                 deadLine: req.body.project.deadLine
             }, {
                 where: {
                     id: req.body.project.id
                 },
             })
             res.send({
                 msg: "Update Complete"
             })
         } catch (err) {
             console.log(err)
             res.status(500).send({
                 error: err
             })
         }
     }


 }