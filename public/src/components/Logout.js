import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BiPowerOff } from "react-icons/bi";

const Logout = () => {
  const navigate = useNavigate();
  const handleClick = async () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <div className="logout" onClick={handleClick}>
      <BiPowerOff />
    </div>
  );
};

export default Logout;
