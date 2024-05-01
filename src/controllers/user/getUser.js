const User = require('../../Models/userSchema')

const getUser = async (req, res) => {
	const { data } = req.body.decoded
	const user = await User.findOne({ email: data })
	res.status(200).send({ userID: user._id, email: user.email })
}

module.exports = getUser
