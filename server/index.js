require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const multer = require('multer') //винести
const fs = require("fs") //винести 
const path = require('path')
const models = require('./models/models')
const cors = require('cors')
const router = require('./routes/index')
const errorHandlerMiddleware = require('./middleware/ErrorHandlingMiddleware')

const PORT = process.env.PORT || 8049



const app = express()
app.use(cors())
app.use(express.json())
app.use('/cinema', router)


// app.use(express.static(__dirname))
// app.use(multer({dest: 'uploads'}).single('filedata'))

//завантаження файлу (винести в окремий файл)
const storageConfig = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, "uploads");
    },
    filename: (req, file, cb) =>{
        cb(null, file.originalname + ".txt");
    }
});
app.use(multer({storage:storageConfig}).single("filedata"));
app.post("/upload", function (req, res, next) {
    
    let filedata = req.file;
    if(!filedata)
        res.send("Ошибка при загрузке файла");
    else
        res.send("Файл загружен");
});

// app.post('/upload', function (req, res, next) {
//     let filedata = req.file;
//     console.log(filedata);
//     if (!filedata) {
//         return res.json('Помилка при завантаження файлу')
//     } else {        
//         return res.json('Файл завантажений')        
//     }
// })


    // fs.readFile("./sample_movies.txt", 'utf-8', (error, data) => {
    //     console.log(data)
    //     fs.mkdirSync("./files", () => {});
    // });



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