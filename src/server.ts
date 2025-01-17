import express from 'express'
import colors from 'colors'
import cors, { CorsOptions } from 'cors'
import swaggerUi from 'swagger-ui-express'
import swaggerSpec, { swaggerOptions } from './config/swagger'
import router from './router'
import db from './config/db'
import morgan from 'morgan'

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

// CORS
const corsOptions: CorsOptions = {
    origin: function(origin, callback) {
        if(origin === process.env.FRONTEND_URL) {
            callback(null, true)
        } else {
            callback(new Error('CORS Error'))
        }
    }
}

server.use(cors(corsOptions))

// Logger
server.use(morgan('dev'))

// Read data from forms
server.use(express.json())
server.use('/api/products', router)

// Documentation
server.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec,swaggerOptions))

export default server