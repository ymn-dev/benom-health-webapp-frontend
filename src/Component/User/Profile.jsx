import React from "react";
import { useLoginContext } from "../../Context/LoginContext";
import { Link } from "react-router-dom";

const Profile = () => {
  const { login, user } = useLoginContext();
  //mock user, will take from LoginContext later

  if (!login) {
    return (
      <h1>
        Please <Link to={"/signin"}>Login</Link>
      </h1>
    );
  }

  return (
    <>
      <div className="profile__welcome">
        <div className="profile__image__container">
          <img />
        </div>
        <h1>Welcome, {user.userName}</h1>
      </div>
      <div className="profile__detail__container">
        <h2>PERSONAL INFO</h2>
        <p>
          <span className="field">First name</span>
          <span className="value">{"please add via edit button" || user.firstName}</span>
        </p>
        <p>
          <span className="field">Last name</span>
          <span className="value">{"please add via edit button" || user.lastName}</span>
        </p>
        <p>
          <span className="field">Gender</span>
          <span className="value">{"please add via edit button" || user.gender}</span>
        </p>
        <p>
          <span className="field">Birthday</span>
          <span className="value">{"please add via edit button" || user.birthday}</span>
        </p>
        <p>
          <span className="field">Email</span>
          <span className="value">{user.email}</span>
        </p>
        <p>
          <span className="field">Height</span>
          <span className="value">{"please add via edit button" || user.height}(cm)</span>
        </p>
        <p>
          <span className="field">Weight</span>
          <span className="value">{"please add via edit button" || user.weight}(kg)</span>
        </p>
        <p>
          <span className="field">Daily Calories</span>
          <span className="value">{`BMR: ${user.getBMR()}` || user.calories}</span>
        </p>
        <p>
          <span className="field">BMI</span>
          <span className="value">{user.getBMI()}</span>
        </p>
        <p>
          <span className="field">Total time exercised</span>
          <span className="value">{user.exerciseTime}</span>
        </p>
        <p>
          <span className="field">Total time exercised(live)</span>
          <span className="value">{user.liveExercseTime}</span>
        </p>
        <p>
          <span className="field">Total calories burned</span>
          <span className="value">{user.caloriesBurned}</span>
        </p>
        <p>
          <span className="field">Total calories burned(live)</span>
          <span className="value">{user.liveCaloriesBurned}</span>
        </p>
      </div>

      <Link to="/edit-profile">
        <button>Edit</button>
      </Link>
    </>
  );
};

export default Profile;
