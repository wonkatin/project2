const axios = require('axios')
require('dotenv').config()

const EDAMAM_APP_ID = process.env.EDAMAM_APP_ID
const EDAMAM_APP_KEY = process.env.EDAMAM_APP_KEY

async function test() {
    try {   
        const results = await axios.get(`https://api.edamam.com/search?q=ground chuck+tomatoes+potatoes+cheddar&app_id=${EDAMAM_APP_ID}&app_key=${EDAMAM_APP_KEY}`)
        console.log(results.data)
    } catch(error) {
        console.log(error)
    }
}
// test()
