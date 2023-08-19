const express = require('express')
const router = express.Router()
const passport = require('passport')
const User = require('../public/store/User')
const { users } = require('../public/store/index')

router.get('/user/login', (req, res) => {
    res.render('login', {
        title: 'Authorization',
    })
})

router.get('/', 
    (req, res, next) => {
        if (!req.isAuthenticated()) {
            return res.redirect('/user/login')
        }
        next()
    },
    (req, res) => {
        res.render('index', {
            title: 'Main',
            name: req.user.email
    })
})

router.get('/user/signup', (req, res) => {
    res.render('signup', {
        title: 'Registration'
    })
})

router.post('/user/login', (req, res, next) => {
    passport.authenticate('local', (err, user) => {
        if (err) {
            console.log('ошибка');
            return next(err)
        }
        if (!user) {
            console.log('нет тот user');
            return res.redirect('/user/login')
        }
        req.logIn(user, (err) => {
            console.log('все верно!');
            if (err) {
                return next(err)
            }
            return res.redirect('/')
        })
    })(req, res, next)
})

router.post('/user/signup',(req, res, next) => {
    let {email, password} = req.body
    const emailMatches = users.find(user => user.email === email)

    if (!emailMatches) {
        const newUser = new User(email, password)
        users.push(newUser)
        res.redirect('/')
    }
    res.redirect('/user/signup')
})

module.exports = router