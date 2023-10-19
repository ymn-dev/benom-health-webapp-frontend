import React, { useState } from "react";
import { Link } from "react-router-dom";
import Profile_Benom_Logo from "../../assets/Profile_Benom_Logo.png";
import axios from "axios";

const Forgotpassword = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //https://benom-backend.onrender.com
      const response = await axios.post(
        `
      https://benom-backend.onrender.com/resetPassword`,
        { email }
      );
      if (response.status === 200) {
        alert("success, please check your email");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-dark-blue h-screen w-full">
      <div className="ForgotImageContainer">
        <img src={Profile_Benom_Logo} width={170} height={70} className="max-w-[250px] mx-auto pt-20" />
      </div>
      <h1 className="text-white text-4xl font-extrabold flex justify-center">BENOM</h1>
      <h1 className=" text-center my-2 font-bold text-slate-300">Forgot Password</h1>
      <form onSubmit={handleSubmit} className="max-w-[250px] w-full mx-auto pb-3">
        <div className="flex flex-col gap-y-3 justify-center items-center">
          <label>
            <input className="input input-bordered input-sm mt-2 text-start text-xs font-bold bg-gray-800 text-white " type="email" onChange={(e) => setEmail(e.target.value)} required placeholder="Enter your email" />
          </label>
        </div>
        <br />
        <button className="btn-sm bg-white hover:bg-[#d7d5d5] hover:scale-105 shadow-md shadow-gray-950 duration-150 rounded-lg text-center font-medium ml-4 mr-4 p-1" type="submit">
          Reset Password
        </button>
        <Link to="/signin">
          <button className="btn-sm bg-white hover:bg-[#d7d5d5] hover:scale-105 shadow-md shadow-gray-950 duration-150 rounded-lg text-center font-medium p-1">Back to Sign In</button>
        </Link>
      </form>
      <div className="flex justify-center gap-4 pb-4"></div>
    </div>
  );
};

export default Forgotpassword;
