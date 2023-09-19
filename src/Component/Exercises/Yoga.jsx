import React from "react";
import Benom_card_icon from "../../assets/Benom_card_icon.png";
import yoga from "../../assets/yoga.png";
import Benom_Yoga_icon from "../../assets/Benom_Yoga_icon.png";
import fire_icon from "../../assets/3_fire_icon.png";

const Yoga = () => {
  return <>
  <div className="flex justify-between bg-[#FF9671]">
    <p className="font-bold text-3xl p-5">YOGA</p>
    <img src={Benom_card_icon} alt="Benom_card_icon" />
  </div>
  <div className=" flex ">
    <div>
      <img src={yoga} alt="yoga" />
    </div>
    <div>
      <a href="/log-activity"><p className="font-bold text-xl m-4">LOG ACTIVITY </p></a>
      <p className="font-bold  ml-4">COMMON ACTIVITY</p>
      <div className="flex">
        <img src={Benom_Yoga_icon} alt="Benom_Yoga_icon" />
        <div>
          <img src={fire_icon} alt="fire_icon.png" />
          <details className="dropdown mb-2">
            <summary className="m-2 btn font-bold border-black">YOGA</summary>
            <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
              <li><a>Calisthenics</a></li>
              <li><a>Cycling</a></li>
              <li><a>Running</a></li>
              <li><a>Swimming</a></li>
              <li><a>Walking</a></li>
            </ul>
          </details>
        </div> 
      </div>
       <div >
            <label className="font-bold  ml-4" htmlFor="Date">Date : </label>
            <input
              type="date"
              id="Date"
              name="Date"
              placeholder="Select Date"
            /> <br />
            <label className="font-bold  ml-4" htmlFor="Weight">Weight(kg) : </label>
            <input
              type="text"
              id="Weight"
              name="Weight"
              placeholder="Enter Weight in Kg"
            /><br />
            <label className="font-bold  ml-4" htmlFor="StartTime">Start Time : </label>
            <input
              type="time"
              id="StartTime"
              name="StartTime"
              placeholder="HH:MM"
            /> <br />
            <label className="font-bold  ml-4" htmlFor="Duration">Duration : </label>
            <input
              type="number"
              id="Duration"
              name="Duration"
              placeholder="HH:MM"
            /> <br />
            <label className="font-bold  ml-4" htmlFor="Calories">Calories : </label>
            <input
              type="text"
              id="Calories"
              name="Calories"
              placeholder="Calories"
            />
      </div>
    </div>
  </div>
</>
};

export default Yoga;
