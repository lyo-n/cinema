const {Sequelize} = require('sequelize')

module.exports = new Sequelize(
    process.env.DB_NAME, // назва БД
    process.env.DB_USER,// ім'я користувача
    process.env.DB_PASSWORD, // пароль БД
    {
        dialect: 'sqlite',
        host: './dev.sqlite'        
    }
)