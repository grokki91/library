const User = require("../model/User")

const validate = async (req, res, next) => {
    const {username, password} = req.body
    const user = await User.findOne({username})
    console.log(req.body, user);
    
    if (!username) {
        console.log('Невереный email');
        res.status(403).json({message: 'Не указан email'})
    } 

    if (!password) {
        console.log('Неверный пароль');
        res.status(403).json({message: 'Не указан пароль'})
    }
    console.log('Прошли валидацию');
    next()
}

module.exports = validate