import React, { Component, useState } from "react";
import { Button } from "../Button/Button";
import { MenuItems } from "./MenuItems";

import { Link } from "react-router-dom";

import "./Navbar.css";
const Navbar = () => {
  const [clicked, setisclicked] = useState(false);

  const handleClick = () => {
    setisclicked((clicked) => !clicked);
  };

  return (
    <nav className="Navbaritems">
      <h1 className="navbar-logo">
        <b>Type Master</b>
        <i className="fab-react"></i>
      </h1>
      <div className="menu-icon" onClick={() => handleClick}>
        <i className={clicked ? "fas fa-times" : "fas fa-bars"}></i>
      </div>
      <ul className={clicked ? "nav-menu active" : "nav-menu"}>
        {MenuItems.map((item, index) => {
          return (
            <li key={index}>
              <a className={item.cName} href={item.url}>
                {item.title}
              </a>
            </li>
          );
        })}
      </ul>

      <Link to="/login" className="btn btn-primary">
        Login
      </Link>

      <Link to="/signup" className="btn btn-primary">
        Sign up
      </Link>
    </nav>
  );
};

export default Navbar;
