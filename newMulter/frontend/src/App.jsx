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
     <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8">
        
        {/* Heading */}
        <h1 className="text-3xl font-bold text-center text-gray-800">
          Upload Image
        </h1>
        <p className="text-center text-gray-500 mt-2">
          Select an image to upload
        </p>

        {/* Upload Box */}
        <div className="mt-8">
          <label
            htmlFor="image"
            className="flex flex-col items-center justify-center h-64 border-2 border-dashed border-blue-400 rounded-2xl cursor-pointer hover:bg-blue-50 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-14 h-14 text-blue-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7 16a4 4 0 01-.88-7.903A5.5 5.5 0 0117.5 9H18a3 3 0 010 6h-2m-4-4v8m0-8l-3 3m3-3l3 3"
              />
            </svg>

            <h2 className="mt-4 text-lg font-semibold text-gray-700">
              Click to Upload
            </h2>

            <p className="text-sm text-gray-400 mt-1">
              PNG, JPG or JPEG
            </p>
          </label>

          <input onChange={handleChange}
            type="file"
            id="image"
            className="hidden"
          />
        </div>

        {/* Upload Button */}
        <button onClick={handleSubmit}
         className="w-full mt-8 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition">
          Upload Image
        </button>
      </div>
    </div>
  );
};

export default App;
