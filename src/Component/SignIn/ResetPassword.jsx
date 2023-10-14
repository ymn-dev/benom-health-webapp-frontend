import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Profile_Benom_Logo from "../../assets/Profile_Benom_Logo.png";
import jwt_decode from "jwt-decode";
import axios from "axios";

const ResetPassword = () => {
  const location = useLocation();
  const token = new URLSearchParams(location.search).get("token");
  let decoded;
  try {
    decoded = jwt_decode(token);
  } catch (error) {
    console.error("Failed to decode token:", error);
  }
  const [newpassword, setNewpassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newpassword !== confirmPassword) {
      setConfirmPasswordError("confirm password needs to match your password");
      return;
    }
    try {
      const response = await axios.patch(
        `
      https://benom-backend.onrender.com/resetPassword`,
        { newPassword: newpassword, token }
      );
      if (response.status === 200) {
        alert("successfully changed the password");
      }
    } catch (err) {
      console.error(err);
      alert("some error happened, try again");
    }
  };

  return (
    <div className="bg-salmon-profile h-screen w-full">
      <div className="ForgotImageContainer">
        <img src={Profile_Benom_Logo} width={170} height={70} className="max-w-[250px] mx-auto" />
      </div>
      <h1 className="text-white text-4xl font-extrabold flex justify-center">BENOM</h1>
      <h1 className=" text-center my-2  font-bold">Reset Password for {decoded.email}</h1>
      <form onSubmit={handleSubmit} className="max-w-[250px] w-full mx-auto pb-3">
        <div className="flex flex-col ml-8 gap-y-3">
          <label>
            New Password:
            <input className="input input-bordered input-sm mt-2 text-start text-xs font-bold" type="password" value={newpassword} onChange={(e) => setNewpassword(e.target.value)} required />
          </label>
        </div>
        <div className="flex flex-col ml-8 gap-y-3">
          <label>
            Confirm Password:
            <input className="input input-bordered input-sm mt-2 text-start text-xs font-bold" type="password" value={confirmPassword} onChange={(e) => setconfirmPassword(e.target.value)} required />
          </label>
        </div>
        {confirmPasswordError && <p style={{ color: "red" }}>{confirmPasswordError}</p>}
        <div className="flex justify-center mt-4 ">
          <button className=" bg-white hover:bg-[#F24822] rounded-lg text-center p-2" type="submit">
            Reset Password
          </button>
        </div>
      </form>
    </div>
  );
};

export default ResetPassword;
