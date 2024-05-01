const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../../Models/userSchema')

const { SECRET_KEY } = process.env

const loginUser = async (req, res) => {
	const { email, password } = req.body

	try {
		const userData = await User.findOne({ email: email })

		if (userData) {
			bcrypt.compare(password, userData.password, function (err, result) {
				if (result === true) {
					const token = jwt.sign(
						{
							data: email,
						},
						SECRET_KEY,
						{ expiresIn: 60 * 60 }
					)
					res.status(200).send({ token: `Bearer ${token}` })
				} else {
					res.status(200).send({ message: 'password is wrong' })
				}
			})
		} else {
			res.status(404).send({ message: 'this email is not registred' })
		}
	} catch (error) {
		res.status(404).send(error.message)
	}
}

module.exports = loginUser
