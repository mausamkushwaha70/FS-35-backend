const express = require("express");
const { registerController, loginController} = require("../controllers/user.controller");
const userVarifyMiddleware = require("../middleware/user.middleware");
const router = express.Router();

router.post("/register", registerController);
router.get("/login", userVarifyMiddleware,loginController);

module.exports = router;
