const router = require('express').Router()
const db = require('../models')
const cryptojs = require('crypto-js')
const bcrypt = require('bcrypt')

// Display signup page
router.get('/new', (req, res) => {
    res.render('users/new')
})

// Create user
router.post('/new', async (req, res)=> {
    const plainPassword = req.body.password
    const hashedPassword = bcrypt.hashSync(plainPassword, 12)

    const newUser = await db.user.create({
        email: req.body.email,
        username: req.body.username,
        password: hashedPassword
    })
    const encryptedUserId = cryptojs.AES.encrypt(newUser.id.toString(), process.env.SECRET_STRING)
    const encryptedUserIdString = encryptedUserId.toString()
    res.cookie('userId', encryptedUserIdString)
    res.redirect('/')
})


// Display login page
router.get('/login', (req, res) => {
    res.render('users/login')
})

// Log in the user
router.post('/login', async (req, res) => {
    try {
        const user = await db.user.findOne({
            where: { email: req.body.email}
        })
        if (bcrypt.compareSync(req.body.password, user.password)) {
            const encryptedUserId = cryptojs.AES.encrypt(user.id.toString(), process.env.SECRET_STRING)
            const encryptedUserIdString = encryptedUserId.toString()
            res.cookie('userId', encryptedUserIdString)
            res.redirect('/')
        } else {
            res.render('users/login', { errors: "Invalid email/password" })
        }
    
    } catch (error) {
        console.log(error)
        res.render('users/login', { errors: "Invalid email/password" })
    }
})

//Show user profile
router.get('/profile', async (req, res) => {
    try {
        const user = await db.user.findOne({
            where: {id: res.locals.user.id},
            include: db.recipe
        })
        // console.log(user.dataValues.recipes)
        res.render('users/profile', { recipes: user.dataValues.recipes })
    } catch (error) {
        console.log(error)
    }

})



// Logout the user by removing their cookie
router.get('/logout', (req, res) => {
    res.clearCookie('userId')
    res.redirect('/')
})

module.exports = router