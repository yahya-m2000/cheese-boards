const { Sequelize } = require('sequelize')

const db = new Sequelize({
    dialect: 'sqlite',
    storage: './data.sqlite'
})

module.exports = {
    db,
    Sequelize
}