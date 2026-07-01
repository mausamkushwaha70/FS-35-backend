const {createEmployeeController, readEmployeeController } = require("../controllers/employee.controller");
const express = require("express")
const  router = express.Router()

router.post("/create",createEmployeeController);
router.get("/", readEmployeeController)





module.exports = router;