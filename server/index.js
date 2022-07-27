require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const models = require('./models/models')
const cors = require('cors')
const router = require('./routes/index')
const errorHandlerMiddleware = require('./middleware/ErrorHandlingMiddleware')

const PORT = process.env.PORT || 8049





// const fs = require("fs")

//     fs.readFile("./sample_movies.txt", 'utf-8', (error, data) => {
//         console.log(data)
//         fs.mkdirSync("./files", () => {});
//     });


























const app = express()
app.use(cors())
app.use(express.json())

app.use('/cinema', router)

app.use(errorHandlerMiddleware)


const start = async() => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start();