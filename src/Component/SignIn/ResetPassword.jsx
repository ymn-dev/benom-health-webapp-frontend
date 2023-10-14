import React, { useState } from 'react'
import { Link } from "react-router-dom";
import Profile_Benom_Logo from "../../assets/Profile_Benom_Logo.png";

const ResetPassword = () =>{
  const [newpassword, setNewpassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
  
  };

  return (
    <div className="bg-salmon-profile h-screen w-full">
      <div className="ForgotImageContainer">
        <img src={Profile_Benom_Logo} width={170} height={70} className="max-w-[250px] mx-auto" />
      </div>
      <h1 className="text-white text-4xl font-extrabold flex justify-center">BENOM</h1>
      <h1 className=" text-center my-2  font-bold">Reset Password</h1>
      <form onSubmit={handleSubmit} className="max-w-[250px] w-full mx-auto pb-3">
        <div className="flex flex-col ml-8 gap-y-3">
          <label>   
          New Password:
          <input className="input input-bordered input-sm mt-2 text-start text-xs font-bold"
            type="password"
            value={newpassword}
            onChange={(e) => setNewpassword(e.target.value)}
            required
          />
        </label></div>
        <div className="flex flex-col ml-8 gap-y-3">
        <label>   
          Confirm Password:
          <input className="input input-bordered input-sm mt-2 text-start text-xs font-bold"
            type="password"
            value={confirmPassword}
            onChange={(e) => setconfirmPassword(e.target.value)}
            required
          />
        </label>
        </div>
      </form>
      
        <div className="flex justify-center gap-4 ">         
        <Link to="/profile"><button className=" bg-white hover:bg-[#F24822] rounded-lg text-center p-2" type="submit">Reset Password</button></Link>                  
        </div>                          
    </div>
  );
};

export default ResetPassword;