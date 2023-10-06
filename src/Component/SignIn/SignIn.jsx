import "tailwindcss/tailwind.css";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Profile_Benom_Logo from "../../assets/Profile_Benom_Logo.png";
import facebook_Icon from "../../assets/facebook_Icon.svg";
import Google_Icon from "../../assets/Google_Icon.svg";
import { useLoginContext } from "../../Context/LoginContext";
import axios from "axios";
// import Cookies from "js-cookie";

const SignIn = () => {
  const { login, setLogin, user, setUser } = useLoginContext();
  const navigate = useNavigate();
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const submitHandler = async (ev) => {
    ev.preventDefault();
    const loginData = {
      account,
      password,
    };
    try {
      const response = await axios.post("https://benom-backend.onrender.com/signin", loginData);

      // const expirationTime = new Date();
      // expirationTime.setTime(expirationTime.getTime() + 2 * 60 * 60 * 1000); // 2 hours in milliseconds
      // const cookiesOptions = {
      //   expires: expirationTime,
      //   // secure: true,
      //   // httpOnly: true,
      // };
      const { token, _id } = response.data;
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      // Cookies.set("token", token, cookiesOptions);
      // console.log(token);
      // console.log(_id);
      const userData = await axios.get(`https://benom-backend.onrender.com/users/${_id}`, {
        headers,
      });
      // console.log(userData.data.data);
      const { email, joinDate, userName } = userData.data.data;
      const exerciseData = await axios.get(`https://benom-backend.onrender.com/users/${_id}/activities`, { headers });
      const { caloriesBurned, exerciseTime, liveCaloriesBurned, liveExerciseTime, exerciseLog } = exerciseData.data.data;
      // const data = await axios.get(`http://localhost:3001/users/${_id}`, { withCredentials: true });
      // console.log(data);
      setUser({ ...user, _id, email, joinDate, userName, headers, caloriesBurned, exerciseTime, liveCaloriesBurned, liveExerciseTime, exerciseLog });
      setLogin(true);
      navigate("/home");
    } catch (err) {
      console.error(err);
    }
  };
  if (login) {
    // navigate("/profile");
  }
  return (
    <div className="bg-salmon-profile">
      <div className="signInImageContainer">
        <img src={Profile_Benom_Logo} width={170} height={70} className="max-w-[250px] mx-auto" />
      </div>
      <h1 className="text-white text-4xl font-extrabold flex justify-center">BENOM</h1>
      <form onSubmit={submitHandler} className="max-w-[250px] w-full mx-auto py-3">
        <input
          required
          type="text"
          placeholder="Email/Username"
          className="input input-bordered input-sm mt-2 text-start text-xs font-bold w-full"
          onChange={(ev) => {
            setAccount(ev.target.value);
          }}
        />
        <br />
        <input
          required
          type="password"
          placeholder="Password"
          className="input input-bordered input-sm mt-2 text-start text-xs font-bold w-full"
          onChange={(ev) => {
            setPassword(ev.target.value);
          }}
        />
        <br />
        <a href="#" className="text-gray-600 flex justify-center pl-20 hover:text-white">
          Forgot your password?
        </a>
        <button type="submit" className="btn btn-wide  btn-sm mt-3 text-xs font-bold">
          Login
        </button>
      </form>

      <div className="apiContainer max-w-[250px] mx-auto">
        <p className="text-gray-600 text-center">⸻ or continue with ⸻</p>
        <div className="googleLogin btn btn-neutral btn-wide  btn-sm mt-3 text-xs font-bold">
          <img src={Google_Icon} width={18} height={18} />
          Login
        </div>
        <br />
        <div className="fbLogin btn btn-neutral btn-wide  btn-sm my-3 text-xs font-bold">
          <img src={facebook_Icon} width={18} height={18} />
          Login
        </div>
      </div>
      <p className="text-gray-700 font-semibold text-center mt-8">
        Don't have an account?
        <Link to={"/signup"} className="text-white hover:text-xs hover:text-white hover:font-bold">
          {" "}
          Sign up
        </Link>
      </p>
      <br />
    </div>
  );
};

export default SignIn;
