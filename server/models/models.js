'use strict'
const sequelize = require('../db')
const {DataTypes} = require("sequelize")


const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING}
})


const Item = sequelize.define('item', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING},
    release_year: {type: DataTypes.INTEGER},
    format: {type: DataTypes.STRING},
    stars: {type: DataTypes.STRING}
})


module.exports = {
    User,
    Item
}