const {createEmployeeController, readEmployeeController } = require("../controllers/employee.controller");
const express = require("express")
const  router = express.Router()

router.post("/create",createEmployeeController);
router.get("/read", readEmployeeController)





module.exports = router;