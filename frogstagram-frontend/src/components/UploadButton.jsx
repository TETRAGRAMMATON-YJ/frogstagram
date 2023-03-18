import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare } from "@fortawesome/free-regular-svg-icons";

const UploadButton = () => {
  return (
    <Link to="/upload" className="text-gray-700 hover:text-gray-900 mt-2 mr-4">
      <FontAwesomeIcon icon={faPlusSquare} className="w-6 h-6" />
    </Link>
  );
};

export default UploadButton;
