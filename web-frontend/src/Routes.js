import React, { useState, useEffect } from 'react';
import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import PostArticle from "./pages/PostArticle";
import ViewArticle from "./pages/ViewArticle";
import Protected from "./components/Protected";
import UserContext from "./context/user-token";
import axios from "axios";

const ProtectedArticle = () => {
  return <Protected>
    <PostArticle/>
  </Protected>
}

const MyRoutes = () => {
  const [isLogin, setLogin] = useState(undefined);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (token) {
      axios
        .get(`${process.env.REACT_APP_BACKEND_API}/users`, {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        })
        .then((response) => {
          setLogin(true);
          setUser(response.data);
        })
        .catch((err) => {
          console.error(err);
          setLogin(false);
          setUser(null);
          localStorage.removeItem("token");
        });
    } else {
      setLogin(false);
      setUser(null);
    }
  }, [token]);

  return (
    <UserContext.Provider value={{ isLogin, setLogin, token, setToken, user, setUser }}>
      <Header />
      <Routes>
        <Route path="/home" Component={Home} />
        <Route exact path="/" Component={Home} />
        <Route path="/about-us" Component={AboutUs} />
        <Route path="/login" Component={Login} />
        <Route path="/register" Component={Registration} />
        <Route path="/post-article" Component={ProtectedArticle} />
        <Route path="/view-article/:id" Component={ViewArticle} />
      </Routes>
    </UserContext.Provider>
  );
};

export default MyRoutes;

