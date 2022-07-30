const Router = require('express')
const router = new Router()
const userRouter = require('./userRouter')
const itemRouter = require('./itemRouter')
// const uploadRouter = require('./uploadRouter')



router.use('/user', userRouter)
router.use('/item', itemRouter)
// router.use('/upload', uploadRouter)



module.exports = router