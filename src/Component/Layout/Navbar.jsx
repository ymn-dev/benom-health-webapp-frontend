import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className=" flex justify-between mx-5 text-2xl my-7 ">
      <Link id="logo" to={"/"}>
        Benom
      </Link>
      <ul className=" flex ">
        <li>
          <Link to={"/home"}>Home</Link>
        </li>
        <li className="mx-5">
          <Link to={"/about"}>About Us</Link>
        </li>
        <li >
          <Link to={"/profile"}>Sign in</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
