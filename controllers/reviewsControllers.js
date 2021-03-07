const router = require('express').Router()
const db = require('../models')
//create review
router.post('/', async (req, res) => {
    try {
        // console.log(req.body)
        const [recipe, created] = await db.recipe.findOrCreate({
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
            },
            include: db.review
        })
        const user = res.locals.user
        const newReview = await db.review.create({
            userId: user.id,
            recipeId: recipe.id,
            rating: req.body.rating, 
            content: req.body.content
        })
        // let recipeUsers = []
        const recipeInfo = await recipe.getReviews({include: db.user})
        // recipeUsers = await recipe.getReviews({include: db.user})
        res.render('recipes/detail', { 
            recipe: recipe, 
            reviews: recipeInfo, 
            users: recipeInfo 
        })
    } catch (error) {
        console.log(error)
    }
})
//update review
router.put('/:id', async (req, res) => {
    try {
        const review = await db.review.findByPk(req.params.id)
        // const recipe = await review.getRecipe()
        const recipe = await review.getRecipe()
        await review.update({
            rating: req.body.rating,
            content: req.body.content
        })
        const recipeInfo = await recipe.getReviews({include: db.user})
        res.render('recipes/detail', {
            recipe: recipe, 
            reviews: recipeInfo,
            users: recipeInfo
        })
    } catch (error) {
        console.log(error)
    }
})
//delete review
router.delete('/:id', async(req, res) => {
    try {
        const review = await db.review.findByPk(req.params.id)
        const recipe = await review.getRecipe()
        await review.destroy()
        const recipeInfo = await recipe.getReviews({include: db.user})
        res.render('recipes/detail', { 
            recipe: recipe, 
            reviews: recipeInfo,
            users: recipeInfo 
         })
    } catch (error) {
        console.log(error)
    }
})


module.exports = router