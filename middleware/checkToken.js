const jwt = require('jsonwebtoken');
const { secret } = require('../config');

const checkTonen = (req, res, next) => {
    try {
        console.error('Начало checkTonen=', req.headers);
        const token = req.headers.authorization?.split(' ')[1]

        if (!token) {
            console.error('Токен не найден');
            return res.redirect('/login')
        }
        
        const decodeToken = jwt.verify(token, secret)
        req.user = decodeToken
        console.error('Конец. Все ок');
        next()

    } catch (error) {
        console.log(`checkTonen ${error}`);
        res.status(500).json({message: error})
    }
}

module.exports = checkTonen