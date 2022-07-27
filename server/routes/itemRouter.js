const Router = require('express')
const router = new Router()
const itemController = require('../controllers/itemController')



router.post('/', itemController.create)
router.get('/', itemController.getAll) //всі об'єкти, по назві фільму, по акторам
router.get('/:id', itemController.getOne)
router.delete('/', itemController.delete)


module.exports = router