const express = require('express')
const logger = require('morgan')
const bodyParser = require('body-parser')

const usersRoute = require('./routes/user')
const decksRoute = require('./routes/deck')
const db = require('./config/db');


const app = express();
db.connect()
// Middleware
app.use(logger('dev'))

app.use(express.json())
app.use(bodyParser.json())

app.use('/users', usersRoute)
app.use('/decks', decksRoute)
// Route
app.get('/', (req, res, next) => {
    return res.status(200).json({
        message: 'Server is OK !'
    })
})

// Catch 404
app.use((req, res, next) => {
    const err = new Error('Not Found !');
    err.status = 404
    next();
})

// Error handler function
app.use((err, req, res, next) => {
    const error = app.get('env') === 'development' ? err : {}
    const status = err.status || 500

    return res.status(status).json({
        error: {
            message: error.message
        }
    })
})




const port = app.get('port') || 3000
app.listen(port, () => {
    console.log(`Server is running on port ${port} !`);
})