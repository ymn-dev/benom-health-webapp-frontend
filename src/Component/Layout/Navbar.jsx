import React from "react";
import { Link } from "react-router-dom";
import { useLoginContext } from "../../Context/LoginContext"
const Navbar = () => {
  const { login } = useLoginContext();
  return (
    <nav className=" flex justify-between px-5 text-2xl py-7 text-black bg-[#FF9671]">
      <Link id="logo" to={"/"}>
      <span className="text-black hover:text-white">Benom</span>
      </Link>
      <ul className=" flex">
        <li>
          <Link to={"/home"}><span className="text-black  hover:text-white">Home</span></Link>
        </li>
        <li className="mx-5">
          <Link to={"/about"}><span className="text-black  hover:text-white">About Us</span></Link>
        </li>
        <li >
        {!login && <Link to={"/signin"}><span className="text-black  hover:text-white">Sign in</span></Link>}
        {login && <Link to={"/profile"}><span className="text-black  hover:text-white">Profile</span></Link>}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
