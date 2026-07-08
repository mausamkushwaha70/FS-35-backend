import React, { useEffect, useState } from "react";
import axios from "axios";
import EmployeeCard from "./components/EmployeeCard";

const App = () => {
  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({});

  const getAllEmployee = async () => {
    let res = await axios.get("http://localhost:3000/api/employees");
    setEmployees(res.data.data);
    console.log("all employees", res);
  };
  useEffect(() => {
    getAllEmployee();
  }, []);

  const handleChange = (e) => {
    let { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let res = await axios.post(
        "http://localhost:3000/api/employees/create",
        formData,
      );
      console.log("res->", res);
    } catch (error) {
      console.log("error in api call", error);
    }
  };

  return (
    <div className="w-full h-full bg-[#223146] flex flex-col justify-center items-center gap-3 border-1 border-gray-900 ">
      <h1 className="font-bold text-xl text-[#b9dae0]">Create Employee Id</h1>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          gap: "10px",
          width: "300px",
          flexDirection: "column",
          
        }}
        action=""
      >
        <input
          onChange={handleChange}
          className="outline-0 text-white border rounded px-0.5 py-1 text-sm"
          name="employeeName"
          type="text"
          placeholder="Name"
        />
        <input
          onChange={handleChange}
          className="outline-0 text-white border rounded px-0.5 py-1 text-sm"
          name="email"
          type="text"
          placeholder="email"
        />
        <input
          onChange={handleChange}
          className="outline-0 text-white border rounded px-0.5 py-1 text-sm"
          name="mobile"
          type="text"
          placeholder="mobile"
        />
        <input
          onChange={handleChange}
          className="outline-0 text-white border rounded px-0.5 py-1 text-sm"
          name="address"
          type="text"
          placeholder="address"
        />
        <input
          onChange={handleChange}
          className="outline-0 text-white border rounded px-0.5 py-1 text-sm"
          name="company"
          type="text"
          placeholder="company"
        />
        <input
          onChange={handleChange}
          className="outline-0 text-white border rounded px-0.5 py-1 text-sm"
          name="designation"
          type="text"
          placeholder="designation"
        />
        <input
          name="employeeId"
          onChange={handleChange}
          className="outline-0 text-white border rounded px-0.5 py-1 text-sm"
          type="text"
          placeholder="Employee id"
          required
        />
        <button className="bg-green-500 rounded cursor-pointer">Submit</button>
      </form>

      <div className="grid grid-cols-3 gap-4">
        {employees.map((val) => {
          return <EmployeeCard key={val._id} employee={val} />;
        })}
      </div>
    </div>
  );
};

export default App;
