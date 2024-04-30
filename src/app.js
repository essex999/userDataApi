const express = require('express')
const env = require('dotenv').config()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const userRouter = require('./routes/users')

const { PORT, MongoURL } = process.env
const app = express()

const dbConnect = async () => {
	try {
		await mongoose.connect(MongoURL)
		console.log('MongoDB is connected')
	} catch (error) {
		console.log(error.message)
	}
}
dbConnect()
app.use(bodyParser.json())
app.use(userRouter)
app.use(express)

app.listen(PORT, () => {
	console.log(`App run on PORT ${PORT}`)
})
