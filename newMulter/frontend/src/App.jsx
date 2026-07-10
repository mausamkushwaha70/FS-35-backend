import React, { useState } from "react";
import axios from "axios";
const App = () => {
  const [file, setfile] = useState(null);

  const handleChange = (e) => {
    console.log(e.target.files);
    setfile(e.target.files[0]);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("image", file);
    try {

      let res = await axios.post("http://localhost:3000/api/post", formData);
      console.log(res);
      
    } catch (error) { 
       console.log(error.message)
    }
   
  };

  return (
    <div>
      <h1>Here we upload file from frontend to backend</h1>

      <span>select image</span>
      <input onChange={handleChange} type="file" />
      <button onClick={handleSubmit}>submit</button>
    </div>
  );
};

export default App;
