const express = require('express')
const router = express.Router()
const controller = require('../controllers/authController')
const checkToken = require('../middleware/checkToken')
const validate = require('../middleware/validation')
const Book = require('../model/Book')

router.get('/signup', (req, res) => {
    res.render('signup', {
        title: 'Registration',
        text: ''
    })
})

router.get('/login', (req, res) => {
    res.render('login', {
        title: 'Authorization',
        text: ''
    })
})

router.get('/', checkToken, async (req, res) => {
    const books = await Book.find()
    const user = req.session.user.username
    let booksText;
    if (books.length > 1) {
        booksText = `There are ${books.length} books in the library`
    } else if (books.length === 1) {
        booksText = `There is one book in the library`
    } else if (books.length < 1) {
        booksText = ''
    }
    res.render('index', {
        title: `Hello, ${user}!`,
        name: '',
        books: booksText
    }) 
})

router.get('/logout', (req, res) => {
    res.clearCookie('connect.sid')
    res.redirect('/')
})

router.post('/signup', controller.signUp)
router.post('/login', controller.login)
router.get('/users', controller.getUsers)
router.delete('/users', controller.removeUsers)

module.exports = router