const { json } = require('express')
const fs = require("fs");
const path = require('path')
const Book = require('../model/Book')

class BookController {
    async create(req, res, next) {
        try {          
            let {title, description, authors, favorite, pages, fileBook} = req.body
            if (favorite) {
                favorite = true
            }

            if (req.file?.mimetype === 'image/png' || req.file?.mimetype === 'image/jpeg' || req.file?.mimetype === 'image/jpg' || !req.file) {
                fileBook = req.file ? req.file.path : ''

                const book = new Book({title, description, authors, favorite, pages, fileBook})
                await book.save()
                res.redirect('/books')
            } else {
                res.set('Content-Type', 'text/html')
                res.send('<h1 style="font-size: 2rem;">This format picture is not supported</h1>')
            }
        } catch (error) {
            next(error)
        }
    }

    async renderCreateBook(req, res, next) {
        try {
            res.render('books/create', {
                title: 'Add book',
                book: {},
                clearButton: true,
                img: false,
                imgErrorFormat: false
            })

        } catch (error) {
            console.log(error);
            next(error)
        }
    }

    async viewBook(req, res, next) {
        try {
            const {id} = req.params
            const book = await Book.findById(id).exec()
    
            if (book) {
                await Book.findByIdAndUpdate(id, {$inc: {views: 1}}, {new: true})
                const imgPath = book.fileBook.replace(/\\/g, '/')
  
                return res.render('books/view', {
                    title: 'book | view',
                    book: book,
                    img: imgPath
                })
            }
    
            return res.render('errors/404', {
                title: '404 | Страница не найдена'
            })
        } catch (error) {
            console.log(error);
            next(error)
        }
    }

    async renderBooks(req, res, next) {
        try {
            const books = await Book.find()
            return res.render('books/index', {
                title: 'List of books',
                books: books
            })

        } catch (error) {
            console.log(error);
            next(error)
        }
    }

    async getBooks(req, res, next) {
        try {
            const books = await Book.find().select('-__v')
            if (books.length) {
                return res.json(books)
            }
            return res.json({message: 'В библиотеке нет книг'})
        } catch (error) {
            console.log(error);
            next(error)
        }
    }

    async renderUpdateBook(req, res, next) {
        try {
            const {id} = req.params
            const book = await Book.findById(id).exec()
            if (book) {
                const imgPath = book.fileBook.replace(/\\/g, '/')

                return res.render('books/update', {
                    title: 'book | update',
                    book: book,
                    clearButton: false,
                    img: imgPath
                })
            }
    
            return res.render('errors/404', {
                title: '404 | Страница не найдена'
            })
        } catch (error) {
            console.log('renderUpdateBook', error)
            next(error)
        }
    }

    async updateBook(req, res, next) {
        try {
            const {id} = req.params
            const book = await Book.findById(id).exec()
            if (book) {

                let {title, description, authors, favorite, pages, fileBook} = req.body
                if (favorite) {
                    favorite = true
                }

                if (req.file?.mimetype === 'image/png' || req.file?.mimetype === 'image/jpeg' || req.file?.mimetype === 'image/jpg' || !req.file) {
                    fileBook = req.file ? req.file.path : ''

                    await Book.findByIdAndUpdate(id, {$set: {
                        title, description, authors, favorite, pages, fileBook
                    }})
    
                    return res.redirect(`/book/${id}`)
                } else {
                    res.set('Content-Type', 'text/html')
                    res.send('<h1 style="font-size: 2rem;">This format picture is not supported</h1>')
                }

            }
        } catch (error) {
            console.log(error)
            next(error)
        }
    }

    async deleteBook(req, res, next) {
        try {
            const {id} = req.params
            await Book.findByIdAndDelete(id)
            res.redirect('/books')

        } catch (error) {
           console.log(error) 
           next(error)
        }
    }

    async deleteBooks(req, res, next) {
        try {
            await Book.deleteMany()
            res.json({message: 'Все книги удалены'})
        } catch (error) {
            next(error)
        }

    }

    async sortedBooks(req, res, next) {
        const sortedBooks = await Book.find().select('-__v').sort({title: 1})
        res.render('books/index', {
            title: 'List of books',
            books: sortedBooks,
            errorMessage: ''
        })
    }

    async download(req, res, next) {
        try {
            const books = await Book.find().select('title description authors pages favorite views createdAt -_id')

            if (books.length) {
                const filePath = path.join(__dirname, '../', 'public/data', 'books.txt')
                const content = 'Books:\n\n' + books.toString()
                return fs.writeFile(filePath, content, (err) => {
                    if (err) {
                        console.log(err);
                    }
                    res.download(filePath, 'books.txt')
                })
            }
            res.redirect('/books')
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new BookController()