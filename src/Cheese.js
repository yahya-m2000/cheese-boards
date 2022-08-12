const { db } = require('../db');
const { DataTypes } = require('sequelize');

const Cheese = db.define('Cheese', {
    title: {
        type: DataTypes.STRING
    },
    description: {
        type: DataTypes.STRING
    },
})

module.exports = {
    Cheese,
}