import React, { useContext } from "react";
import AuthContext from "../AuthContext";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const { setIsLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <button onClick={handleLogout} className="mr-5 px-4 navtext navhover">
      Log Out
    </button>
  );
};

export default LogoutButton;
