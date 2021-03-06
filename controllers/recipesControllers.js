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
        // const maxIngr = `&ingr=${req.query.ingr}`
        const results = await axios.get(`https://api.edamam.com/search?q=${search}&app_id=${EDAMAM_APP_ID}&app_key=${EDAMAM_APP_KEY}`)
        // console.log(results.data)
        const searchTerms = search.split("+").join(" ")
        res.render('recipes/results', { hits: results.data.hits, search: searchTerms })
    } catch(error){
        console.log(error)
    }
})
//show one recipe detail page 
router.get('/detail', async (req, res) => {
    try {
        const recipe = await db.recipe.findOne({
            where: {uri: req.query.uri},
            include: [{model: db.review}, {model: db.user}]
        })
        // console.log(recipe.dataValues.users)
        let uri = encodeURIComponent(req.query.uri)
        const deets = await axios.get(`https://api.edamam.com/search?r=${uri}&app_id=${EDAMAM_APP_ID}&app_key=${EDAMAM_APP_KEY}`)
        // const username = recipe.dataValues.users
        let reviews = null 
        if (recipe) {
            reviews = recipe.reviews
        }
        // console.log(reviews[0])
        // const recipeReviews = await recipe.getReviews({
        //     include: [db.user]
        // })
        // const reviewUsers = recipeReviews.map(rev => {
        //     return rev.dataValues.user
        // })
        // const uniqueReviewUser = [...new Set(reviewUsers)]
        // console.log(reviewUsers)
        res.render('recipes/detail', { 
            recipe: deets.data[0], 
            reviews: reviews,
            // reviewUsers: uniqueReviewUser
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
        console.log(recipe)
        const user = await db.user.findOne({
            where: {id: res.locals.user.id},
            // include: db.recipe
        })
        console.log(user)
        // await recipe.destroy()
        // res.locals.user.recipe.destroy()
        await user.removeRecipe(recipe)
        res.redirect('/users/profile')
    } catch (error) {
        console.log(error)
    }
})
// router.delete('/:id', async(req, res) => {
//     try {
//         const recipe = await db.recipe.findOne({
//             where: {
//                 id: req.body.id
//             }
//         })
//         console.log(recipe)
//         // await recipe.destroy()
//         res.redirect('/users/profile')
//     } catch (error) {
//         console.log(error)
//     }
// })
module.exports = router