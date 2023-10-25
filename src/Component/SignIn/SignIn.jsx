import "tailwindcss/tailwind.css";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Profile_Benom_Logo from "../../assets/Profile_Benom_Logo.png";
import facebook_Icon from "../../assets/facebook_Icon.svg";
import Google_Icon from "../../assets/Google_Icon.svg";
import { useLoginContext } from "../../Context/LoginContext";
import axios from "axios";
import Loading from "../Layout/Loading";
// import Cookies from "js-cookie";

const SignIn = () => {
  const { login, setLogin, user, setUser } = useLoginContext();
  const navigate = useNavigate();
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submitHandler = async (ev) => {
    ev.preventDefault();
    const loginData = {
      account,
      password,
    };
    try {
      setLoading(true);
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
      const { email, joinDate, userName, dailyCalories, height, weight, birthday, profilePicture, gender, firstName, lastName } = userData.data.data;
      const exerciseData = await axios.get(`https://benom-backend.onrender.com/users/${_id}/activities`, {
        headers,
      });
      const { caloriesBurned, exerciseTime, liveCaloriesBurned, liveExerciseTime, exerciseLog } = exerciseData.data.data;
      // const data = await axios.get(`http://localhost:3001/users/${_id}`, { withCredentials: true });
      // console.log(data);

      localStorage.setItem(
        "user",
        JSON.stringify({ _id, firstName, lastName, profilePicture, email, joinDate, userName, headers, caloriesBurned, exerciseTime, liveCaloriesBurned, liveExerciseTime, exerciseLog, dailyCalories, height, weight, birthday, gender })
      );
      setUser({ ...user, firstName, lastName, profilePicture, _id, email, joinDate, userName, headers, caloriesBurned, exerciseTime, liveCaloriesBurned, liveExerciseTime, exerciseLog, dailyCalories, height, weight, birthday, gender });
      // console.log(localStorage.getItem("user"));
      setLogin(true);
      setLoading(false);
      navigate("/home");
    } catch (err) {
      console.error(err);
    }
  };
  if (login) {
    // navigate("/profile");
  }
  return (
    <div className="bg-dark-blue pb-10 min-h-screen">
      <div className="signInImageContainer">
        <img src={Profile_Benom_Logo} width={170} height={70} className="max-w-[250px] mx-auto pt-20" />
      </div>
      <Loading loading={loading} />
      <h1 className="text-white text-4xl font-extrabold flex justify-center">BENOM</h1>
      <form onSubmit={submitHandler} className="max-w-[250px] w-full mx-auto py-3 ">
        <input
          required
          type="text"
          placeholder="Email/Username"
          className="input input-bordered input-sm mt-2 text-start text-xs font-bold w-full bg-gray-800 text-white "
          onChange={(ev) => {
            setAccount(ev.target.value);
          }}
        />
        <br />
        <input
          required
          type="password"
          placeholder="Password"
          className="input input-bordered input-sm mt-2 text-start text-xs font-bold w-full bg-gray-800 text-white"
          onChange={(ev) => {
            setPassword(ev.target.value);
          }}
        />
        <br />
        <a href="#" className="text-white flex justify-center font-semibold pl-20 mt-2 mb-1 hover:transition-all hover:scale-105  duration-150">
          <Link to={"/Forgotpassword"}>Forgot your password?</Link>
        </a>
        <button type="submit" className="btn btn-wide btn-sm mt-3 text-xs hover:scale-105 shadow-md shadow-gray-950 duration-150">
          Login
        </button>
      </form>

      <div className="apiContainer max-w-[250px] mx-auto ">
        <p className="text-white text-center opacity-20">⸻ or continue with ⸻</p>
        <button className="googleLogin btn btn-neutral btn-wide  btn-sm mt-3 text-xs hover:scale-105 shadow-md shadow-gray-950 duration-150 disabled:text-white disabled:opacity-50" disabled={true}>
          <img src={Google_Icon} width={18} height={18} />
          Login
        </button>
        <br />
        <button className="fbLogin btn btn-neutral btn-wide  btn-sm my-3 text-xs hover:scale-105 shadow-md shadow-gray-950 duration-150 disabled:text-white disabled:opacity-50" disabled={true}>
          <img src={facebook_Icon} width={18} height={18} />
          Login
        </button>
      </div>
      <div className="text-white font-semibold text-center mt-2">
        <span className="opacity-50">Don't have an account?</span>
        <button className=" btn btn-outline  ml-2 text-white border-none hover:scale-105">
          <Link to={"/signup"}>
            {/* {"  "} */}
            Sign up
          </Link>
        </button>
      </div>
      <br />
    </div>
  );
};

export default SignIn;
