const express = require('express')
const router = express.Router()
const controller = require('../controllers/authController')
const checkToken = require('../middleware/checkToken')
const validate = require('../middleware/validation')
const Book = require('../model/Book')

router.get('/', checkToken, controller.renderMainPage)
router.get('/signup', controller.renderSignupPage)
router.get('/login', controller.renderLoginPage)
router.get('/logout', controller.logout)
router.post('/signup', controller.signUp)
router.post('/login', controller.login)
router.get('/users', controller.getUsers)
router.delete('/users', controller.removeUsers)

module.exports = router