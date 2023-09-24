const {Schema, model} = require('mongoose')

const bookSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    authors : {
        type: String,
        required: true
    },
    favorite: {
        type: Boolean,
        default: false
    },
    pages: {
        type: String,
        required: true
    },
    fileBook: {
        type: String
    },
    views: {
        type: Number,
        default: 0
    }

}, {timestamps: true})

module.exports = model('Book', bookSchema)