import React from "react";
import { Link, useNavigate } from "react-router-dom";
import img1 from "../../assets/Benom_card_icon.png";
import venomnav from "../../assets/venomnav.png";
import UserIMG from "../../assets/user.png";
import defaultPicture from "../../assets/Emily_profile_icon.png";
import { useLoginContext } from "../../Context/LoginContext";
const Navbar = () => {
  const navigate = useNavigate();
  const { login, user, setUser, setLogin } = useLoginContext();
  const handleLogout = () => {
    setUser({});
    setLogin(false);
    localStorage.removeItem("user");
    navigate("/");
  };
  
  return (
    <div className="navbar flex px-6 w-full h-18  bg-[url(https://cdn.discordapp.com/attachments/1128605126400155680/1164410797703839744/venomnav.png?ex=65431d0f&is=6530a80f&hm=0dec22c196c61761db6e6eeb0fec2fa029c818bb2d3aec537c00bf629fe9f26b&)]">
      
      <div className="flex-1">
        {login && (
          <Link to="/home">
            <a className=" normal-case font-bold text-xl text-white  hover:text-dark-blue duration-150">BENOM</a>
          </Link>
        )}
        {!login && (
          <Link to="/">
            <a className="normal-case font-bold text-xl text-white   hover:text-dark-blue duration-150">BENOM</a>
          </Link>
        )}
      </div>
      <div className="flex-none gap-5">
        <div className="form-control"></div>
        <Link to="/about">
          <a className="normal-case text-xl text-white hover:text-dark-blue duration-150">About us</a>
        </Link>
        {!login && (
          <Link to={"/signin"}>
            <span className="text-xl normal-case text-white hover:text-dark-blue duration-150 ">Sign in</span>
          </Link>
        )}
        {login && (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                {/* {!login && <img src={UserIMG} />} */}
                {login && <img src={user.profilePicture || defaultPicture} />}
              </div>
            </label>
            <ul tabIndex={0} className="mt-3 z-50 p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
              <li>
                {!login && (
                  <Link to={"/signin"}>
                    <span className="">Sign in</span>
                  </Link>
                )}
                {login && (
                  <Link to={"/profile"}>
                    <span className="">Profile</span>
                  </Link>
                )}
              </li>
              {/* <li><Link to='/about'><a>About us</a></Link></li> */}
              {login && (
                <li>
                  <a onClick={handleLogout}>Logout</a>
                </li>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
    // <nav className=" flex justify-between px-5 text-2xl py-7 text-black bg-[#FF9671]">
    //   <Link id="logo" to={"/"}>
    //   <span className="text-black hover:text-white">Benom</span>
    //   </Link>
    //   <ul className=" flex">
    //     <li>
    //       <Link to={"/home"}><span className="text-black  hover:text-white">Home</span></Link>
    //     </li>
    //     <li className="mx-5">
    //       <Link to={"/about"}><span className="text-black  hover:text-white">About Us</span></Link>
    //     </li>
    //     <li >
    //     {!login && <Link to={"/signin"}><span className="text-black  hover:text-white">Sign in</span></Link>}
    //     {login && <Link to={"/profile"}><span className="text-black  hover:text-white">Profile</span></Link>}

    //     </li>
    //   </ul>
    // </nav>
  );
};

export default Navbar;
