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
        let recipeUsers = []
        const reviews = await recipe.getReviews({include: db.user})
        recipeUsers = await recipe.getReviews({include: db.user})
    res.render('recipes/detail', { 
        recipe: recipe, 
        reviews: reviews, 
        users: recipeUsers 
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
        let recipeUsers = []
        let newRecipeReviews = []
        const recipeReviews = await recipe.getReviews({include: db.user})
        recipeUsers = await recipe.getReviews({include: db.user})
        // console.log(recipeReviews)
        // console.log(`🔥 🔥 🔥  ${recipeReviews}`)  
        // console.log(`😇 😇 😇   ${recipe}`)   
        // console.log(`🍓 🍓 🍓   ${review}`) 
        //hold the reviews I need to keep in an array like hug
        recipeReviews.forEach(recipeReview => {
            if (recipeReview.id !== review.id) {
                console.log(recipeReview)
                console.log(review)
                newRecipeReviews.push(recipeReview)
            }
        })
        await review.destroy()
        res.render(`recipes/detail`, { 
            recipe: recipe, 
            reviews: newRecipeReviews,
            users: recipeUsers 
         })
    } catch (error) {
        console.log(error)
    }
})


module.exports = router