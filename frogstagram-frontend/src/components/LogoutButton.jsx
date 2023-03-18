import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "./AuthContext";

const LogoutButton = () => {
  const { setIsLoggedIn } = useContext(AuthContext);
  const history = useHistory();

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    setIsLoggedIn(false);
    history.push("/login");
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;
