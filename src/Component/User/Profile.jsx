import React from "react";
import { useLoginContext } from "../../Context/LoginContext";
import { Link } from "react-router-dom";

const Profile = () => {
  const { login, user } = useLoginContext();

  if (!login) {
    return (
      <h1>
        Please <Link to={"/signin"}>Login</Link>
      </h1>
    );
  }

  const profileImageStyle = {
    width: '200px',
    height: '200px',
    borderRadius: '50%', 
    position: 'relative', 
    top: '80px', 
    left: '40px',
  };

  return (
    <div className="md:w-1/2 mx-auto">
      <div className="bg-salmon p-4 rounded-t-lg">
        <div className="flex justify-between items-center">
          <div>
            <img
              src={user.profilePicture}
              alt="Profile"
              style={profileImageStyle}
            />
          </div>
          <div className="text-white font-bold text-2xl text-center md:text-left">
            <h1>Welcome, {user.userName}</h1>
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-b-lg pt-20 md:flex md:flex-row">
        <div className="md:flex-1">
          <h2 className="text-salmon font-bold text-2xl mb-5 text-center md:text-left">PERSONAL INFO</h2>
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
              <span className="text-salmon"> {user.height + "(cm)" || "please add via edit button"}</span>
            </p>
            <p>
              <span className="text-black">Weight</span>
              <span className="text-salmon"> {user.weight + "(kg)" || "please add via edit button"}</span>
            </p>
          </div>

          <Link to="/edit-profile">
            <button className="bg-salmon hover:bg-blue-700 text-white font-bold py-2 px-4 rounded block mx-auto md:mx-0 md:mt-5">
              Edit
            </button>
          </Link>
        </div>

        <div className="md:flex-1 ">
          <p>
            <span className="text-black">Daily Calories</span><br />
            <span className="text-salmon"> {`BMR: ${user.getBMR()}` || user.calories}</span>
          </p>
          <p>
            <span className="text-black">BMI</span><br />
            <span className="text-salmon"> {user.getBMI()}</span>
          </p> 
          <p>
            <span className="text-black">Total time exercised</span><br />
            <span className="text-salmon"> {user.exerciseTime}</span>
          </p>
          <p>
            <span className="text-black">Total time exercised(live)</span><br />
            <span className="text-salmon"> {user.liveExercseTime}</span>
          </p>
          <p>
            <span className="text-black">Total calories burned</span><br />
            <span className="text-salmon"> {user.caloriesBurned}</span>
          </p>
          <p>
            <span className="text-black">Total calories burned(live)</span><br />
            <span className="text-salmon"> {user.liveCaloriesBurned}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
