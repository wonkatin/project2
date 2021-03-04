const router = require('express').Router()
const db = require('../models')

//Create review (save a recipe to DB)
router.post('/', async (req, res) => {
    try {
        // let uri = encodeURIComponent(req.body.uri)
        const [newReview, created] = await db.recipe.findOrCreate({
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
        res.locals.user.addRecipe(newReview)
        res.redirect('/users/profile')
    } catch (error) {
        console.log(error)
    }
})

module.exports = router