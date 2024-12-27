import express from 'express'
import colors from 'colors'
import router from './router'
import db from './config/db'

// Connection to DataBase
export async function connectDB() {
    try {
        await db.authenticate()
        db.sync()
       // console.log(colors.green('CONNECTION TO DB SUCCESSFUL'))
    } catch (error) {
        //console.error(colors.red(error))
        console.log(colors.red.bold('ERROR CONNECT TO DB'))
    }
    
}

connectDB()

// Express instance
const server = express()
// Read data from forms
server.use(express.json())
server.use('/api/products', router)

server.get('/api', (req, res) => {
    res.json({msg: 'From API'})
})

export default server