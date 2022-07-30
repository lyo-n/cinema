require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const multer = require('multer') 
const {upload} = require('./controllers/fileController')
const cors = require('cors')
const router = require('./routes/index')
const errorHandlerMiddleware = require('./middleware/ErrorHandlingMiddleware')



const PORT = process.env.PORT || 8049


const storageConfig = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, "uploads");
    },
    filename: (req, file, cb) =>{
        cb(null, file.originalname);
    }
});



const app = express()
app.use(cors())
app.use(express.json())
app.use('/cinema', router)  
app.use(express.static(__dirname))




app.use(multer({storage:storageConfig }).single("filedata"))
app.post("/upload", upload)



















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