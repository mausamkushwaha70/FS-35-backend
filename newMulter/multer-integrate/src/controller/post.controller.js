const postController = async (req, res) => {
    try {
console.log(req.file);


        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "No file uploaded"

            });
        }

        return res.status(201).json({
            message: "File uploaded successfully",
            
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Upload failed",
            error: error.message,
        });
    }
};

module.exports = { postController };
