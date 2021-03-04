const router = require('express').Router()
const db = require('../models')
const cryptojs = require('crypto-js')
const bcrypt = require('bcrypt')
const axios = require('axios')
const EDAMAM_APP_ID = process.env.EDAMAM_APP_ID
const EDAMAM_APP_KEY = process.env.EDAMAM_APP_KEY

//show all recipes of search results
router.get('/results', async(req, res) => {
    try {
        const search = `${req.query.search1}+${req.query.search2}+${req.query.search3}+${req.query.search4}+${req.query.search2}`
        // const maxIngr = `&ingr=${req.query.ingr}`
        const results = await axios.get(`https://api.edamam.com/search?q=${search}&app_id=${EDAMAM_APP_ID}&app_key=${EDAMAM_APP_KEY}`)
        // console.log(results.data)
        res.render('recipes/results', { hits: results.data.hits })
    } catch(error){
        console.log(error)
    }
})
//show one recipe from results
router.get('/detail', async (req, res) => {
    try {
        let uri = encodeURIComponent(req.query.uri)
        // console.log(uri)
        const deets = await axios.get(`https://api.edamam.com/search?r=${uri}&app_id=${EDAMAM_APP_ID}&app_key=${EDAMAM_APP_KEY}`)
        res.render('recipes/detail', { recipe: deets.data[0] })
    } catch (error) {
        console.log(error)
    }
})


module.exports = router