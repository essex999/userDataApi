const Router = require('express')
const registerUser = require('../controllers/user/registerNewUser')
const loginUser = require('../controllers/user/loginUser')
const authMidlleware = require('../middlewares/authMidlleware')
const getAllUsers = require('../controllers/user/getAllUsers')
const getUser = require('../controllers/user/getUser')
const routes = new Router()
//////////Routes//////////
routes.get('/', getAllUsers)
routes.get('/user', authMidlleware, getUser)

routes.post('/user/login', loginUser)
routes.post('/user/register', registerUser)
routes.post('/user/auth', authMidlleware)
//////////Routes//////////
module.exports = routes
