import React from "react";
import { Link } from "react-router-dom";

const SignUp = () => {
  return (
    <>
      <div className="signUpImageContainer">
        <img />
      </div>
      <h1>BENOM</h1>
      <form>
        <input placeholder="Name" />
        <br />
        <input placeholder="Email" />
        <br />
        <input placeholder="Password" />
        <br />
        <button type="submit">Sign up</button>
      </form>
      <div className="apiContainer">
        <p>or continue with</p>
        <div className="googleLogin">
          <img />
          Log in
        </div>
        <div className="fbLogin">
          <img />
          Log in
        </div>
      </div>
      <p>
        Already have an account?
        <Link to={"/signin"}>Log in</Link>
      </p>
    </>
  );
};

export default SignUp;
