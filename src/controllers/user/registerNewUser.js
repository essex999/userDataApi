const bcrypt = require('bcrypt')

const User = require('../../Models/userSchema')

const saltRounds = 10

const registerUser = async (req, res) => {
	const { email, password } = req.body

	if (email && password) {
		try {
			const userIsexist = await User.find({ email: email })

			if (userIsexist.length) {
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
	} else {
		res.status(404).send({ message: 'incorrect body' })
	}
}
module.exports = { registerUser }
