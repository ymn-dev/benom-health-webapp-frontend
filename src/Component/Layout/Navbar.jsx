import React from "react";
import { Link } from "react-router-dom";
import img1 from "../../assets/Benom_card_icon.png"
import UserIMG from "../../assets/user.png"
import { useLoginContext } from "../../Context/LoginContext";
const Navbar = () => {
  const { login, user, setUser, setLogin } = useLoginContext();
  const handleLogout = () => {
    setUser({});
    setLogin(false);
  };
  return (

    <div className="navbar bg-salmon">
  <div className="flex-1">
   {login && <Link to='/home'><a className="btn btn-ghost normal-case text-xl">BENOM</a></Link>}
   {!login && <Link to='/'><a className="btn btn-ghost normal-case text-xl">BENOM</a></Link>}
  </div>
  <div className="flex-none gap-2">
    <div className="form-control">
    </div>
    <Link to='/about'><a className=" text-white normal-case text-xl">About us</a></Link>
    {!login && <Link to={"/signin"}><span className="text-xl normal-case">Sign in</span></Link>}
    {login && <div className="dropdown dropdown-end">      
      <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          {/* {!login && <img src={UserIMG} />} */}
          {login && <img src={user.profilePicture} />}  
        </div>
      </label>
      <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
        <li>
        {!login && <Link to={"/signin"}><span className="">Sign in</span></Link>}
        {login && <Link to={"/profile"}><span className="">Profile</span></Link>}
        </li>
        {/* <li><Link to='/about'><a>About us</a></Link></li> */}
        {login && <li><a onClick={handleLogout}>Logout</a></li>}
      </ul>
    </div>}
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
