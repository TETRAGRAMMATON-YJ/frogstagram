import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const UploadPage = () => {
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
  };

  const handleUpload = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("file", image);
    try {
      const response = await fetch("http://localhost:8000/predict/image", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      console.log(data);
      if (data.prediction === "frog") {
        navigate("/upload/success");
      } else {
        navigate("/upload/failure");
      }
    } catch (error) {
      console.log(error);
      navigate("/upload/failure");
    }
  };

  return (
    <div className="container mx-auto">
      <Navbar />
      {/* div width = 70% */}
      <div className="w-3/5 mx-auto">
        <h1 className="text-2xl font-bold text-center mt-8 mb-4 upload-heading text-gray-900">
          New Post
        </h1>
        <form className="flex flex-col" encType="multipart/form-data">
          <input type="file" accept="image/*" onChange={handleImageChange} />
          {image && (
            <div className="mt-6 h-64 w-64 overflow-hidden rounded mx-auto">
              <img
                className="w-full h-full object-cover"
                src={URL.createObjectURL(image)}
                alt="uploaded image"
              />
            </div>
          )}
          <input
            className="mt-6 p-2 rounded"
            type="text"
            placeholder="Enter a caption for your post"
          />
          {/* Button with Margin X 75% */}
          <button
            className="btn mt-8 mx-72 py-2 upload-submit font-bold"
            onClick={handleUpload}
          >
            Upload
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadPage;
