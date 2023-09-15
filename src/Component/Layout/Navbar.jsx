import React from "react";
import { Link } from "react-router-dom";
import { useLoginContext } from "../../Context/LoginContext"
const Navbar = () => {
  const { login } = useLoginContext();
  return (
    <nav className=" flex justify-between mx-5 text-2xl my-7 text-black ">
      <Link id="logo" to={"/"}>
        Benom
      </Link>
      <ul className=" flex">
        <li>
          <Link to={"/home"}>Home</Link>
        </li>
        <li className="mx-5 ">
          <Link to={"/about"}>About Us</Link>
        </li>
        <li >
        {!login && <Link to={"/signin"}>Sign in</Link>}
        {login && <Link to={"/profile"}>Profile</Link>}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
