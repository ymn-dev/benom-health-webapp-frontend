import { React, useState } from "react";
import venom_orangePic from "../../assets/DashboardPic/venom_orangePic.png";
import venomIconGroup from "../../assets/DashboardPic/venomIconGroup.png";
import plus_button from "../../assets/DashboardPic/plus_button.svg";
import axios from "axios";
import { useLoginContext } from "../../Context/LoginContext";
import Loading from "../Layout/Loading";
import ExerciseChoices from "../Exercises/exercises";
import alert from "../../assets/alert.png";

const AddLog = ({ reload, setReload }) => {
  const [loading, setLoading] = useState(false);
  const { user } = useLoginContext();
  const [durationHour, setDurationHour] = useState(0);
  const [durationMinute, setDurationMinute] = useState(0);
  const [calories, setCalories] = useState(0);
  const [date, setDate] = useState("");
  const handleSubmit = async (ev) => {
    ev.preventDefault();
    if ((!durationHour && !durationMinute) || !selectedHour || !date || !selectedOption1 || !selectedOption2) return;

    const exerciseName = `${selectedOption1}:${selectedOption2}`;
    const duration = Number(durationHour) * 60 + Number(durationMinute);
    const startTime = `${selectedHour}:${selectedMinute}`;
    const data = {
      exerciseName,
      date,
      startTime,
      duration,
      calories,
      picture: imageUrl,
    };
    try {
      setLoading(true);
      const response = await axios.post(`https://benom-backend.onrender.com/users/${user._id}/activities`, data, { headers: user.headers });
      setLoading(false);
      if (response.status === 200) {
        setReload(!reload);
        // alert(`successfully added new activity!`);
      }
    } catch (err) {
      console.error(err);
    }
  };

  
    //toggle dropdown1 & dropdown2
  const [selectValue, setSelectValue] = useState("");

  function handleSelect(event) {
    setSelectValue(event.target.value);
  }

  
    //24 hours
  const [selectedHour, setSelectedHour] = useState("");
  const hours = Array.from({ length: 24 }, (_, i) => (i < 10 ? `0${i}` : `${i}`));

  
    //60 mins
  const [selectedMinute, setSelectedMinute] = useState("00");

  // Generate an array of 60 minutes (00 to 59)
  const minutes = Array.from({ length: 60 }, (_, i) => (i < 10 ? `0${i}` : `${i}`));

  
    //Dropdown select type
  const [selectedOption1, setSelectedOption1] = useState("");
  const [selectedOption2, setSelectedOption2] = useState("");
  const [options2, setOptions2] = useState([]);

  // Define the options for the first dropdown.
  const options1 = [];
  for (const ExerciseType in ExerciseChoices) {
    options1.push({ label: ExerciseType, value: ExerciseType });
  }
  

  // Define the options for the second dropdown based on the selection in the first dropdown.
  const handleDropdown1Change = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption1(selectedValue);
    setSelectedOption2("");

    // Generate options for the second dropdown based on the selection in the first dropdown.
    if (selectedValue in ExerciseChoices) {
      const newOptions2 = [];
      for (const subtype in ExerciseChoices[selectedValue]) {
        newOptions2.push({ label: ExerciseChoices[selectedValue][subtype], value: subtype });
      }
      setOptions2(newOptions2);
    } else {
      setOptions2([]);
    }
  };

  {
    //Upload Image - URL
  }
  const [imageUrl, setImageUrl] = useState(""); // User Input
  const [tempImageUrl, setTempImageUrl] = useState("https://i.ibb.co/mHF9LZZ/venom-Cheese.png"); // Default

  // const handleCancel = () => {
  //   setImageUrl("https://i.ibb.co/mHF9LZZ/venom-Cheese.png");
  // };

  return (
    <>
        {/*Activity log*/}
          <h2 className="text-4xl mt-10 mb-10 text-center">Common activities</h2>
{/*Dropdown*/}
          <div className="text-center">
            <select className="select select-bordered select-lg border-gray-700 w-full max-w-xs bg-white text-xl" value={selectedOption1} onChange={handleDropdown1Change} onClick={handleSelect}>
              <option disabled selected value="">
                Choose your exercise
              </option>
              {options1.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
  {/*Dropdown*/}

{/*Should be hover with animation*/}
          <img src={venomIconGroup} width={200} height={200} className="max-w-[550px] w-full mx-auto" />

          
          <div>
            <p className="mr-2 text-xl text-center">
              create custom activities


{/*Modal button*/}
              <button className="btn" onClick={()=>document.getElementById('my_modal_1').showModal()} disabled={!selectedOption1}>
                <img src={plus_button} width={15} height={15} />  
              </button>

                <dialog id="my_modal_1" className="modal">
                 <Loading loading={loading} />
                  <div className="modal-box">
                    <form method="dialog">
                      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>

    {/*Modal - Activity : */}
                  <h3 className="font-bold text-xl pb-5">Activity : {selectValue}</h3>
                  <ul>
    {/*Select type*/}
                    <li className="text-start">
                      Options:
                      <select className="select select-bordered select-sm w-2/3 max-w-x ml-6" value={selectedOption2} onChange={(event) => setSelectedOption2(event.target.value)}>
                        <option disabled selected value="">
                          Choose sport options
                        </option>
                        {options2.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </li>
                    <br />
        {/*Date*/}
                    <li className="text-start">
                      Date:
                      <input
                        type="date"
                        className="input input-bordered input-sm w-2/3 max-w-x ml-12"
                        max={new Date().toISOString().split("T")[0]}
                        onChange={(ev) => {
                          setDate(ev.target.value);
                        }}
                      />
                    </li>
                    <br />
      {/*Start-Time*/}
                    <li className="text-start">
                      Start Time:
                      <select
                        className="select select-bordered select-sm w-1/6 max-w-x ml-2 mr-2 text-center"
                        value={selectedHour}
                        onChange={(ev) => {
                          setSelectedHour(ev.target.value);
                        }}>
                        <option disabled selected value="">
                          HH
                        </option>{" "}

             {/*hours*/}
                        {hours.map((hour) => (
                          <option key={hour} value={hour}>
                            {hour}
                          </option>
                        ))}
                      </select>
                      :
                      <select
                        className="select select-bordered select-sm w-1/6 max-w-x ml-2 mr-4 text-center"
                        onChange={(ev) => {
                          setSelectedMinute(ev.target.value);
                        }}>
                        <option selected value="00">
                          MM
                        </option>{" "}
                
                {/*min*/}
                        {minutes.map((minute) => (
                          <option key={minute} value={minute}>
                            {minute}
                          </option>
                        ))}
                      </select>
                    </li>
                    <br />

      {/*Duration*/}
                    <li className="text-start">
                      Duration:
                      <input
                        type="number"
                        placeholder="HH"
                        className="input input-bordered input-sm w-1/6 max-w-x ml-4 mr-2 text-center"
                        min="0"
                        onChange={(ev) => {
                          setDurationHour(ev.target.value);
                        }}
                      />
                      :
                      <input
                        type="number"
                        placeholder="MM"
                        className="input input-bordered input-sm w-1/6 max-w-x text-center ml-2"
                        min="0"
                        onChange={(ev) => {
                          setDurationMinute(ev.target.value);
                        }}
                      />
                    </li>
                    <br />

       {/*Calories*/}
                    <li className="text-start mb-5">
                      Calories:
                      <input
                        type="number"
                        placeholder="Enter Calories"
                        className="input input-bordered input-sm w-2/3 max-w-x ml-4"
                        min="0"
                        onChange={(ev) => {
                          setCalories(ev.target.value);
                        }}
                      />

                      <span className="lg:tooltip" data-tip="Will automatically calculate if no input">
                      <img
                        src={alert}
                        className="w-6 h-6 ml-1 md:ml-2 lg:ml-2"
                        alt="alert" 
                      />
                      </span> 
                    </li>
                  </ul>
                  {/*Modal*/}

                {/*Update image*/}
                  <div>
                    <img src={imageUrl || tempImageUrl} alt="venom-cheese" className="rounded-lg" />

                    <labels>Enter image URL : </labels>
                    <input
                      type="text"
                      onChange={(ev) => {
                        setImageUrl(ev.target.value);
                      }}
                      className="input input-bordered input-sm w-2/3 max-w-x mt-5"
                    />

                    <div className="modal-action">
                      <button onClick={handleSubmit} className="btn hover:btn-success" disabled={(!durationHour && !durationMinute) || !selectedHour || !date || !selectedOption1 || !selectedOption2}>
                        Update
                      </button>
                    </div>
                  </div>
                  {/*Upload image*/}
                  
                  </div>
                  </dialog>
                </p>
              </div>
          {/*Modal*/}

          {/*venomสีส้ม*/}
          <img src={venom_orangePic} alt="venom_orangePic" className="rounded-lg w-full mx-auto mb-10 mt-12" />
        </div>
    </>
  );
};

export default AddLog;
