const Router = require('express')
const router = new Router()
const ItemUploadController = require('../controllers/fileController')



router.post('/', ItemUploadController.create)

module.exports = router