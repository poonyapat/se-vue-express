const TestController = require('./controllers/testController')
const UserController = require('./controllers/userController')
const ProjectController = require('./controllers/projectController')
const UserControllerPolicy = require('./policies/userControllerPolicy')
const TaskController = require('./controllers/taskController')
const TaskIssueController = require('./controllers/taskIssueController')
const TaskWatcherController = require('./controllers/taskWatcherController')

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

    app.post('/project/removeMember',
        ProjectController.removeMember)

    app.get('/projects',
        ProjectController.findAll)

    app.get('/project',
        ProjectController.findOne)

    app.get('/task/all',
        TaskController.findAll)
    
        app.get('/task/all/attributes',
        TaskController.findAllWithSelectedAttributes)

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

    app.post('/task/issue/remove',
        TaskIssueController.remove)

    app.post('/task/issue/updateStatus',
        TaskIssueController.updateStatus)
    
    app.get('/task/watcher/all',
        TaskWatcherController.findAll)
}