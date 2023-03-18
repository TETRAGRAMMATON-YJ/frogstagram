import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const UploadFailure = () => {
  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center notice-bg mx-72 mt-6 rounded">
        <h1 className="text-2xl font-bold text-center mt-8 mb-4 text-gray-900">
          Upload Failed
        </h1>
        <p className="text-center mb-8">
          Sorry, your picture was not recognized as a frog.{" "}
          <span role="img" aria-label="frog emoji">
            🐸
          </span>
          <br></br> Don't worry, maybe it was just a tadpole.{" "}
        </p>
      </div>
      <div className="flex flex-col items-center mx-72 mt-6 rounded">
        <Link to="/">
          <button className="btn py-2 px-4 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75">
            Hop Back to the Home Page
          </button>
        </Link>
      </div>
    </div>
  );
};

export default UploadFailure;
