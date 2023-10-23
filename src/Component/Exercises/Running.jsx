import React, { useState } from "react";
import axios from "axios";
import runningBackground from "../../assets/running01.jpeg";
import benomIconRun from "../../assets/Benom_Running_icon.png";

const Running = () => {
  const [type, setType] = useState("");
  const [weight, setWeight] = useState(0);
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [calories, setCalories] = useState(0);
  const submitHandler = async (ev) => {
    ev.preventDefault();
    if (!type || !weight || (!hour && !minute)) return;
    const duration = Number(hour * 60) + Number(minute);
    const data = {
      exerciseName: type,
      weight,
      duration,
    };
    try {
      const result = await axios.post("https://benom-backend.onrender.com/calories", data);
      if (result.status === 200) {
        setCalories(result.data.calories);
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="flex  bg-cover min-h-screen  bg-center" style={{ backgroundImage: `url(${runningBackground})` }}>
      <div className="w-2/5 max-lg:hidden">
        <h2 className="text-7xl m-4 text-white">Running</h2>
      </div>
      <div className="flex w-4/5 bg-dark-blue bg-opacity-90 max-lg:w-screen max-lg:bg-opacity-100 ">
        <div className=" w-full">
          <div className="px-10 max-lg:px-0 ">
            <div className="flex  m-3">
              <div className="flex-row">
                <h2 className="text-7xl text-white max-lg:hidden">Log Activities</h2>
                <h3 className="text-5xl text-white mt-7 mb-10 max-lg:hidden">Common Activities</h3>
                <h3 className="font-bold text-5xl m-4 text-white lg:hidden">
                  Running <br />
                  Log Activities
                </h3>
              </div>
              <img className="m-auto h-28 max-sm:hidden" src={benomIconRun} alt="" />
              <div className="">{/* <img src={Benom_Calisthenics_icon} alt="Benom_Calisthenics_icon" className=" h-[12rem] w-auto  max-sm:hidden mx-auto rounded-xl mix-blend-multiply"/> */}</div>
            </div>
            <div className="">
              <select
                className="select select-bordered m-4 border-white text-white text-lg w-full max-w-xs bg-dark-blue bg-opacity-90"
                onChange={(ev) => {
                  setType("Running:" + ev.target.value.split(" ").join("-").toLowerCase());
                }}
              >
                <option disabled selected>
                  Select Type
                </option>
                <option>Walk Combination</option>
                <option>General</option>
                <option>In Place</option>
                <option>Stairs Up</option>
                <option>Marathon</option>
              </select>
            </div>
          </div>
          {/* input box */}
          <form onSubmit={submitHandler}>
            <div className="mx-10 mt-7 max-lg:mx-0">
              <div className="m-4">
                <div>
                  <label className="text-xl text-white" htmlFor="Weight">
                    Weight(KG) :{" "}
                  </label>
                  <input
                    className="text-white text-lg ml-4 border-white bg-dark-blue input input-bordered input-sm max-w-xs rounded-lg w-2/4"
                    type="text"
                    id="Weight"
                    name="Weight"
                    placeholder="Enter Weight in Kg"
                    onChange={(ev) => {
                      setWeight(ev.target.value);
                    }}
                  />
                  <br />
                </div>
                <div className="mt-6 ">
                  <label className="text-xl text-white" htmlFor="Duration">
                    Duration :{" "}
                  </label>
                  <input
                    className="text-white text-lg ml-10 input input-bordered input-sm border-white bg-dark-blue max-w-xs rounded-lg w-1/6"
                    type="number"
                    id="Duration"
                    name="Duration"
                    placeholder="HH"
                    onChange={(ev) => {
                      setHour(ev.target.value);
                    }}
                  />
                  <input
                    className="text-white text-lg ml-3 input input-bordered input-sm border-white bg-dark-blue max-w-xs rounded-lg w-1/6"
                    type="number"
                    id="Duration"
                    name="Duration"
                    placeholder="MM"
                    min="0"
                    max="60"
                    onChange={(ev) => {
                      setMinute(ev.target.value);
                    }}
                  />
                </div>
                <br />
                <h2 className="text-xl text-white">
                  Calories:
                  <span className="text-2lg ml-[3.6rem] bg-dark-blue text-white border border-white rounded-lg  py-1 px-24 max-md:px-8 max-sm:px-4">{Math.floor(calories) + " kcal" || `submit to calculate`}</span>
                </h2>
                <button type="submit" className="btn btn-white rounded-full  mt-10 disabled:text-white w-2/5" disabled={!type || !weight || (!hour && !minute)}>
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Running;
