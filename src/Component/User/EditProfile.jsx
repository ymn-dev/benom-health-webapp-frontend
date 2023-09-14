import React from "react";
import { useLoginContext } from "../../Context/LoginContext";
import { Link } from "react-router-dom";

const EditProfile = () => {
  const { login } = useLoginContext();
  //mock user, will take from LoginContext later
  const user = {
    userName: "username",
    firstName: "name",
    lastName: "last name",
    gender: "male",
    birthday: "date",
    //to create birthday to age later
    age: 20,
    email: "email",
    height: 170,
    weight: 60,
    dailyCalories: "null",
    exerciseLog: [],
    exerciseTime: 0,
    caloriesBurned: 0,
    liveExercseTime: 0,
    liveCaloriesBurned: 0,
    getBMR() {
      if (!this.weight || !this.height || !this.age) {
        return "Please add weight(kg), height(cm) and birthday";
      }
      let base = 10 * this.weight + 6.25 * this.height - 5 * this.age;
      if (this.gender === "male") {
        base += 5;
      }
      if (this.gender === "female") {
        base -= 161;
      }
      return base;
    },
    getBMI() {
      if (!this.weight || !this.height) {
        return "Please add weight(kg) and height (cm)";
      }
      return this.weight / ((this.height / 100) * (this.height / 100));
    },
  };

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
          <input type="text" placeholder={user.firstName} name="firstName" id="firstName" />
        </p>
        <p>
          <span className="field">Last name</span>
          <input type="text" placeholder={user.lastName} name="lastName" id="lastName" />
        </p>
        <p>
          <span className="field">Gender</span>
          {user.gender ? (
            <span className="value">{user.gender}</span>
          ) : (
            <form>
              <label>
                <input type="radio" name="gender" value="male" />
                Male
              </label>
              <label>
                <input type="radio" name="gender" value="female" />
                Female
              </label>
            </form>
          )}
        </p>
        <p>
          <span className="field">Birthday</span>
          {user.birthday ? <span className="value">{user.birthday}</span> : <input type="date" name="birthday" id="birthday" />}
        </p>
        <p>
          <span className="field">Email</span>
          <span className="value">{user.email}</span>
        </p>
        <p>
          <span className="field">Height</span>
          <input type="number" name="height" id="height" placeholder={user.height + "(cm)"} />
        </p>
        <p>
          <span className="field">Weight</span>
          <input type="number" name="weight" id="weight" placeholder={user.weight + "(kg)"} />
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

      <button>Save</button>
    </>
  );
};

export default EditProfile;
