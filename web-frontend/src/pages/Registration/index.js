import React, { useState } from "react";
import "./registration.scss";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Registration = () => {
  const navigate = useNavigate();
  const [state, setState] = useState({ username: "", password: "" });

  const handleOnChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setState((oldState) => ({ ...oldState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { username, password } = state;
    if (!username || !password) {
      alert("Please fill in both username and password.");
      return;
    }
    const body = { username, password };

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_API}/users/register`,
        body
      );
      if (response.data) {
        alert("Registration successful! Please login.");
        navigate("/login");
      }
    } catch (error) {
      console.log("Registration failed", error);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <div className="wrapper fadeInDown">
      <div id="formContent">
        <div className="fadeIn first" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            id="icon"
            style={{ width: "60px", height: "60px", margin: "20px auto", color: "#56baed" }}
          >
            <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
          </svg>
        </div>

        <form onSubmit={handleSubmit}>
          <input
            onChange={handleOnChange}
            type="text"
            id="username"
            className="fadeIn third"
            name="username"
            placeholder="Username"
            required
          />
          <input
            onChange={handleOnChange}
            type="password"
            id="password"
            className="fadeIn fourth"
            name="password"
            placeholder="Password"
            required
          />
          <input type="submit" className="fadeIn fifth" value="Register" />
        </form>

        <div id="formFooter">
          <Link className="underlineHover" to="/login">
            Already have an account? Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Registration; 