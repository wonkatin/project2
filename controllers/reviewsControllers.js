const router = require('express').Router()
const db = require('../models')

//Create review (save a recipe to DB)
router.post('/', async (req, res) => {
    try {
        // let uri = encodeURIComponent(req.body.uri)
        const [newReview, created] = await db.recipe.findOrCreate({
            where: {
                uri: req.body.uri
            }
        })
        res.locals.user.addRecipe(newReview)
        res.redirect('/users/profile')
    } catch (error) {
        console.log(error)
    }
})

module.exports = router