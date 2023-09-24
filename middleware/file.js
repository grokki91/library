const multer = require('multer')
const fs = require('fs')
const { v4: uuidv4 } = require('uuid');

const storage = multer.diskStorage({
    destination(req, file, callback) {
        !fs.existsSync(`./public/img/`) && fs.mkdirSync(`./public/img/`, { recursive: true })
        callback(null, 'public/img')
    },
    filename(req, file, callback) {
        callback(null, `${Date.now()}-${uuidv4()}.jpg`)
    }
})

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg') {
        cb(null, true)
    } else {
        console.log('неверный формат')
        cb(null, false)
    }
}

module.exports = multer({storage})