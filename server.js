/* Required Modules and Variables */
require('dotenv').config()
const express = require('express')
const rowdy = require('rowdy-logger')
// const axios = require('axios')
const db = require('./models')
const ejsLayouts = require('express-ejs-layouts')
const methodOverride = require('method-override')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const cryptojs = require('crypto-js')
const bcrypt = require('bcrypt')
// const EDAMAM_APP_ID = process.env.EDAMAM_APP_ID
// const EDAMAM_APP_KEY = process.env.EDAMAM_APP_KEY
const app = express()
// const PORT = process.env.PORT || 3000
const PORT = 3000
const rowdyRes = rowdy.begin(app)


/* Middleware and config */
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))
app.use(ejsLayouts)
app.use(methodOverride('_method'))
app.use(morgan('dev'))
app.use(cookieParser())


// Adds the user to res.locals.user if there's a cookie
app.use(async (req, res, next) => {
    if (req.cookies.userId) {
        const decryptedUserId = cryptojs.AES.decrypt(req.cookies.userId, process.env.SECRET_STRING)
        const decryptedUserIdString = decryptedUserId.toString(cryptojs.enc.Utf8)
        const user = await db.user.findByPk(decryptedUserIdString)
        res.locals.user = user
    } else {
        res.locals.user = null
    }
    next()
})


/* Controllers */
app.use('/recipes', require('./controllers/recipesControllers'))    
app.use('/users', require('./controllers/usersControllers'))
app.use('/reviews', require('./controllers/reviewsControllers'))


/* Routes */
//Show the homepage
app.get('/', async (req, res) => {
    const recipes = await db.recipe.findAll({
        include: db.user
    })
        console.log(recipes)
    res.render('index', {
        recipes: recipes, 
        // users: recipeUsers
    })
})


app.listen(PORT, () => {
    rowdyRes.print()
})