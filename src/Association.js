const { User} = require('./User')
const { Board} = require('./Board')
const { Cheese } = require('./Cheese')


Board.belongsTo(User)
User.hasMany(Board)
Cheese.belongsToMany(Board, { through: 'Board_Cheese' })
Board.belongsToMany(Cheese, { through: 'Board_Cheese' })

module.exports = {
    User,
    Board,
    Cheese,
}