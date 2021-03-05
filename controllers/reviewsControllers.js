const router = require('express').Router()
const db = require('../models')

router.post('/', async (req, res) => {
    try {
        // console.log(req.body)
        const recipe = await db.recipe.findOne({where: { uri: req.body.uri }})
        const user = res.locals.user
        const newReview = await db.review.create({
            userId: user.id,
            recipeId: recipe.id,
            rating: req.body.rating, 
            content: req.body.content
        })
    res.render('recipes/detail', { recipe: req.body.uri })
    } catch (error) {
        console.log(error)
    }
})


module.exports = router