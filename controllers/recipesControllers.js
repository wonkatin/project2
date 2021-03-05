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
        const reviews = await db.recipe.findOne({
            where: {uri: req.query.uri},
            include: db.review
        })
        let uri = encodeURIComponent(req.query.uri)
        // console.log(uri)
        const deets = await axios.get(`https://api.edamam.com/search?r=${uri}&app_id=${EDAMAM_APP_ID}&app_key=${EDAMAM_APP_KEY}`)
        console.log(reviews.dataValues.reviews)
        res.render('recipes/detail', { recipe: deets.data[0], reviews: reviews.dataValues.reviews })
    } catch (error) {
        console.log(error)
    }
})

//save recipe to user's profile (save a recipe to DB)
router.post('/', async (req, res) => {
    try {
        // let uri = encodeURIComponent(req.body.uri)
        const [newRecipe, created] = await db.recipe.findOrCreate({
            where: {
                uri: req.body.uri
            },
            defaults: {
                label: req.body.label,
                uri: req.body.uri,
                image: req.body.image,
                source: req.body.source,
                url: req.body.url,
                ingredientLines: req.body.ingredientLines,
                cautions: req.body.cautions,
                dietLabels: req.body.dietLabels,
                healthLabels: req.body.healthLabels,
            }
        })
        res.locals.user.addRecipe(newRecipe)
        res.redirect('/users/profile')
    } catch (error) {
        console.log(error)
    }
})

module.exports = router