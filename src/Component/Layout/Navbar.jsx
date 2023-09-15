import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className=" flex justify-between ml-5 text-2xl">
      <Link id="logo" to={"/"}>
        Benom
      </Link>
      <ul className=" flex mr-5">
        <li>
          <Link to={"/home"}>Home</Link>
        </li>
        <li className="mx-5">
          <Link to={"/about"}>About Us</Link>
        </li>
        <li >
          <Link to={"/signin"}>Sign in</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
