import express from 'express'
import colors from 'colors'
import router from './router'
import db from './config/db'

// Connection to DataBase
async function connectDB() {
    try {
        await db.authenticate()
        db.sync()
        console.log(colors.green('CONNECTION TO DB SUCCESSFUL'))
    } catch (error) {
        console.error(colors.red(error))
        console.error(colors.red.bold('ERROR CONNECT TO DB'))
    }
    
}

connectDB()

const server = express()
server.use('/api/products', router)

export default server