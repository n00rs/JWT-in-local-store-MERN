
const express = require('express')
const connectDB = require('./config.js/mongodb')
const { errorHandler } = require('./middleWare/errorMiddleware')
const dotenv = require('dotenv').config()
const port = process.env.PORT || 5000

const app = express()
connectDB()
app.use(express.json())
app.use(express.urlencoded ({extended:false}))

app.use('/api/goals', require('./routes/goalRoutes'))

app.use(errorHandler)

app.listen(port, () => console.log(`server at ${port}`))