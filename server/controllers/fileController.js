const fs = require('fs') 
const {Item} = require('../models/models')
const ApiError = require('../errors/ApiErrors')


class FileController {
    
    async upload (req, res, next) {
        try {
            let items = await Item.findAndCountAll()     
                console.log("🚀 ~ file: fileController.js ~ line 10 ~ FileController ~ upload ~ items", items)
        let obj = [];
    let filedata = req.file;
    if(!filedata) {
        res.send("Помилка при завантаження файлу");
    } else {
        res.send("Файл завантажений");
    fs.readFile(`./uploads/${filedata.originalname}`, 'utf-8', (error, data) => {
        if(error) throw error;
            let splitted = data.toString().split("\n\n");
        for (let i = 0; i<splitted.length; i++) {
            let tempObj = {}; 
            if (splitted){          
                splitted[i].split("\n").forEach(element => {                    
                    let splitLine = element.split(":");
                    if (element){
                        tempObj[splitLine[0].replace(/\s+/g,'')] = splitLine[1].trim();
                    }
                    // obj.push(tempObj)
                })


                        ///робоче

                if (JSON.stringify(tempObj) !== '{}'){
                        const items = Item.create(
                            {
                                title: tempObj.Title, 
                                release_year: tempObj.ReleaseYear, 
                                format: tempObj.Format, 
                                stars: tempObj.Stars
                            })
                        
                        
                            console.log(items) 
                }
















                
            }
        };
    });
        }
    } catch (e) {
        next(ApiError.badRequest(e.message))
    }
}
}
module.exports = new FileController()