const router = require('express').Router()
const db = require('../models')
const cryptojs = require('crypto-js')
const bcrypt = require('bcrypt')
const axios = require('axios')
const user = require('../models/user')
const EDAMAM_APP_ID = process.env.EDAMAM_APP_ID
const EDAMAM_APP_KEY = process.env.EDAMAM_APP_KEY

//show all recipes of search results
router.get('/results', async(req, res) => {
    try {
        const search = `${req.query.search1}+${req.query.search2}+${req.query.search3}+${req.query.search4}+${req.query.search5}`
        if (req.query.ingr) {
            maxIngr = `${req.query.ingr}`
        } else {
            maxIngr = 30
        }
        // console.log(maxIngr)
        const results = await axios.get(`https://api.edamam.com/search?q=${search}&app_id=${EDAMAM_APP_ID}&app_key=${EDAMAM_APP_KEY}&ingr=${maxIngr}&to=50`)
        console.log(results) 
        res.render('recipes/results', { hits: results.data.hits, search: results.data.q, count: results.data.count, more: results.data.more, from: results.data.from, to: results.data.to })
    } catch(error){
        console.log(error)
    }
})

//show one recipe detail page 
router.get('/detail', async (req, res) => {
    try {
        const recipe = await db.recipe.findOne({
            where: {uri: req.query.uri},
            include: [{
                model: db.review, 
                include: db.user
            }]
        })
        
        let uri = encodeURIComponent(req.query.uri)
        const deets = await axios.get(`https://api.edamam.com/search?r=${uri}&app_id=${EDAMAM_APP_ID}&app_key=${EDAMAM_APP_KEY}`)
        let reviews = null 
        let recipeUsers = []
        let ingredients = []
        if (recipe) {
            reviews = recipe.reviews
            recipeUsers = await recipe.getUsers({ raw: true })
            ingredients = recipe.ingredientLines.split(",")
        }
        ingredients = deets.data[0].ingredientLines
        
        console.log(ingredients)
        res.render('recipes/detail', { 
            recipe: deets.data[0], 
            reviews: reviews,
            users: recipeUsers,
            ingredients: ingredients
        })
       
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

//delete recipe from user's saved recipes
router.delete('/:id', async(req, res) => {
    try {
        const recipe = await db.recipe.findOne({
            where: {
                id: req.body.id
            }
        })
        // console.log(recipe)
        const user = await db.user.findOne({
            where: {id: res.locals.user.id}
        })
        // console.log(user)
        await user.removeRecipe(recipe)
        res.redirect('/users/profile')
    } catch (error) {
        console.log(error)
    }
})

module.exports = router