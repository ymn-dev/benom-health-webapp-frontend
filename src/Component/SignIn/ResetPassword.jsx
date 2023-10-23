import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Profile_Benom_Logo from "../../assets/Profile_Benom_Logo.png";
import jwt_decode from "jwt-decode";
import axios from "axios";
import Loading from "../Layout/Loading";
import PasswordValidator from "password-validator";

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
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const processedNewPassword = newpassword.trim();
    const pwVa = new PasswordValidator();
    pwVa.is().min(8);
    pwVa.has().uppercase();
    pwVa.has().lowercase();
    pwVa.has().symbols();
    pwVa.has().digits();
    pwVa.has().not().spaces();
    const errDetails = pwVa.validate(processedNewPassword, { details: true });
    //make custom text
    if (errDetails.length > 0) {
      const myError = errDetails.map((err) => err.validation);
      if (myError.indexOf("min") > -1) {
        setPasswordError((old) => [...old, "Password length should be at least 8 characters"]);
        localPasswordError = true;
      }
      if (myError.indexOf("uppercase") > -1) {
        setPasswordError((old) => [...old, "Password should have at least 1 uppercased character"]);
      }
      if (myError.indexOf("lowercase") > -1) {
        setPasswordError((old) => [...old, "Password should have at least 1 lowercased character"]);
        localPasswordError = true;
      }
      if (myError.indexOf("symbols") > -1) {
        setPasswordError((old) => [...old, "Password should have at least 1 symbol"]);
        localPasswordError = true;
      }
      if (myError.indexOf("digits") > -1) {
        setPasswordError((old) => [...old, "Password should have at least 1 number"]);
        localPasswordError = true;
      }
      if (myError.indexOf("spaces") > -1) {
        setPasswordError((old) => [...old, "Password should not contains a space"]);
        localPasswordError = true;
      }
    }
    if (newpassword !== confirmPassword) {
      setConfirmPasswordError("confirm password needs to match your password");
      return;
    }
    try {setLoading(true);
      const response = await axios.patch(
        `
      https://benom-backend.onrender.com/resetPassword`,
        { newPassword: processedNewPassword, token }
      );
      if (response.status === 200) {
        alert("successfully changed the password");
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
      alert("some error happened, try again");
    }
  };

  return (
    <div className="bg-dark-blue h-screen w-full">
      <div className="ForgotImageContainer">
        <img src={Profile_Benom_Logo} width={170} height={70} className="max-w-[250px] mx-auto pt-20" />
      </div>
      <Loading loading={loading} />
      <h1 className="text-white text-4xl font-extrabold flex justify-center">BENOM</h1>
      <h1 className=" text-center text-slate-300 my-2 font-bold">Reset Password for {decoded.email}</h1>
      <form onSubmit={handleSubmit} className="max-w-[250px] w-full mx-auto pb-3">
        <div className="flex flex-col ml-8 gap-y-3">
          <label>
            <input className="input input-bordered input-sm mt-2 text-start text-xs font-bold bg-gray-800 text-white" type="password" placeholder="New Password" value={newpassword} onChange={(e) => setNewpassword(e.target.value)} required />
          </label>
        </div>
        <div className="flex flex-col ml-8 gap-y-3">
          <label>
            <input className="input input-bordered input-sm mt-2 text-start text-xs font-bold bg-gray-800 text-white" type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setconfirmPassword(e.target.value)} required />
          </label>
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
