const multer = require('multer')
const uuid = require('uuid')
const path = require('path')

const storage = multer.diskStorage({
    destination: 'Pictures',
    filename: (req, file, cb) => {
        cb(null, uuid.v4() + path.extname(file.originalname).toLocaleLowerCase())
    }
})
module.exports = multer({storage})
