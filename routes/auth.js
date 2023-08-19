const express = require('express')
const router = express.Router()
const controller = require('../controllers/authController')
const checkToken = require('../middleware/checkToken')
const validate = require('../middleware/validation')
const User = require('../model/User')

router.get('/signup', (req, res) => {
    res.render('signup', {
        title: 'Registration',
        text: ''
    })
})

router.get('/login', (req, res) => {
    res.render('login', {
        title: 'Authorization',
    })
})

router.get('/', (req, res) => {
    const {username} = req.body
    const user = User.findOne({username})
    res.render('index', {
        title: 'Main',
        name: user
    }) 
})
router.post('/signup', controller.signUp)
router.post('/login', checkToken, controller.login)
router.get('/users', controller.getUsers)
router.delete('/users', controller.removeUsers)

module.exports = router