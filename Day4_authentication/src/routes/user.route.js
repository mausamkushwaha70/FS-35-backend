const express = require("express");
const { registerController, loginController, getMeController} = require("../controllers/user.controller");
// const userVarifyMiddleware = require("../middleware/user.middleware");
const router = express.Router();

router.post("/register", registerController);
router.post("/login",loginController);
router.get("/getMe", getMeController);

module.exports = router;
