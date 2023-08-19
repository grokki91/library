const {Schema, model} = require('mongoose')

const User = new Schema({
    username: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true
    },
    created: {
        type: Date,
        default: Date.now()
    }
})

module.exports = model('User', User)