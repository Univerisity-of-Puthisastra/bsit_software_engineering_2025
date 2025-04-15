import { useEffect, useState } from "react";
import Login from "../../pages/Login";
import axios from "axios";
import UserContext from "../../context/user-token";

const Protected = (props) => {
  const [isLogin, setLogin] = useState();
  const [token, setToken] = useState();

  useEffect(() => {
    // get token from localStorage
    const token = localStorage.getItem("token");
    // if (token) {
    axios
      .get(`${process.env.REACT_APP_BACKEND_API}/users`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      })
      .then((response) => {
        setLogin(true);
        setToken(token);
      })
      .catch((err) => {
        console.log(err);
      });
    // }
  }, []);

  return (
    <UserContext.Provider value={{ isLogin, setLogin, token, setToken }}>
      {!isLogin ? <Login /> : props.children}
    </UserContext.Provider>
  );
};

export default Protected;
