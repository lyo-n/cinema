const express = require("express");
const fs = require("fs") //винести 
const multer = require('multer') //винести
const {Item} = require('../models/models')

const storageConfig = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, "uploads");
    },
    filename: (req, file, cb) =>{
        cb(null, file.originalname);
    }
});
class FileController {
    async upload (req, res, next) {
    
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
                        if (element){
                            tempObj[splitLine[0].replace(/\s+/g,'')] = splitLine[1].trim();
                        }
                    })
                    obj.push(tempObj)
                    
                    return obj
                }
                console.log("🚀 ~ file: uploadFile.js ~ line 26 ~ FileController ~ fs.readFile ~ obj", obj[5])
            };
            
        });
        
    }
}

async create (req, res, next) {
//         try {
//             obj.forEach(element => {
//                 if (element.title != Item[element].title) {
                                        
//                     const items = Item.create({title: element.Title, release_year:  element.ReleaseYear, format: element.Format, stars: element.Stars})
//                     // console.log("🚀 ~ file: uploadFile.js ~ line 46 ~ fs.readFile ~ item", item)
//                     return res.json(items)
//                 }
//             })
            
            
//         } catch (e) {
//             // console.log(e)
//         }
}
}
module.exports = new FileController()