import React, { useState, useEffect, useContext } from 'react';
import './Header.scss';
import Navbar from 'react-bootstrap/Navbar';
import { Form, FormControl } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import UserContext from '../../context/user-token';


const Header = (props) => {
  const [message, setMessage] = useState('');
  const { isLogin, user, setLogin, setToken, setUser } = useContext(UserContext);

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_API}/`);
        if (response.data && response.data.message) {
          setMessage(response.data.message);
        }
      } catch (error) {
        console.error('Error fetching message from root endpoint:', error);
      }
    };

    fetchMessage();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken("");
    setLogin(false);
    setUser(null);
  };

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="#home">Article Management app - {message}</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Navbar className="mr-auto">
          <Link className="nav-link" to="/home">Home</Link>
          <Link className="nav-link" to="/post-article">Post Article</Link>
          <Link className="nav-link" to="/about-us">About Us</Link>
        </Navbar>

        <Form inline className="align-items-center">
          <FormControl type="text" placeholder="Search" className="mr-sm-2 mr-2" />
          {isLogin && user ? (
            <>
              <span className="navbar-text mr-3 font-weight-bold" style={{ marginRight: '15px' }}>
                Hello, {user.name}
              </span>
              <button type="button" className="btn btn-outline-danger" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <Link className="btn btn-outline-success" to="/login">Login</Link>
          )}
        </Form>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;


