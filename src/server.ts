import express from 'express'
import router from './router'
import db from './config/db'

// Connection to DataBase
async function connectDB() {
    try {
        await db.authenticate()
        db.sync()
        console.log('CONNECTION TO DB SUCCESSFUL')
    } catch (error) {
        console.error(error)
        console.error('ERROR CONNECT TO DB')
    }
    
}

connectDB()

const server = express()

server.use('/api/products', router)

export default server