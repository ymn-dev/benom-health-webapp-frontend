import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <Link id="logo" to={"/"}>
        Benom
      </Link>
      <ul>
        <li>
          <Link to={"/home"}>Home</Link>
        </li>
        <li>
          <Link to={"/about"}>About Us</Link>
        </li>
        <li>
          <Link to={"/signin"}>Sign in</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
