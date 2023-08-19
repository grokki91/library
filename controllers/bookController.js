const Book = require('../model/Book')

class Book {
    async create(req, res) {
        const path = req.file.path
        let {title, description, authors, favorite, fileCover, fileName, fileBook} = req.body
        const book = await Book({title, description, authors, favorite, fileCover, fileName, fileBook: path})
        await book.save()
        res.redirect('/books')
    }

    async getBook(req, res) {

    }

    async getUpdateBook(req, res) {

    }

    async updateBook(req, res) {

    }
}