const express = require('express')
const router = express.Router()
const controller = require('../controllers/chatController')
const validate = require('../middleware/validation')
const Book = require('../model/Book')

router.get('/chat', controller.showChat)

module.exports = router