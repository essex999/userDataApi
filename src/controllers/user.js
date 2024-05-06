const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../Models/userSchema')

const { SECRET_KEY } = process.env
const saltRounds = 10

const getAllUsers = async (req, res) => {
	const allUsers = await User.find({})

	res.status(200).send(allUsers)
}
////////////////////////////////////////////////////////////
const getUser = async (req, res) => {
	const { data } = req.body.decoded

	try {
		const user = await User.findOne({ email: data })
		if (user) {
			res.status(200).send({ userID: user._id, email: user.email })
		} else {
			res.status(200).send({ message: "user doesn't exist " })
		}
	} catch (error) {
		res.status(200).send(error.message)
	}
}

////////////////////////////////////////////////////////////
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

////////////////////////////////////////////////////////////
const registerUser = async (req, res) => {
	const { email, password } = req.body

	try {
		const userIsexist = await User.findOne({ email: email })

		if (userIsexist) {
			res.status(409).send({ message: 'Email already exist' })
		} else {
			bcrypt.genSalt(saltRounds, function (err, salt) {
				bcrypt.hash(password, salt, async function (err, hash) {
					const newUser = new User({ email: email, password: hash })

					try {
						await newUser.save()
						res.status(201).send({ message: 'user saved' })
					} catch (error) {
						res.status(404).send(error)
					}
				})
			})
		}
	} catch (error) {
		res.status(404).send(error)
	}
}

const newMessage = async (req, res) => {
	const { message, userID } = req.body

	try {
		const delivered = await User.findOneAndUpdate(
			{ _id: userID },
			{ $push: { messages: { textContent: message } } }
		)
		res.status(201).send(delivered)
	} catch (error) {
		res.status(404).send(error.message)
	}
}
////////////////////////////////////////////////////////////
module.exports = { getAllUsers, getUser, loginUser, registerUser, newMessage }
