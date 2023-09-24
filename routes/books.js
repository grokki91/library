const express = require('express')
const Book = require('../model/Book')
const router = express.Router()
const fileMulter = require('../middleware/file')
const BookController = require('../controllers/bookController')
const checkImgFormat = require('../middleware/checkToken')

router.get('/book/create', BookController.renderCreateBook)
router.get('/book/:id', BookController.viewBook)
router.get('/books', BookController.renderBooks)
router.get('/book/update/:id', BookController.renderUpdateBook)
router.post('/book/create', fileMulter.single('fileBook'), checkImgFormat, BookController.create)
router.post('/book/update/:id', fileMulter.single('fileBook'), BookController.updateBook)
router.post('/book/delete/:id', BookController.deleteBook)
router.post('/book/deleteAll', BookController.deleteBooks)
router.get('/books/sorted', BookController.sortedBooks)
router.get('/books/download', BookController.download)

router.get('/api/books', BookController.getBooks)

module.exports = router