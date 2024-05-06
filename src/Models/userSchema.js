const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: false,
	},
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	messages: [
		{
			textContent: String,
			timeStamp: {
				type: Date,
				default: Date.now,
			},
		},
	],
})

module.exports = mongoose.model('user', userSchema)
