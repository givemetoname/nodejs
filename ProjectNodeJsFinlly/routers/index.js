
const loginRouter = require('./loginAndDashboard')

const dashboardRouter =require('./dashboardRouter')


function route(app) {
app.use('/', loginRouter)
app.use('/dashboard',dashboardRouter)
}

module.exports = route;