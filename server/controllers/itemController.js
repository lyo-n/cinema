// const uuid = require('uuid')
// const path = require('path')
const ApiError = require('../errors/ApiErrors')
const {Item} = require('../models/models')




class ItemController {
    async create (req, res, next) {
        try {
            let {title, release_year, format, stars} = req.body
            const item = await Item.create({title, release_year, format, stars})  
            return res.json(item)
        } catch (e){
            console.log(e)
            next(ApiError.badRequest(e.message))
        }
    
    } 

    async getAll (req, res, next) {
        try {
        const {stars, title} = req.body   
        
        //Дістаємо всі об'єкти з бази
        if (!stars && !title){       
        let items = await Item.findAndCountAll()             
            return res.json(items)
        } 

        //Дістаємо об'єкт з фільмом по назві фільму, по слову
        if (title) {
        let itemForTitle = await Item.findAndCountAll()
        let rows = {...itemForTitle}
        for (let i = 0; i <= rows.rows.length; i++) { 
            if (rows.rows[i].dataValues.title.includes({title}.title) !== null) { 
                let result = rows.rows.filter(item => item.dataValues.title.includes({title}.title) === true)
                return res.json(result) 
            }
        }
        }   
         //Дістаємо об'єкт з фільмом по актору, по слову
        else if (stars) {
            let itemForStars = await Item.findAndCountAll()
            let rows = {...itemForStars}
            for (let i = 0; i <= rows.rows.length; i++) { 
                if (rows.rows[i].dataValues.title.includes({stars}.stars) !== null) { 
                let result = rows.rows.filter(item => item.dataValues.stars.includes({stars}.stars) === true)
                    return res.json(result) 
                }
            }
        }
        } catch (e) {
            console.log(e)
            next(ApiError.badRequest(e.message))
        }
    }

    async getOne (req, res, next) {
        try {
        const {id} =  req.params
        const item = await Item.findOne({where: {id}})
            return res.json(item)
        } catch (e) {
            console.log(e)
            next(ApiError.badRequest(e.message))
        }
    }

    async delete (req, res, next) {
        try {
            // const searchName = req.body.search
            const {id} =  req.body
            const item = await Item.findOne(
                {
                    where: {id}
                }
            )
            if (!item) {
                return res.status(400).json({message: 'Фільм не знайдено'})
            }
            await item.destroy()
            return res.json({message: 'Фільм видалено'})
        } catch (e) {
            console.log(e)
            next(ApiError.badRequest(e.message))
        }

    }


}

module.exports = new ItemController()