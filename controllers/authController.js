const User = require('../model/User')
const bcrypt = require('bcryptjs')

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
            return next(error)
        }

    }

    async login(req, res, next) {
        try {
            const { username, password } = req.body
            const user = await User.findOne({username})

            if (!user) {
                return res.render('login', {
                    title: 'Authorization',
                    text: 'Пользователя с таким email не существует'
                })
            }

            const hashPassword = bcrypt.compareSync(password, user.password)
            if (!hashPassword) {
                return res.render('login', {
                    title: 'Authorization',
                    text: 'Введен неверный пароль'
                })
            }
            
            req.session.authorized = true
            req.session.user = user
            res.redirect('/')

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