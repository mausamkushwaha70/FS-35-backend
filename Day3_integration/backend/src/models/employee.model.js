const mongoose = require("mongoose");
const employeeSchema = new mongoose.Schema({
    employeeName: {
        type: String,
        required: [true, "Employee name is required"],
        trim: true,
    },
    email: {
        type: String,
        require: [true, "Email is required"],
        unique: true
    },
    mobile: {
        type: String,
        minlength: [10, "minimum 10 characters are required"],
        maxlength: [10, "maximum 10 characters are required"],
    },
    designation: {
        type: String,
        enum: ["MANAGER", "DEVELOPER"],
        default: "DEVELOPER",
    },
    employeeId: {
        type: String,
        required: true,
    },
    company: {
        type: String,
        default: "none",
    },
    address: {
        type: String,
        default: "none",
    },
},
    {
        timestamps: true,
    }
);

const EmployeeModel = mongoose.model("employees", employeeSchema);
module.exports = EmployeeModel;
