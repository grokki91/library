const express = require('express')
const router = express.Router()
const store = require('../../public/store')
const Book = require('../../public/store/Book')
const fileMulter = require('../../middleware/file')
const pageNotFound = {message: '404 | Страница не найдена'}

router.get('/api/books', (req, res) => {
    const {books} = store
    res.json(books)
})

router.get('/api/books/:id', (req, res) => {
    const {books} = store
    const {id} = req.params
    const idx = books.findIndex(book => book.id === id)
    if (idx !== - 1) {
        res.json(books[idx])
    } else {
        res.status(404)
        res.json(pageNotFound)
    }
})

router.post('/api/books', 
    fileMulter.single('fileBook'),
    (req, res) => {
        const path = req.file.path
        const {books} = store
        let {title, description, authors, favorite, fileCover, fileName, fileBook, id} = req.body
        id = String(books.length + 1)
        const book = new Book(id, title, description, authors, favorite, fileCover, fileName, fileBook = path)
        books.push(book)
        res.status(201)
        res.json(book)
})

router.put('/api/books/:id', (req, res) => {
    const {books} = store
    const {title, description, authors, favorite, fileCover, fileName} = req.body
    const {id}= req.params
    const idx = books.findIndex(book => book.id === id)
    if (idx !== -1) {
        books[idx] = {
            ...books[idx],
            title,
            description,
            authors,
            favorite,
            fileCover,
            fileName
        }
        res.json(true)
    } else {
        res.status(404)
        res.json(pageNotFound)
    }
})

router.delete('/api/books/:id', (req, res) => {
    const {books} = store
    const {id} = req.params
    const idx = books.findIndex(book => book.id === id)

    if (idx !== -1) {
        books.slice(idx, 1)
        res.json({message: 'Ok'})
    } else {
        res.status(404)
        res.json(pageNotFound)
    }
})

router.get('/api/books/:id/download', (req, res) => {
    const {id} = req.params
    const {books} = store
    const idx = books.findIndex(book => book.id === id)
    const bookPath = books[idx]?.fileBook

    if (idx !== -1 && bookPath) {
        res.download(bookPath)
    } else {
        res.json(pageNotFound)
    }
})

module.exports = router