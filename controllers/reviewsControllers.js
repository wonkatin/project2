const router = require('express').Router()
const db = require('../models')

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
    res.render('recipes/detail', { recipe: recipe, reviews: recipe.dataValues.reviews })
    } catch (error) {
        console.log(error)
    }
})


module.exports = router