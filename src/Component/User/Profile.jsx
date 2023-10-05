import React, { useEffect } from "react";
import { useLoginContext } from "../../Context/LoginContext";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import defaultPicture from "../../assets/Emily_profile_icon.png";

const Profile = () => {
  const { login, user } = useLoginContext();
  const navigate = useNavigate();
  if (!login) {
    navigate("/signin");
  }

  // const profileImageStyle = {
  //   width: '200px',
  //   height: '200px',
  //   borderRadius: '50%',
  //   position: 'relative',
  //   top: '80px',
  //   left: '40px',
  // };

  return (
    <div className="mx-auto">
      <div className="flex bg-salmon justify-center max-sm:">
        <img
          className="flex relative top-[70px] w-[200px]  h-[200px] rounded-full sm:hidden"
          src={user.profilePicture || defaultPicture}
          alt="Profile"
          // style={profileImageStyle}
        />
      </div>
      {/* <div className="flex  bg-salmon  p-4 rounded-t-lg "> */}
      <div className="flex bg-salmon items-end">
        <div className=" w-1/2">
          <img
            className=" relative top-[70px] left-1/4 w-[200px]  h-[200px] rounded-full max-sm:hidden"
            src={user.profilePicture || defaultPicture}
            alt="Profile"
            // style={profileImageStyle}
          />
        </div>
        <div className=" w-1/2 text-white font-bold text-2xl max-sm:hidden">
          <h1>Welcome, {user.userName}</h1>
        </div>
      </div>

      {/* </div> */}

      <div className="bg-white p-4 rounded-b-lg pt-20 md:flex md:flex-row">
        <div className="md:flex-1">
          <h2 className="text-salmon font-bold text-2xl mb-5 text-center md:text-left max-sm:hidden">PERSONAL INFO</h2>
          <h2 className="text-salmon font-bold text-2xl mb-5 text-center md:text-left sm:hidden ">Welcome, {user.userName}</h2>
          <h2 className="text-white font-bold text-2xl text-center sm:hidden">Welcome, {user.userName}</h2>

          <div className="field-value-pair">
            <p>
              <span className="text-black">First name</span>
              <span className="text-salmon"> {user.firstName || "please add via edit button"}</span>
            </p>
            <p>
              <span className="text-black">Last name</span>
              <span className="text-salmon"> {user.lastName || "please add via edit button"}</span>
            </p>
            <p>
              <span className="text-black">Gender</span>
              <span className="text-salmon"> {user.gender || "please add via edit button"}</span>
            </p>
            <p>
              <span className="text-black">Birthday</span>
              <span className="text-salmon"> {user.birthday || "please add via edit button"}</span>
            </p>
            <p>
              <span className="text-black">Email</span>
              <span className="text-salmon"> {user.email}</span>
            </p>
            <p>
              <span className="text-black">Height</span>
              <span className="text-salmon"> {user.height ? user.height + " (cm)" : "please add via edit button"}</span>
            </p>
            <p>
              <span className="text-black">Weight</span>
              <span className="text-salmon"> {user.weight ? user.weight + " (kg)" : "please add via edit button"}</span>
            </p>
          </div>

          <Link to="/edit-profile">
            <button className="bg-salmon hover:bg-blue-700 text-white font-bold py-2 px-4 rounded block mx-auto md:mx-0 md:mt-5">Edit</button>
          </Link>
        </div>

        <div className="md:flex-1 ">
          <p>
            <span className="text-black">Daily Calories</span>
            <br />
            <span className="text-salmon"> {`temp` || user.calories}</span>
          </p>
          <p>
            <span className="text-black">BMI</span>
            <br />
            <span className="text-salmon"> {`temp`}</span>
          </p>
          <p>
            <span className="text-black">Total time exercised</span>
            <br />
            <span className="text-salmon"> {user.exerciseTime}</span>
          </p>
          <p>
            <span className="text-black">Total time exercised(live)</span>
            <br />
            <span className="text-salmon"> {user.liveExerciseTime}</span>
          </p>
          <p>
            <span className="text-black">Total calories burned</span>
            <br />
            <span className="text-salmon"> {user.caloriesBurned}</span>
          </p>
          <p>
            <span className="text-black">Total calories burned(live)</span>
            <br />
            <span className="text-salmon"> {user.liveCaloriesBurned}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
