const EmployeeModel = require("../models/employee.model");

const createEmployeeController = async (req, res) => {
  try {
    let {
      employeeName,
      email,
      mobile,
      designation,
      address,
      company,
      employeeId,
    } = req.body;
    console.log(req.body);
    if (!employeeName || !email || !mobile) {
      return res.status(400).json({
        success: false,
        message: "All fields are required ",
      });
    }

    const Employee = await EmployeeModel.create({
      employeeName,
      email,
      mobile,
      designation,
      address,
      company,
      employeeId,
    });
    return res.status(201).json({
      success: true,
      message: "Sucessfully Employee create",
      data: Employee,
    });
  } catch (error) {
    console.log("error in creation", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

const readEmployeeController = async (req, res) => {
  try {
    const allEmployee = await EmployeeModel.find();

    return res.status(200).json({
      success: true,
      message: "Employees fetched",
      data: allEmployee,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

module.exports = {
  createEmployeeController,
  readEmployeeController
};
