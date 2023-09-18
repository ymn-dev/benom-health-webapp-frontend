import "tailwindcss/tailwind.css";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Profile_Benom_Logo from "../../assets/Profile_Benom_Logo.png";
import facebook_Icon from "../../assets/facebook_Icon.svg";
import Google_Icon from "../../assets/Google_Icon.svg";
import { useLoginContext } from "../../Context/LoginContext";

const SignIn = () => {
  const { login } = useLoginContext();
  const navigate = useNavigate();
  if (login) {
    navigate("/profile");
  }
  return (
    <div className="bg-salmon-profile">
      <div className="signInImageContainer">
        <img src={Profile_Benom_Logo} width={170} height={70} className="max-w-[250px] mx-auto" />
      </div>
      <h1 className="text-white text-4xl font-extrabold flex justify-center">BENOM</h1>
      <form className="max-w-[250px] w-full mx-auto py-3">
        <input placeholder="Email" className="btn btn-neutral btn-wide btn btn-sm mt-2 text-start text-xs font-bold" />
        <br />
        <input placeholder="Password" className="btn btn-neutral btn-wide btn btn-sm my-3 text-start text-xs font-bold" />
        <br />
        <a href="#" className="text-gray-600 flex justify-center pl-20 hover:text-white">
          Forgot your password?
        </a>
        <button className="btn btn-wide btn btn-sm mt-3 text-xs font-bold">Login</button>
      </form>

      <div className="apiContainer max-w-[250px] mx-auto">
        <p className="text-gray-600 text-center">⸻ or continue with ⸻</p>
        <div className="googleLogin btn btn-neutral btn-wide btn btn-sm mt-3 text-xs font-bold">
          <img src={Google_Icon} width={18} height={18} />
          Login
        </div>
        <br />
        <div className="fbLogin btn btn-neutral btn-wide btn btn-sm my-3 text-xs font-bold">
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
