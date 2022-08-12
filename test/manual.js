const { db } = require('../db')
const { Board, Cheese, User } = require('../src/Association')

async function test () {

    await db.sync({ force: true })

    const cheese = await Cheese.create({
        title: 'Cheddar',
        description: 'Tangy'
    })

    const board = await Board.create({
        type: 'Vegan',
        description: 'Nordic spleandour!',
        rating: 7
    })

    await board.addCheese(cheese)

    const queryCheese = await Cheese.findOne({ include: Board })
    console.log(queryCheese.toJSON())

}

test()
