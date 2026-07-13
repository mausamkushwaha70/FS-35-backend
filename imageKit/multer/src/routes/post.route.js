const express = require("express");
const upload = require("../config/multer");
const router = express.Router();



router.post("/",upload.single('image'), async(req, res)=>{
    try {
        const file = req.file;
        // console.log(file)
        if(!file){
            return res.status(400).json({
                message:"file not file",
                success:false
            })
        }
        const imageBuffer = file.buffer;
        console.log(imageBuffer)

        let uploadFile = await sendFile(file.buffer, file.originalname)
        return res.status(200).json({
            success:true,
            message:"file upload successfully"
            
        })
        console.log(file)

    } catch (error) {
        
    }
})

module.exports = router;
