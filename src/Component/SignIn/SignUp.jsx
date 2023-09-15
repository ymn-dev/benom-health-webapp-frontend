import React from "react";
import { Link } from "react-router-dom";
import Profile_Benom_Logo from "../../assets/Profile_Benom_Logo.png";
import facebook_Icon from "../../assets/facebook_Icon.svg";
import Google_Icon from "../../assets/Google_Icon.svg";


const SignUp = () => {
  return (
    <div className="bg-salmon-profile">
      <div className="signUpImageContainer">
        <img src={Profile_Benom_Logo} width={170} height={70} className="max-w-[250px] mx-auto"/>
      </div>
      <h1 className="text-white text-3xl font-extrabold flex justify-center">BENOM'S SIGN UP</h1>
      <form className="max-w-[250px] w-full mx-auto py-3">
        <input placeholder="Username" className="btn btn-neutral btn-wide btn btn-sm mt-2 text-start text-xs font-bold"/>
        <br />
        <input placeholder="Email" className="btn btn-neutral btn-wide btn btn-sm mt-3 text-start text-xs font-bold"/>
        <br />
        <input placeholder="Password" className="btn btn-neutral btn-wide btn btn-sm mt-3 text-start text-xs font-bold"/>
        <br />
        <button type="submit" className="btn btn-wide btn btn-sm mt-3 text-xs font-bold">Sign up</button>
      </form>
      <div className="apiContainer max-w-[250px] mx-auto">
        <p className="text-gray-600 text-center">⸻ or continue with ⸻</p>
        <div className="googleLogin btn btn-neutral btn-wide btn btn-sm mt-3 text-xs font-bold">
          <img src={Google_Icon} width={18} height={18}/>Login
        </div><br />
        
        <div className="fbLogin btn btn-neutral btn-wide btn btn-sm mt-3 text-xs font-bold">
          <img src={facebook_Icon} width={18} height={18}/>Login
        </div>
        </div>

      <p className="text-gray-700 font-semibold text-center mt-8">
        Already have an account?
        <Link to={"/signin"} className="text-white hover:text-xs hover:text-white hover:font-bold"> Log in</Link>
      </p>
      <br />
    </div>
  );
};

export default SignUp;
