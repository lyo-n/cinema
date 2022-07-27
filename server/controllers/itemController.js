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
    //////ПРАЦЮЮЧЕ
        // let items;        
        //     items = await Item.findAndCountAll()             
        //     return res.json(items)


        let itemForTitle = await Item.findAndCountAll()
        let rows = {...itemForTitle}
        for (let i = 0; i < rows.rows.length; i++) { 
            // // console.log(rows.rows[i].dataValues) 
            // if (rows.rows[i].dataValues.title === null){
            //     next();
            // }
            if (rows.rows[i].dataValues.title.includes(req.body.title) !== null) { 
                console.log('fuck yea')//////////////////////////////////DELEEEETEEEEE
                console.log(i)
                let result = rows.rows.filter(item => item.dataValues.title != req.body.title)
                return res.json(result)      
        } else {
            console.log("fuck u")//////////////////////////////////DELEEEETEEEEE
        }
            // const resultTitle = (rows.rows[i].dataValues);
            
        }
    }



    async getOneElement (req, res) {
        let actors = getAll(items)

        if (title) {
            // let itemForTitle = await Item.findAndCountAll()
            for (let i = 0; i < actors.rows.length; i++) { 
                if (ractors.rows[i].title.includes(req.body)) { 
                    console.log(actors.rows[i]) 
                }
            }
            return res.json(itemForTitle)



/////Потрібно!!!

        // let {title} =  req.body
        // let {stars} = req.body
        // if (title){
        // const item = await Item.findOne({where: {title}})
        // return res.json(item)
        // } else if (stars) {
        //     // const item = await Item.findOne({where: {stars}}
        //     const item = await Item.findOne({where: {stars}})
            
        //     // console.log({stars})
        //     return res.json(item)
            
            
        // }
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