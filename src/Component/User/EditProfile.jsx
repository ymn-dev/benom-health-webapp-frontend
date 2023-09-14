import React, { useEffect, useState } from "react";
import { useLoginContext } from "../../Context/LoginContext";
import { Link } from "react-router-dom";

const EditProfile = () => {
  const { login, user, setUser } = useLoginContext();
  //these are the only field we let them edit
  const [editUser, setEditUser] = useState({});
  const submitHandler = (ev) => {
    ev.preventDefault();
    setUser({ ...user, ...editUser });
  };

  if (!login) {
    return (
      <h1>
        Please <Link to={"/signin"}>Login</Link>
      </h1>
    );
  }

  return (
    <form onSubmit={submitHandler}>
      <div className="profile__welcome">
        <div className="profile__image__container">
          <img src={user.profilePicture} />
          <input
            type="url"
            name="profilePicture"
            placeholder="new image url here"
            onChange={(ev) => {
              setEditUser({ ...editUser, [ev.target.name]: ev.target.value });
            }}
          />
        </div>
        <input
          type="text"
          placeholder={user.userName}
          name="userName"
          onChange={(ev) => {
            setEditUser({ ...editUser, [ev.target.name]: ev.target.value });
          }}></input>
      </div>
      <div className="profile__detail__container">
        <h2>PERSONAL INFO</h2>
        <p>
          <span className="field">First name</span>
          <input
            type="text"
            placeholder={"add first name" || user.firstName}
            name="firstName"
            id="firstName"
            onChange={(ev) => {
              setEditUser({ ...editUser, [ev.target.name]: ev.target.value });
            }}
          />
        </p>
        <p>
          <span className="field">Last name</span>
          <input
            type="text"
            placeholder={"add last name" || user.lastName}
            name="lastName"
            id="lastName"
            onChange={(ev) => {
              setEditUser({ ...editUser, [ev.target.name]: ev.target.value });
            }}
          />
        </p>
        <p>
          <span className="field">Gender</span>
          {user.gender ? (
            <span className="value">{user.gender}</span>
          ) : (
            <>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  onChange={(ev) => {
                    setEditUser({ ...editUser, [ev.target.name]: ev.target.value });
                  }}
                />
                Male
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  onChange={(ev) => {
                    setEditUser({ ...editUser, [ev.target.name]: ev.target.value });
                  }}
                />
                Female
              </label>
            </>
          )}
        </p>
        <p>
          <span className="field">Birthday</span>
          {user.birthday ? (
            <span className="value">{user.birthday}</span>
          ) : (
            <input
              type="date"
              name="birthday"
              id="birthday"
              onChange={(ev) => {
                setEditUser({ ...editUser, [ev.target.name]: ev.target.value });
              }}
            />
          )}
        </p>
        <p>
          <span className="field">Email</span>
          <span className="value">{user.email}</span>
        </p>
        <p>
          <span className="field">Height</span>
          <input
            type="number"
            name="height"
            id="height"
            placeholder="height (cm)"
            onChange={(ev) => {
              setEditUser({ ...editUser, [ev.target.name]: ev.target.value });
            }}
          />
        </p>
        <p>
          <span className="field">Weight</span>
          <input
            type="number"
            name="weight"
            id="weight"
            placeholder="weight (kg)"
            onChange={(ev) => {
              setEditUser({ ...editUser, [ev.target.name]: ev.target.value });
            }}
          />
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

      {/* <Link to="/profile"> */}
      <button type="submit">Save</button>
      {/* </Link> */}
      <Link to="/profile">
        <button>back</button>
      </Link>
    </form>
  );
};

export default EditProfile;
