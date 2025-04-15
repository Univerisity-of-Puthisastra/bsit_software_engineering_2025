import React, { useState } from "react";
import "./registration.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Registration = () => {
  const navigate = useNavigate();
  const [state, setState] = useState();

  const handleOnChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setState((oldState) => ({ ...oldState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { username, password } = state;
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
        <div className="fadeIn first">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/User_font_awesome.svg/1200px-User_font_awesome.svg.png"
            id="icon"
            alt="User Icon"
          />
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
          <a className="underlineHover" onClick={() => navigate("/login")}>
            Already have an account? Login
          </a>
        </div>
      </div>
    </div>
  );
};

export default Registration; 