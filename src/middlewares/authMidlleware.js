const jwt = require('jsonwebtoken')

const { SECRET_KEY } = process.env

const authMidlleware = (req, res, next) => {
	const { authorization: token } = req.headers

	jwt.verify(token, SECRET_KEY, function (err, decoded) {
		if (err) {
			res.status(401).send({ message: err.message })
		} else {
			req.body.decoded = decoded

			next()
		}
	})
}
module.exports = authMidlleware
