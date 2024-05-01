const User = require('../../Models/userSchema')
const getAllUsers = async (req, res) => {
	const allUsers = await User.find({})

	res.status(200).send(allUsers)
}

module.exports = getAllUsers
