import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Profile_Benom_Logo from "../../assets/Profile_Benom_Logo.png";
import facebook_Icon from "../../assets/facebook_Icon.svg";
import Google_Icon from "../../assets/Google_Icon.svg";
import isEmail from "validator/lib/isEmail";
import PasswordValidator from "password-validator";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState([]);
  const [emailError, setEmailError] = useState([]);
  const [passwordError, setPasswordError] = useState([]);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const submitHandler = (ev) => {
    ev.preventDefault();
    if (!username || !email || !password) {
      return;
    }
    setUsernameError([]);
    setEmailError([]);
    setPasswordError([]);
    setSubmitSuccess(false);
    let localUsernameError = false;
    let localUemailError = false;
    let localPasswordError = false;

    const processedUsername = username.trim().toLowerCase();
    const processedEmail = email.trim().toLowerCase();
    const processedPassword = password.trim();

    if (processedUsername.indexOf(" ") > -1) {
      setUsernameError((old) => [...old, "username should not contains a space"]);
      localUsernameError = true;
    }
    const isValidUsername = (inputString) => {
      const alphanumericRegex = /^[a-zA-Z0-9_-]+$/;

      return alphanumericRegex.test(inputString);
    };
    if (!isValidUsername(processedUsername)) {
      setUsernameError((old) => [...old, "Username only take alphabets, numbers and _(underscore) -(hyphen)"]);
      localUsernameError = true;
    }

    if (processedUsername.length < 3) {
      setUsernameError((old) => [...old, "Username length should be at least 3 characters"]);
      localUsernameError = true;
    }
    if (processedUsername.length > 20) {
      setUsernameError((old) => [...old, "Username max length is 20 characters"]);
      localUsernameError = true;
    }

    if (!isEmail(processedEmail)) {
      setEmailError((old) => [...old, "Email is not valid"]);
      localUemailError = true;
    }
    if (!isEmail(processedEmail, { allow_utf8_local_part: false })) {
      setEmailError((old) => [...old, "Email only allowed alphabets and numbers"]);
      localUemailError = true;
    }

    const pwVa = new PasswordValidator();
    pwVa.is().min(8);
    pwVa.has().uppercase();
    pwVa.has().lowercase();
    pwVa.has().symbols();
    pwVa.has().digits();
    pwVa.has().not().spaces();
    const errDetails = pwVa.validate(processedPassword, { details: true });
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
    if (localUsernameError || localUemailError || localPasswordError) {
      return;
    } else {
      //putting into database + to check backend duplicate later
      const registedUser = {
        id: crypto.randomUUID(),
        userName: processedUsername,
        email: processedEmail,
        password: processedPassword,
      };
      setSubmitSuccess(true);
    }
  };

  return (
    <div className="bg-salmon-profile">
      <div className="signUpImageContainer">
        <img src={Profile_Benom_Logo} width={170} height={70} className="max-w-[250px] mx-auto" />
      </div>
      <h1 className="text-white text-3xl font-extrabold flex justify-center">BENOM'S SIGN UP</h1>
      <form onSubmit={submitHandler} className="max-w-[250px] w-full mx-auto py-3">
        <input
          required
          type="text"
          minLength={3}
          maxLength={20}
          name="userName"
          placeholder="Username"
          className="btn btn-neutral btn-wide btn btn-sm mt-2 text-start text-xs font-bold"
          onChange={(ev) => {
            setUsername(ev.target.value);
          }}
        />

        {usernameError.length > 0 &&
          usernameError.map((error, index) => (
            <p key={index} style={{ color: "red" }}>
              {error}
            </p>
          ))}
        <br />
        <input
          required
          type="email"
          name="email"
          placeholder="Email"
          className="btn btn-neutral btn-wide btn btn-sm mt-3 text-start text-xs font-bold"
          onChange={(ev) => {
            setEmail(ev.target.value);
          }}
        />
        <br />

        {emailError.length > 0 &&
          emailError.map((error, index) => (
            <p key={index} style={{ color: "red" }}>
              {error}
            </p>
          ))}
        <input
          required
          type="password"
          minLength={8}
          name="password"
          placeholder="Password"
          className="btn btn-neutral btn-wide btn btn-sm mt-3 text-start text-xs font-bold"
          onChange={(ev) => {
            setPassword(ev.target.value);
          }}
        />
        <br />

        {passwordError.length > 0 &&
          passwordError.map((error, index) => (
            <p key={index} style={{ color: "red" }}>
              {error}
            </p>
          ))}
        <button type="submit" className="btn btn-wide btn btn-sm mt-3 text-xs font-bold" disabled={!username || !password || !email || submitSuccess}>
          Sign up
        </button>
        {submitSuccess && <p style={{ color: "green" }}>register success!</p>}
      </form>
      <div className="apiContainer max-w-[250px] mx-auto">
        <p className="text-gray-600 text-center">⸻ or continue with ⸻</p>
        <div className="googleLogin btn btn-neutral btn-wide btn btn-sm mt-3 text-xs font-bold">
          <img src={Google_Icon} width={18} height={18} />
          Login
        </div>
        <br />

        <div className="fbLogin btn btn-neutral btn-wide btn btn-sm mt-3 text-xs font-bold">
          <img src={facebook_Icon} width={18} height={18} />
          Login
        </div>
      </div>

      <p className="text-gray-700 font-semibold text-center mt-8">
        Already have an account?
        <Link to={"/signin"} className="text-white hover:text-xs hover:text-white hover:font-bold">
          {" "}
          Log in
        </Link>
      </p>
      <br />
    </div>
  );
};

export default SignUp;
