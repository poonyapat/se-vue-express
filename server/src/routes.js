const TestController = require('./controllers/testController')

module.exports = (app) => {
    app.get('/test',
        TestController.test)
}