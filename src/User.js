const { db } = require('../db');
const { DataTypes } = require('sequelize');

const User = db.define('User', {
    name: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    }
})

module.exports = {
    User,
}