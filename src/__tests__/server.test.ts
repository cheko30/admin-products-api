import request from "supertest"
import server, { connectDB } from "../server"
import db from "../config/db"

describe('GET /api', () => {
    it('should send back a json response', async () => {
        const res = await request(server).get('/api')

        expect(res.status).toBe(200)
        expect(res.header['content-type']).toMatch(/json/)
        expect(res.body.msg).toBe('From API')

        expect(res.status).not.toBe(404)
        expect(res.body.msg).not.toBe('From api')
    })
})

jest.mock('../config/db')

describe('Connect to DB', () => {
    it('Should handle database connection error', async () => {
        jest.spyOn(db, 'authenticate').mockRejectedValueOnce(new Error('ERROR CONNECT TO DB'))
        const consoleSpy = jest.spyOn(console, 'log')

        await connectDB()

        expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('ERROR CONNECT TO DB'))
    })
})