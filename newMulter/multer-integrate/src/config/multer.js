const multer = require("multer")

const storage = multer.diskStorage({
    destination:(req, file, cb)=>{
        cb(null, "uploads/")
    },
    filename:(req, file, cb)=>{
        cb(null, Date.now() + file.originalname)
    },
})
const storage2 = multer.memoryStorage()

const upload = multer({storage2})
module.exports = upload;