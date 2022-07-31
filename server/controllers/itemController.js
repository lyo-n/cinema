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
        const {stars, title, sort} = req.body   
        
        //Дістаємо всі об'єкти з бази
        if (sort === false){       
        let items = await Item.findAndCountAll()     
            return res.json(items)
        } 

        //Сортуємо у алфавітному порядку
        else if (sort === true ) {
            let items = await Item.findAndCountAll()
            let arr = {...items}
            function compare(a, b) {
                if (a.dataValues.title < b.dataValues.title){
                    return -1;
                }
                if (a.dataValues.title > b.dataValues.title){
                    return 1;
                }
            return 0;
            }
            return res.json(arr.rows.sort(compare))            
        }

        //Дістаємо об'єкт з фільмом по назві фільму
        else if (title) {
            let items = await Item.findAndCountAll()
            let arr = {...items}
        for (let i = 0; i <= arr.rows.length; i++) {
            if (arr.rows[i].dataValues.title.includes({title}.title) !== null) { 
                let result = arr.rows.filter(item => item.dataValues.title.includes({title}.title) === true)
            return res.json(result) 
            }
        }
        }   
         //Дістаємо об'єкт з фільмом по актору
        else if (stars) {
                let items = await Item.findAndCountAll()
                let arr = {...items}
            for (let i = 0; i <= arr.rows.length; i++) { 
                if (arr.rows[i].dataValues.title.includes({stars}.stars) !== null) { 
                let result = arr.rows.filter(item => item.dataValues.stars.includes({stars}.stars) === true)
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
            const {id} =  req.body
            const item = await Item.findOne({where: {id}})
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