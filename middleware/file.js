const multer = require('multer')
const fs = require('fs')

const storage = multer.diskStorage({
    destination(req, file, callback) {
        !fs.existsSync(`./public/img/`) && fs.mkdirSync(`./public/img/`, { recursive: true })
        callback(null, 'public/img')
    },
    filename(req, file, callback) {
        callback(null, `${Date.now()}-${file.originalname}`)
    }
})

module.exports = multer({storage})