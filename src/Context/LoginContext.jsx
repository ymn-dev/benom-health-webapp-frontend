import React, { createContext, useContext, useEffect, useState } from "react";
import profilePicturePath from "../assets/Emily_profile_icon.png";
const LoginContext = createContext();

const LoginContextProvider = (props) => {
  const [login, setLogin] = useState(false);
  const [user, setUser] = useState({
    profilePicture: profilePicturePath,
    userName: "username",
    firstName: "",
    lastName: "",
    gender: "",
    birthday: "",
    email: "email@somewhere.com",
    height: 0,
    weight: 0,
    dailyCalories: null,
    exerciseLog: [],
    exerciseTime: 0,
    caloriesBurned: 0,
    liveExercseTime: 0,
    liveCaloriesBurned: 0,
    getBMR() {
      if (!this.weight || !this.height || !this.birthday) {
        return "Please add weight(kg), height(cm) and birthday";
      }
      let base = 10 * this.weight + 6.25 * this.height - 5 * this.getAge();
      if (this.gender === "Male") {
        base += 5;
      }
      if (this.gender === "Female") {
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
    getAge() {
      if (!this.birthday) return "Please add birthday";
      const currentDate = new Date();
      const birthDate = new Date(this.birthday);
      const timeDifference = currentDate - birthDate;
      //the date object counting in millisecond, we want year
      const age = Math.floor(timeDifference / (365.25 * 24 * 60 * 60 * 1000));
      return age;
    },
  });
  return <LoginContext.Provider value={{ login, setLogin, user, setUser }}>{props.children}</LoginContext.Provider>;
};

const useLoginContext = () => useContext(LoginContext);
export { LoginContextProvider, useLoginContext };

/*
how to use
press toggle button coming with <Layout/>
import { useLoginContext } inside root/src/Context
then call login value
const { login } = useLoginContext();

use it
{login && <Something/>}
*/
