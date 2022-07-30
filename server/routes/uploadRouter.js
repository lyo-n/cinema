const Router = require('express')
const router = new Router()
const {upload} = require('../controllers/fileController')



router.post('/', upload)

module.exports = router