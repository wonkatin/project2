const db = require('./models')
// const axios = require('axios')
// require('dotenv').config()

// const EDAMAM_APP_ID = process.env.EDAMAM_APP_ID
// const EDAMAM_APP_KEY = process.env.EDAMAM_APP_KEY

// async function test() {
//     try {   
//         const results = await axios.get(`https://api.edamam.com/search?q=ground chuck+tomatoes+potatoes+cheddar&app_id=${EDAMAM_APP_ID}&app_key=${EDAMAM_APP_KEY}`)
//         console.log(results.data)
//     } catch(error) {
//         console.log(error)
//     }
// }
// test()

// async function test() {
//     try {
//         const user = await db.user.findOne({ 
//             where: {
//                 id: 1
//             }, 
//             include: [db.recipe, db.review]
//         })
//         console.log(user)
//     } catch (error) {
//         console.log(error)
//     }
// }
// test()
// console.log(db)
// async function test() {
//     try {
//         const recipe = await db.recipe.findOne({where: { id: 1 }})
//         const user = await db.user.findOne({where: {id: 1}})
//         const review = await db.review.create({
//             rating: 3,
//             content: "this sucks",
//             recipeId: recipe.id,
//             userId: user.id
//         })
//         console.log(user)
//     } catch (error) {
//         console.log(error)
//     }
// }
// test()