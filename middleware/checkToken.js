const checkTonen = (req, res, next) => {
    if (req.session.authorized) {
        return next()
    }

    res.redirect('/login')
}

module.exports = checkTonen