import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Profile_Benom_Logo from "../../assets/Profile_Benom_Logo.png";
import facebook_Icon from "../../assets/facebook_Icon.svg";
import Google_Icon from "../../assets/Google_Icon.svg";
import isEmail from "validator/lib/isEmail";
import PasswordValidator from "password-validator";
import { useLoginContext } from "../../Context/LoginContext";
import axios from "axios";
import Loading from "../Layout/Loading";

const SignUp = () => {
  const { login } = useLoginContext();
  const navigate = useNavigate();
  if (login) {
    navigate("/home");
  }
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [usernameError, setUsernameError] = useState([]);
  const [emailError, setEmailError] = useState([]);
  const [passwordError, setPasswordError] = useState([]);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const submitHandler = async (ev) => {
    ev.preventDefault();
    if (!username || !email || !password || !confirmPassword) {
      return;
    }
    setUsernameError([]);
    setEmailError([]);
    setPasswordError([]);
    setSubmitSuccess(false);
    let localUsernameError = false;
    let localUemailError = false;
    let localPasswordError = false;
    let localconfirmPasswordError = false;

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
    // ส่วนของของการตรวจสอบ ยืนยัน password
    if (password !== confirmPassword) {
      setConfirmPasswordError("Password and Confirm Password do not match"); // ตั้งค่าข้อความแจ้งเตือน
      localPasswordError = true;
      localconfirmPasswordError = true;
    } else {
      setConfirmPasswordError(""); // ล้างข้อความแจ้งเตือนหากตรงกัน
    }

    if (localUsernameError || localUemailError || localPasswordError || localconfirmPasswordError) {
      return;
    } else {
      //putting into database + to check backend duplicate later
      const registedUser = {
        userName: processedUsername,
        email: processedEmail,
        password: processedPassword,
      };
      try {
        setLoading(true);
        const response = await axios.post(`https://benom-backend.onrender.com/users`, registedUser);
        if (response.status === 200) {
          setSubmitSuccess(true);
          setLoading(false);
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className="bg-dark-blue h-screen ">
      <div className="signUpImageContainer">
        <img src={Profile_Benom_Logo} width={170} height={70} className="max-w-[250px] mx-auto pt-20" />
      </div>
      <Loading loading={loading} />
      <h1 className="text-white text-3xl font-extrabold flex justify-center">BENOM'S SIGN UP</h1>
      <form onSubmit={submitHandler} className="max-w-[250px] w-full mx-auto py-3">
        <input
          required
          type="text"
          minLength={3}
          maxLength={20}
          name="userName"
          placeholder="Username"
          className="input input-bordered input-sm mt-2 text-start text-xs font-bold w-full bg-gray-800 text-white"
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
          className="input input-bordered input-sm mt-3 text-start text-xs font-bold w-full  bg-gray-800 text-white"
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
          className="input input-bordered input-sm mt-3 text-start text-xs font-bold w-full  bg-gray-800 text-white"
          onChange={(ev) => {
            setPassword(ev.target.value);
          }}
        />

        {passwordError.length > 0 &&
          passwordError.map((error, index) => (
            <p key={index} style={{ color: "red" }}>
              {error}
            </p>
          ))}

        {/* ส่วน confirm */}
        <input
          required
          type="password"
          minLength={8}
          name="confirmPassword"
          placeholder="Confirm Password"
          className="input input-bordered input-sm mt-3 text-start text-xs font-bold w-full  bg-gray-800 text-white"
          onChange={(ev) => {
            setConfirmPassword(ev.target.value);
          }}
        />
        {confirmPasswordError && <p style={{ color: "red" }}>{confirmPasswordError}</p>}
        <br />

        <button
          type="submit"
          className="btn btn-wide btn-sm mt-3 text-xs font-bold hover:scale-105 shadow-md shadow-gray-950 disabled:text-white disabled:opacity-20 disabled:cursor-not-allowed"
          disabled={!username || !password || !email || !confirmPassword || submitSuccess}
        >
          Sign up
        </button>
        {submitSuccess && <p style={{ color: "green", textAlign: "center" }}>Register Success!</p>}
      </form>
      <div className="apiContainer max-w-[250px] mx-auto">
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
        <span className="opacity-50">Already have an account?</span>
        <button className=" btn btn-outline  ml-2 text-white border-none hover:scale-105">
          <Link to={"/signin"}>
            {/* {"  "} */}
            Sign in
          </Link>
        </button>
      </div>
      <br />
    </div>
  );
};

export default SignUp;
