const {v4: uuid} = require('uuid')

class User {
    constructor(email, password, id = uuid()) {
        this.email = email
        this.password = password
        this.id = id
    }
}

module.exports = User