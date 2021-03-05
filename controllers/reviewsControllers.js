const router = require('express').Router()
const db = require('../models')

router.post('/', async (req, res) => {
    try {
        const recipe = 
        const user = 
        const newReview = await db.review.create({
            userId: user.id,
            recipeId: recipe.id,
            rating: , 
            content: ""
        })

    } catch (error) {
        console.log(error)
    }
})


module.exports = router