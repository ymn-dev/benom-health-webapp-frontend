import React from "react";
import Benom_card_icon from "../../assets/Benom_card_icon.png";
import calisthenics01 from "../../assets/calisthenics01.jpg";
import Benom_Calisthenics_icon from "../../assets/Benom_Calisthenics_icon.png";
import fire_icon from "../../assets/3_fire_icon.png";

const Calisthenics = () => {
  return <>
  <div className=" relative ">
    <img src={calisthenics01} alt="calisthenics" className=" w-full"/>
    <div className=" absolute top-0 left-0 w-full h-full flex">
      {/* Left */}
      <section className=" w-[50%] h-full bg-white bg-opacity-10">
        <p className="font-bold text-5xl text-white ml-10 mt-20">CALISTHENICS</p>
      </section>

      {/* Right */}
      <section className=" w-[50%] h-full bg-white bg-opacity-70 p-[5rem] flex flex-col gap-y-[1rem] ">
        
          <a href="/log-activity"><p className="font-bold text-3xl m-4">LOG ACTIVITY </p></a>
          <p className="font-bold  ml-4">COMMON ACTIVITY</p>
          <div className="flex">
              <img src={Benom_Calisthenics_icon} alt="Benom_Calisthenics_icon" className="mix-blend-darken w-[6.25rem] h-[6rem]"/>
              <div>
                  <img src={fire_icon} alt="fire_icon.png" className="mix-blend-darken w-[7rem] h-[2rem] mt-2" />
                  <select className="select select-bordered border-gray-700 w-40 max-w-xs mb-3">
                    <option disabled selected>
                    CALISTHENICS
                    </option>
                    <option>PUSH UP</option>
                    <option>PLANK</option>
                    <option>PISTOL SQUAT</option>
                  </select>
              </div> 
          </div>
            <div>
                <label className="font-bold  ml-4 " htmlFor="Date">Date : </label>
                <input className="rounded-lg mb-2"
                  type="date"
                  id="Date"
                  name="Date"
                  placeholder="Select Date"
                /> <br />
                <label className="font-bold  ml-4" htmlFor="Weight">Weight(kg) : </label>
                <input className="rounded-lg mb-2 w-40"
                  type="text"
                  id="Weight"
                  name="Weight"
                  placeholder="Enter Weight in Kg"
                /><br />
                <label className="font-bold  ml-4" htmlFor="StartTime">Start Time : </label>
                <input className="rounded-lg mb-2"
                  type="time"
                  id="StartTime"
                  name="StartTime"
                  placeholder="HH:MM"
                  step="3600" 
                  onChange={(e)=> console.log(e.target.value)}
                /> <br />
                <label className="font-bold  ml-4" htmlFor="Duration">Duration : </label>
                <input className="rounded-lg mb-2 w-20"
                  type="number"
                  id="Duration"
                  name="Duration"
                  placeholder="HH"
                /> 
                <input className="rounded-lg mb-2 ml-1 w-20"
                  type="number"
                  id="Duration"
                  name="Duration"
                  placeholder="MM"
                /><br />
                <label className="font-bold  ml-4" htmlFor="Calories">Calories : </label>
                <input className="rounded-lg mb-2 w-20"
                  type="text"
                  id="Calories"
                  name="Calories"
                  placeholder="Calories"
                /> <br />
                <button className="btn bg-[#FF9671] hover:bg-[#F24822] mb-2 ml-4">Submit</button>
          </div>       
      </section>
    </div>
  </div>
</>
};

export default Calisthenics;
