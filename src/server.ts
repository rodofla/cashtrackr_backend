import express from 'express'
import colors from 'colors'
import morgan from 'morgan'
import { db } from './config/db'
import budgetRouter from './routes/budgetRouter'

async function connectDB() {
    try {
        await db.authenticate()
        console.log(colors.blue.bold('Database connection authenticated successfully'))
        // Sync the models with the database
        // This will create the tables if they do not exist
        // and will not drop any existing tables
        await db.sync()
        console.log(colors.blue.bold('Database connection established successfully'))
        // Uncomment the line below to drop the database and recreate it
        // await db.sync({ force: true })
        // console.log(colors.yellow('Database dropped and recreated'))
    } catch (error) {
        console.error(colors.red.bold('Error connecting to the database'))
        console.error(error)
    }

}
// Connect to the database
connectDB()

// Initialize the express application
const app = express()

app.use(morgan('dev'))

app.use(express.json())

app.use('/api/v1/budgets', budgetRouter)




export default app