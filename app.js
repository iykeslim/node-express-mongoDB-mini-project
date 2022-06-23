const express = require('express')
const app = express()
const tasks = require('./routes/tasks')
const connectDB = require('./db/connect')
require('dotenv').config()
const notFound = require('./middleware/not-found.js')
const errorHandlerMiddleware = require("./middleware/error-handler");

// Middleware to access req.body
app.use(express.static('./public'))
app.use(express.json())

// app.get('/hello', (req, res) => {
    //     res.send('Task Manager')
    // })
    
    // Routes
// this is coming from ./routes/tasks.js because it's our entry point we import or require the routes here
app.use('/api/v1/tasks', tasks)

// Not found response middleware   
app.use(notFound)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 3000

const start = async () => {
    try { 
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`server is listenning on port ${port}...`))
    } catch (error) {
        console.log(error)
    }
}

start()
