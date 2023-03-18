import React from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

const UploadSuccess = () => {
  return (
    <div className="container mx-auto">
      <Navbar />
      <div className="w-3/5 mx-auto text-center notice-bg py-1 my-6 rounded">
        <h1 className="text-2xl font-bold text-green-500 mt-8 mb-4">
          Congratulations! You've uploaded a frog! 🐸
        </h1>
        <p className="text-lg text-gray-700 mb-8">
          We're hopping with joy that you've shared this frog with us!
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

export default UploadSuccess;
