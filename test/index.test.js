const { db } = require('../db')
const { Board, Cheese, User } = require('../src/Association')
const {
    seedUser,
    seedBoard,
    seedCheese,
 } = require('../src/seedData')

describe('User, Board and Cheese Models', () => {

    beforeEach(async () => {
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

    test.only('Board can be loaded with Cheese', async () => {
        const testBoard = await Board.create(seedBoard[0])
        const testCheese = await Cheese.create(seedCheese[0])

        await testBoard.addCheese(testCheese)

        const queryCheeses = await testBoard.getCheeses()

        expect(queryCheeses[0] instanceof Cheese).toBeTruthy
    })

    test('User can be loaded with Board', async () => {
        const testBoard = await Board.create(seedBoard[0])
        const testUser = await User.create(seedUser[0])

        await testUser.addBoard(testBoard)

        const queryBoards = await testUser.getBoards()
        /**
         * When we .getBoards(), the method return an array because boardS is plural
         * Even if there is only one board! So line 51 will return [board1]
         * Now board1 is an instance of Board,
         * but [board1] is not, because it is actually in instance of Array
         * Note that [board1][0] === board1
         * If we had more boards, e.g., [board1, board2, board3], then
         * userBoards[2] === board3, etc
         */

        expect(queryBoards[0] instanceof Board).toBeTruthy
    })

    test.only('Cheese can be loaded with Board data', async () => {
        const testBoard = await Board.create(seedBoard[0])
        const testCheese = await Cheese.create(seedCheese[0])

        await testBoard.addCheese(testCheese)

        // Going to get a cheese from the Cheese table
        // Normally, the cheese entry would be returned without the board data
        const queryCheese = await Cheese.findOne({ include: Board })

        expect(queryCheese.toJSON()).toBeTruthy
    })
})