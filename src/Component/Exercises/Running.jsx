import React, { useState } from "react";
import Benom_card_icon from "../../assets/Benom_card_icon.png";
import running01 from "../../assets/running01.jpeg";
import Benom_Running_icon from "../../assets/Benom_Running_icon.png";
import fire_icon from "../../assets/3_fire_icon.png";
import axios from "axios";

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
    <>
      <div className=" relative">
        <img src={running01} alt="running" className=" w-full" />
        <div className=" absolute top-0 left-0 w-full h-full flex">
          {/* Left */}
          <section className=" w-[50%] h-full bg-white bg-opacity-10">
            <p className="font-bold text-5xl text-white ml-10 mt-20">RUNNING</p>
          </section>

          {/* Right */}
          <section className=" w-[50%] h-full bg-white bg-opacity-70 p-[5rem] flex flex-col gap-y-[1rem] ">
            <form onSubmit={submitHandler}>
              <p className="font-bold text-3xl m-4">LOG ACTIVITY </p>
              <p className="font-bold  ml-4">COMMON ACTIVITY</p>
              <div className="flex">
                <img src={Benom_Running_icon} alt="Benom_Running_icon" className="mix-blend-darken w-[6.25rem] h-[6rem]" />
                <div>
                  <img src={fire_icon} alt="fire_icon.png" className="mix-blend-darken w-[7rem] h-[2rem] mt-2" />
                  <select
                    className="select select-bordered border-gray-700 w-40 max-w-xs mb-3"
                    onChange={(ev) => {
                      setType("Running:" + ev.target.value.split(" ").join("-").toLowerCase());
                    }}>
                    <option disabled selected>
                      Select type
                    </option>
                    <option>Walk Combination</option>
                    <option>General</option>
                    <option>In Place</option>
                    <option>Stairs Up</option>
                    <option>Marathon</option>
                  </select>
                </div>
              </div>
              <div>
                {/* <label className="font-bold  ml-4 " htmlFor="Date">
                  Date :{" "}
                </label>
                <input className="rounded-lg mb-2" type="date" id="Date" name="Date" placeholder="Select Date" /> <br /> */}
                <label className="font-bold  ml-4" htmlFor="Weight">
                  Weight(kg) :{" "}
                </label>
                <input
                  className="rounded-lg mb-2 w-40"
                  type="text"
                  id="Weight"
                  name="Weight"
                  placeholder="Enter Weight in Kg"
                  onChange={(ev) => {
                    setWeight(ev.target.value);
                  }}
                />
                <br />
                {/* <label className="font-bold  ml-4" htmlFor="StartTime">
                  Start Time :{" "}
                </label>
                <input className="rounded-lg mb-2" type="time" id="StartTime" name="StartTime" placeholder="HH:MM" step="3600" /> <br /> */}
                <label className="font-bold  ml-4" htmlFor="Duration">
                  Duration :{" "}
                </label>
                <input
                  className="rounded-lg mb-2 w-20"
                  type="number"
                  id="Duration"
                  name="Duration"
                  placeholder="HH"
                  onChange={(ev) => {
                    setHour(ev.target.value);
                  }}
                />
                <input
                  className="rounded-lg mb-2 ml-1 w-20"
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
                <br />
                <h2 className="font-bold  ml-4">Calories: {calories + " kcal" || `submit to calculate`}</h2>
                {/* <label className="font-bold  ml-4" htmlFor="Calories">
                  Calories :{" "}
                </label> */}
                {/* <input className="rounded-lg mb-2 w-20" type="text" id="Calories" name="Calories" placeholder="Calories" /> <br /> */}
                <button type="submit" className="btn bg-[#FF9671] hover:bg-[#F24822] mb-2 ml-4" disabled={!type || !weight || (!hour && !minute)}>
                  Submit
                </button>
              </div>
            </form>
          </section>
        </div>
      </div>
    </>
  );
};

export default Running;
