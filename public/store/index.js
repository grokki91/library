const Book = require("./Book")

const store = {
    books: [
        new Book('Гарри Поттер', 'Фэнтэзи', 'Дж. Роулинг', true, '500', 'garry_potter'),
        new Book('Оно', 'Ужасы', 'С. Кинг', false, '800', 'It')
    ],
    users: []
}

module.exports = store