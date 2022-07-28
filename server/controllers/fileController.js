const {newArr} = require('../fileService/uploadFile')
const {Item} = require('../models/models')



class FileController {
    async create (req, res, next) {
        try {
            let {title, release_year, format, stars} = req.body
            const item = await Item.create({title, release_year, format, stars})  
            return res.json(item)
        } catch (e){
            console.log(e)
            next(ApiError.badRequest(e.message))
        }
        console.log('WTF')
    }

}

module.exports = new FileController();