const TestController = require('./controllers/testController')
const UserController = require('./controllers/userController')
const ProjectController = require('./controllers/projectController')
const UserControllerPolicy = require('./policies/userControllerPolicy')
const TaskController = require('./controllers/taskController')
const TaskIssueController = require('./controllers/taskIssueController')

module.exports = (app) => {
    app.post('/test',
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

    app.post('/project/addMember',
        ProjectController.addMember)

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

    app.post('/task/update',
        TaskController.update)

    app.post('/task/delete',
        TaskController.delete)


    app.post('/task/issue/create',
        TaskIssueController.create)

    app.get('/task/issue/all',
        TaskIssueController.findAll)

    app.get('/task/issue/count',
        TaskIssueController.countAll)
}