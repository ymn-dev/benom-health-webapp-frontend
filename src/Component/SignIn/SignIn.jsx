import React from "react";
import { Link } from "react-router-dom";

const SignIn = () => {
  return (
    <>
      <div className="signInImageContainer">
        <img />
      </div>
      <h1>BENOM</h1>
      <form>
        <input placeholder="Email" />
        <br />
        <input placeholder="Password" />
        <br />
        <a href="#">Forgot your password?</a>
        <br />
        <button type="submit">Login</button>
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
        Don't have an account?
        <Link to={"/signup"}>Sign up</Link>
      </p>
    </>
  );
};

export default SignIn;
