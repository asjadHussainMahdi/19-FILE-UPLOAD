require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const config = require('config')
// const chalk = require('chalk')

const setMiddleware = require('./middleware/middleware')
const setRoutes = require('./routes/routes')

const MONGODB_URI = `mongodb+srv://${config.get('db-username')}:${config.get(
    'db-password'
)}@cluster0.iovozar.mongodb.net/`

const app = express()

// Setup View Engine
app.set('view engine', 'ejs')
app.set('views', 'views')

// Using Middlewares from Middleware Directory
setMiddleware(app)

// Using Routes from Route Directory
setRoutes(app)

app.use((req, res, next) => {
    let error = new Error('404 Page Not Found')
    error.status = 404
    next(error)
})

app.use((error, req, res, next) => {
    if (error.status === 404) {
        return res.render('pages/error/404', { flashMessage: {} })
    }
    console.log(error)
    res.render('pages/error/500', { flashMessage: {} })
})

const PORT = process.env.PORT || 8080
mongoose
    .connect(MONGODB_URI)
    .then(() => {
        console.log('Database Connected')
        app.listen(PORT, () => {
            console.log(`Server is Running on PORT ${PORT}`)
        })
    })
    .catch((e) => {
        return console.log(e)
    })
