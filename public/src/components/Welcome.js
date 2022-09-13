import React from "react";
import "./welcome.css"

const Welcome = ({ user }) => {
  return (
    <div className="welcome">
      <img src="/assets/robot.gif" alt="robot" />
      <h1>
        Welcome, <span>{user && user.username}!</span>
      </h1>
      <h3>Please select a Chat to start messaging</h3>
    </div>
  );
};

export default Welcome;
