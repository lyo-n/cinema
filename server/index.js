require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const models = require('./models/models')


const PORT = process.env.PORT || 8049

sequelize.sync().then(() => {
    console.log('My db is ready!!!')
})


const app = express()

app.listen (PORT, () => {
    console.log(`Server started on port ${PORT}`)
})