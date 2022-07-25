import React from "react";
import { Link } from "react-router-dom";
import "./register.css";

const Register = () => {
  function handleSubmit(e) {
    e.preventDefault();
    alert("form");
  }
  function handleChange(e) {}
  return (
    <div className="register">
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="brand">
          <img src="/assets/logo.svg" alt="logo" />
          <h1>snappy</h1>
        </div>
        <input
          type="text"
          placeholder="Username"
          name="Username"
          onChange={(e) => handleChange(e)}
        />
        <input
          type="email"
          placeholder="Email"
          name="email"
          onChange={(e) => handleChange(e)}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          onChange={(e) => handleChange(e)}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          name="confirmPassword"
          onChange={(e) => handleChange(e)}
        />
        <button type="submit">Create User</button>
        <span>
          Already have an account ? <Link to="/login">Login</Link>
        </span>
      </form>
    </div>
  );
};

export default Register;
