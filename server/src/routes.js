const TestController = require('./controllers/testController')
const UserController = require('./controllers/userController')
const ProjectController = require('./controllers/projectController')
const UserControllerPolicy = require('./policies/userControllerPolicy')
const TaskController = require('./controllers/taskController')

module.exports = (app) => {
    app.get('/test',
        TestController.test)
    
    app.post('/login',
        UserController.authenticate)
    
    app.get('/user',
        UserController.findOne)

    app.post('/register',
        UserControllerPolicy.register,
        UserController.register)
    
    app.post('/project/create',
        ProjectController.create)
    
    app.get('/projects',
        ProjectController.findAll)

    app.get('/project',
        ProjectController.findOne)
    
    app.get('/tasks',
        TaskController.findAll)
    
    app.post('/task/create',
        TaskController.create)
    
    app.get('/task',
        TaskController.findOne)
    
}