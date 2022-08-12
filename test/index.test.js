const { db } = require('../db')
const { Board, Cheese, User } = require('../src/data')
const {
    seedUser,
    seedBoard,
    seedCheese
 } = require('../src/seedData')

describe('User, Board and Cheese Models', () => {
    beforeAll(async () => {
        await db.sync({ force: true })
    })

    test('can create User', async () => {
        const testUser = await User.create(seedUser[0])
        expect(testUser.name).toBe(seedUser[0].name)
        expect(testUser.email).toBe(seedUser[0].email)
    })

    test('can create Cheese', async () => {
        const testCheese = await Cheese.create(seedCheese[0])
        expect(testCheese.title).toBe(seedCheese[0].title)
        expect(testCheese.description).toBe(seedCheese[0].description)
    })

    test('can create Board', async () => {
        const testBoard = await Board.create(seedBoard[0])
        expect(testBoard.type).toBe(seedBoard[0].type)
        expect(testBoard.description).toBe(seedBoard[0].description)
        expect(testBoard.rating).toBe(seedBoard[0].rating)
    })
})