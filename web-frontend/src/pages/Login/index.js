import React, { useContext, useState } from "react";
import "./login.scss";
import axios from "axios";
import UserContext from "../../context/user-token";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const context = useContext(UserContext);
  const navigate = useNavigate();
  const [state, setState] = useState({ username: "", password: "" });

  const handleOnChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    console.log({ name, value });
    setState((oldState) => ({ ...oldState, [name]: value }));
  };

  const handleSummit = async (e) => {
    e.preventDefault();

    // request to api
    const { username, password } = state;
    if (!username || !password) {
      alert("Please fill in both username and password.");
      return;
    }
    const body = { username, password };

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_API}/login`,
        body,
        { withCredentials: true}
      );
      const { token } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        if (context && typeof context.setLogin === "function") {
          context.setLogin(true);
        }
        if (context && typeof context.setToken === "function") {
          context.setToken(token);
        }
        navigate("/");
      }
    } catch (error) {
      console.log("Request fail", error);
      alert("Login failed. Please check your credentials.");
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

        <form onSubmit={handleSummit}>
          <input
            onChange={handleOnChange}
            type="text"
            id="login"
            className="fadeIn second"
            name="username"
            placeholder="login"
            required
          />
          <input
            onChange={handleOnChange}
            type="password"
            id="password"
            className="fadeIn third"
            name="password"
            placeholder="password"
            required
          />
          <input type="submit" className="fadeIn fourth" value="Log In" />
        </form>

        <div id="formFooter">
          <Link className="underlineHover" to="/register">
            Don't have an account? Register
          </Link>
        </div>
      </div>
    </div>
  );
};

// class Login extends React.Component {
//   static contextType = UserContext;

//   render() {
//     return (
//       <div className="wrapper fadeInDown">
//         {JSON.stringify(this.state)}
//         <div id="formContent">

//           <div className="fadeIn first">
//             <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/User_font_awesome.svg/1200px-User_font_awesome.svg.png" id="icon" alt="User Icon" />
//           </div>

//           <form onSubmit={this.handleSummit} >
//             <input onChange={this.handleOnChange} type="text" id="login" className="fadeIn second" name="username" placeholder="login"/>
//             <input onChange={this.handleOnChange} type="text" id="password" className="fadeIn third" name="password" placeholder="password"/>
//             <input type="submit" className="fadeIn fourth" value="Log In"/>
//           </form>

//           <div id="formFooter">
//             <a className="underlineHover" href="#">Forgot Password?</a>
//           </div>

//         </div>
//       </div>
//     )
//   }
// }

export default Login;
