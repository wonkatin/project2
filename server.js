require('dotenv').config()
const express = require('express')
const rowdy = require('rowdy-logger')
const axios = require('axios')
const db = require('./models')
const ejsLayouts = require('express-ejs-layouts')
const methodOverride = require('method-override')
const morgan = require('morgan')
// const cryptojs = require('crypto-js')
// const bcrypt = require('bcrypt')
const EDAMAM_APP_ID = process.env.EDAMAM_APP_ID
const EDAMAM_APP_KEY = process.env.EDAMAM_APP_KEY


const app = express()
// const PORT = process.env.PORT || 3000
const PORT = 3000
const rowdyRes = rowdy.begin(app)

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))
app.use(ejsLayouts)
app.use(methodOverride('_method'))
app.use(morgan('dev'))
// app.use(cookieParser())

app.get('/', function(req, res) {
    res.render('index')
})
app.get('/results', async(req, res) => {
    try {
        const search = `${req.query.search1}+${req.query.search2}+${req.query.search3}+${req.query.search4}+${req.query.search2}`
        // const maxIngr = `&ingr=${req.query.ingr}`
        const results = await axios.get(`https://api.edamam.com/search?q=${search}&app_id=${EDAMAM_APP_ID}&app_key=${EDAMAM_APP_KEY}`)
        // console.log(results.data)
        res.render('results', { hits: results.data.hits })
    } catch(error){
        console.log(error)
    }
})


app.listen(PORT, () => {
    console.log('server started!');
    rowdyRes.print()
})