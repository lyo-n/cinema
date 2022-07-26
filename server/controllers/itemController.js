// const uuid = require('uuid')
// const path = require('path')
const ApiError = require('../errors/ApiErrors')
const {Item} = require('../models/models')




class ItemController {
    async create (req, res, next) {
        try {
            let {title, release_year, format, stars} = req.body
            // const {img} = req.files
            // let fileName = uuid.v4() + ".jpg"
            // img.mv(path.resolve(__dirname, '..', 'static', fileName))

            const item = await Item.create({title, release_year, format, stars})  
            return res.json(item)
        } catch (e){
            next(ApiError.badRequest(e.message))
        }
    
    } 

    async getAll (req, res) {
        const {stars, title} = req.query
        let items;
        if (!stars && !title) {
            items = await Item.findAndCountAll()
        }
        // if (title) {
        //     items = await Item.findAndCountAll({where:{title}, raw: true })
        // }
        // if (stars) {
        //     items = await Item.findAndCountAll({where:{stars}, raw: true })
        // }
        // if (title && stars) {
        //     items = await Item.findAndCountAll({where:{stars, title}, raw: true })
        // }
        return res.json(items)
    }



    async getOneElement (req, res) {
        const {title, stars} =  req.body
        if (title){
        const item = await Item.findOne({where: {title}})
        return res.json(item)
        } else if (stars) {
            // const item = await Item.findOne({where: {stars}})
            const item = await Item.findOne({where: {stars}[stars.req.body]})
            return res.json(item)
        }
    }




    async getOne (req, res) {
        const {id} =  req.params
        const item = await Item.findOne(
            {
                where: {id}
            }
        )
        return res.json(item)
    }
}

module.exports = new ItemController()