const User = require('../model/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { SECRET } = require('../config')
const { render } = require('ejs')

const generateToken = (id) => {
    const payload = { id }
    return jwt.sign(payload, SECRET, { expiresIn: '1h' })
}

class AuthController {
    async signUp(req, res, next) {
        try {
            const {username, password} = req.body
            const candidate = await User.findOne({username})

            if (candidate) {
                return res.render('signup', {
                    title: 'Registration',
                    text: 'Пользователь с таким email уже существует'
                }) 
            }
            const hashPassword = bcrypt.hashSync(password, 7)
            const user = new User({username, password: hashPassword})
            await user.save()
            res.redirect('/')
        } catch (error) {
            console.log(error)
            next(error)
        }

    }

    async login(req, res, next) {
        try {
            const { username, password } = req.body
            const user = await User.findOne({username})
            console.log(req.body, req.headers, user)

            if (!user) {
                res.status(404).json({message: 'Пользователь не найден'})
            }

            const hashPassword = bcrypt.compareSync(password, user.password)

            if (hashPassword) {
                const token = generateToken(username._id)
                return res.status(201).json({token: `Bearer ${token}`})
            } else {
                res.status(401).json({message: 'Введен неверный пароль'})
            }

        } catch (error) {
            console.log('Ошибка в БД при авторизации - ', error);
            return next(error)
        }
    }
    
    async getUsers(req, res) {
        try {
            const users = await User.find().select('-__v')
            res.json(users)
            
        } catch (error) {
            console.log(error)
        }
    }

    async removeUsers(req, res) {
        try {
            await User.deleteMany()
            res.json({message: 'Все пользователи удалены'})
            
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = new AuthController()