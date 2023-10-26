import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Profile_Benom_Logo from "../../assets/Profile_Benom_Logo.png";
import jwt_decode from "jwt-decode";
import axios from "axios";
import Loading from "../Layout/Loading";
import togglePasswordOn from "../../assets/eye-svgrepo-com.svg";
import togglePasswordOff from "../../assets/eye-closed-svgrepo-com.svg";

const ResetPassword = () => {
  const location = useLocation();
  const token = new URLSearchParams(location.search).get("token");
  const [seePassword, setSeePassword] = useState(false);
  const [seeConfirmPassword, setSeeConfirmPassword] = useState(false);
  let decoded;
  try {
    decoded = jwt_decode(token);
  } catch (error) {
    alert(response.response.data.error);
    console.error("Failed to decode token:", error);
  }
  const [newpassword, setNewpassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newpassword !== confirmPassword) {
      setConfirmPasswordError("confirm password needs to match your password");
      return;
    }
    try {
      setLoading(true);
      const response = await axios.patch(
        `
      https://benom-backend.onrender.com/resetPassword`,
        { newPassword: newpassword, token }
      );
      setLoading(false);
      if (response.status === 200) {
        alert("successfully changed the password");
      }
    } catch (err) {
      setLoading(false);
      console.error(err);
      alert(err.response.data.error);
    }
  };

  return (
    <div className="bg-dark-blue pb-10 min-h-screen">
      <div className="ForgotImageContainer">
        <img src={Profile_Benom_Logo} width={170} height={70} className="max-w-[250px] mx-auto pt-20" />
      </div>
      <Loading loading={loading} />
      <h1 className="text-white text-4xl font-extrabold flex justify-center">BENOM</h1>
      <h1 className=" text-center text-slate-300 my-2 font-bold">Reset Password for {decoded.email}</h1>
      <form onSubmit={handleSubmit} className="max-w-[250px] w-full mx-auto pb-3">
        <div className="relative flex flex-col ml-8 gap-y-3">
          <label>
            <input
              className=" input input-bordered input-sm mt-2 text-start text-xs font-bold bg-gray-800 text-white"
              type={seePassword ? "text" : "password"}
              placeholder="New Password"
              value={newpassword}
              onChange={(e) => setNewpassword(e.target.value)}
              required
            />
          </label>

          <span
            className="absolute w-4 h-4 right-3 top-4"
            onClick={() => {
              setSeePassword(!seePassword);
            }}>
            <img src={seePassword ? togglePasswordOn : togglePasswordOff} alt="see password" className="" />
          </span>
        </div>

        <div className="relative flex flex-col ml-8 gap-y-3">
          <label>
            <input
              className="input input-bordered input-sm mt-2 text-start text-xs font-bold bg-gray-800 text-white"
              type={seeConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setconfirmPassword(e.target.value)}
              required
            />
          </label>

          <span
            className="absolute w-4 h-4 right-3 top-4"
            onClick={() => {
              setSeeConfirmPassword(!seeConfirmPassword);
            }}>
            <img src={seeConfirmPassword ? togglePasswordOn : togglePasswordOff} alt="see confirm password" className="" />
          </span>
        </div>
        {confirmPasswordError && <p style={{ color: "red" }}>{confirmPasswordError}</p>}
        <div className="flex justify-center mt-4 ">
          <button className=" btn-sm bg-white hover:bg-[#d7d5d5] hover:scale-105 shadow-md shadow-gray-950 duration-150 rounded-lg text-center font-medium p-1" type="submit">
            Reset Password
          </button>
        </div>
      </form>
    </div>
  );
};

export default ResetPassword;
