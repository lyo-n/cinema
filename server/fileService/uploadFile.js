const fs = require("fs") //винести 
const multer = require('multer') //винести

const storageConfig = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, "uploads");
    },
    filename: (req, file, cb) =>{
        cb(null, file.originalname);
    }
});

const upload = function (req, res, next) {
    
    let filedata = req.file;
    if(!filedata) {
        res.send("Помилка при завантаження файлу");
    } else{
        res.send("Файл завантажений");
    
        fs.readFile(`./uploads/${filedata.originalname}`, 'utf-8', (error, data) => {
            if(error) throw error;
                let obj = [];
                let splitted = data.toString().split("\n\n");
            for (let i = 0; i<splitted.length; i++) {
                if (splitted){
                let tempObj = {};
                    splitted[i].split("\n").forEach(element => {
                        let splitLine = element.split(":");
                        console.log("🚀 ~ file: index.js ~ line 54 ~ fs.readFile ~ splitLine", splitLine)
                        console.log("🚀 ~ file: index.js ~ line 53 ~ fs.readFile ~ element", element)
                        if (element){
                            tempObj[splitLine[0]] = splitLine[1].trim();
                        }
                    })
                    obj.push(tempObj)
                    console.log("🚀 ~ file: index.js ~ line 52 ~ fs.readFile ~ tempObj", tempObj)
                }
            }
            console.log("🚀 ~ file: index.js ~ line 61 ~ splitted[i].split ~ obj", obj)
            
        });
    }
}

module.exports = {upload, storageConfig}