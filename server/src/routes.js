const TestController = require('./controllers/testController')
const UserController = require('./controllers/userController')
const ProjectController = require('./controllers/projectController')
const UserControllerPolicy = require('./policies/userControllerPolicy')

module.exports = (app) => {
    app.get('/test',
        TestController.test)
    
    app.post('/login',
        UserController.authenticate)

    app.post('/register',
        UserControllerPolicy.register,
        UserController.register)
}