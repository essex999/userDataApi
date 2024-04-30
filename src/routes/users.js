const Router = require('express')
const { registerUser } = require('../controllers/user/registerNewUser')
const routes = new Router()
//////////Routes//////////

routes.post('/user/register', registerUser)
//////////Routes//////////
module.exports = routes
