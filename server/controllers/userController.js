const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const ApiError = require('../errors/ApiErrors')
const {User} = require('../models/models')


const generateJWT = (id, email) => {
    return jwt.sign(
        {id, email},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}


class UserController {
    async registration (req, res, next) {
        const {email, password} = req.body
        if (!email || !password) {
            return next(ApiError.badRequest('Не вірно вказаний email чи password!!!'))
        }
        const candidate = await User.findOne({where: {email}})
        if (candidate) {
            return next(ApiError.badRequest('Користувач з такою електронною адресою вже існує!!!'))
        }
        const hashPassword = await bcrypt.hash(password, 5) //визначаємо максимальну кількість хешувань
        const user = await User.create({email, password: hashPassword})
        const token = generateJWT(user.id, user.email)
        return res.json({token, user})
    }

    async login (req, res) {
        const {email, password} = req.body
        const user = await User.findOne({where: {email}})
        if(!user) {
            return ApiError.badRequest('Користувача не знайдено!')
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) {
            return ApiError.badRequest('Пароль введено не правильно')
        }
        const token = generateJWT(user.id, user.email)
        return res.json({token, user})
    }

    async check (req, res, next){
        const token = generateJWT(req.user.id, req.user.email)
        return res.json({token})
    }

}

module.exports = new UserController()