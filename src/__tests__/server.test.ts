import request from "supertest"
import server, { connectDB } from "../server"
import db from "../config/db"

jest.mock('../config/db')

describe('Connect to DB', () => {
    it('Should handle database connection error', async () => {
        jest.spyOn(db, 'authenticate').mockRejectedValueOnce(new Error('ERROR CONNECT TO DB'))
        const consoleSpy = jest.spyOn(console, 'log')

        await connectDB()

        expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('ERROR CONNECT TO DB'))
    })
})