const Router = require('express')

const authMidlleware = require('../middlewares/authMidlleware')
const {
	getAllUsers,
	loginUser,
	getUser,
	registerUser,
	newMessage,
} = require('../controllers/user')
const routes = new Router()
//////////Routes//////////
routes.get('/', getAllUsers)
routes.get('/user', authMidlleware, getUser)

routes.post('/user/login', loginUser)
routes.post('/user/register', registerUser)
routes.post('/user/auth', authMidlleware)
routes.post('/user/newMessage', newMessage)
//////////Routes//////////
module.exports = routes
