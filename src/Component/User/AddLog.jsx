import { React, useState } from "react";
import venom_orangePic from "../../assets/DashboardPic/venom_orangePic.png";
import venomIconGroup from "../../assets/DashboardPic/venomIconGroup.png";
import plus_button from "../../assets/DashboardPic/plus_button.svg";
import axios from "axios";
import { useLoginContext } from "../../Context/LoginContext";
import Loading from "../Layout/Loading";
import ExerciseChoices from "../Exercises/exercises";
import alert from "../../assets/alert.png";
import { useNavigate } from "react-router-dom";

const AddLog = ({ reload, setReload }) => {
  const [loading, setLoading] = useState(false);
  const { user } = useLoginContext();
  const [durationHour, setDurationHour] = useState(0);
  const [durationMinute, setDurationMinute] = useState(0);
  const [calories, setCalories] = useState(0);
  const [date, setDate] = useState("");
  const navigate = useNavigate();
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
      setLoading(false);
      alert(err.response.data.error);
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

  const openmodal = () => {
    if (user.weight) {
      document.getElementById("my_modal_1").showModal();
    } else {
      window.alert("Please add weight before calculate calories");
      navigate("/edit-profile");
    }
  };

  return (
    <div className="min-h-screen">
      {/*Activity log*/}
      <h2 className="text-4xl mt-10 mb-10 text-center">Common activities</h2>
      {/*Dropdown*/}
      <div className="text-center pb-5">
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
        <img src={venomIconGroup} className="w-full pb-7 pt-6" />

        <div>
          <p className="mr-2 text-center mb-5 mt-5">
            <span className="text-2xl">create custom activities</span>

            {/*Modal button*/}
            <button className="btn disable:text-black disabled:opacity-40 ml-2" onClick={openmodal} disabled={!selectedOption1}>
              <img src={plus_button} width={15} height={15} />
            </button>

            <dialog id="my_modal_1" className="modal">
              <Loading loading={loading} />
              <div className="modal-box">
                <form method="dialog">
                  <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>

                {/*Modal - Activity : */}
                <h3 className="font-bold text-xl pt-3 pb-8">Activity : {selectValue}</h3>

                <div>
                  {/*Select type*/}
                  <div className="ml-7 text-start">
                    Options:
                    <select className="select select-bordered select-sm w-2/3 max-w-x ml-9" value={selectedOption2} onChange={(event) => setSelectedOption2(event.target.value)}>
                      <option disabled selected value="">
                        Choose sport options
                      </option>
                      {options2.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <br />
                  {/*Date*/}
                  <div className="ml-7 text-start">
                    Date:
                    <input
                      type="date"
                      className="input input-bordered input-sm w-2/3 max-w-x ml-14"
                      max={new Date().toISOString().split("T")[0]}
                      onChange={(ev) => {
                        setDate(ev.target.value);
                      }}
                    />
                  </div>
                  <br />
                  {/*Start-Time*/}
                  <div className="ml-7 text-start">
                    Start Time:
                    <select
                      className="select select-bordered select-sm w-1/6 max-w-x ml-5 mr-2 text-center"
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
                  </div>
                  <br />

                  {/*Duration*/}
                  <div className="ml-7 text-start">
                    Duration:
                    <input
                      type="number"
                      placeholder="HH"
                      className="input input-bordered input-sm w-1/6 max-w-x ml-7 mr-2 text-center"
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
                  </div>
                  <br />

                  {/*Calories*/}
                  <div className="ml-7 text-start mb-6">
                    Calories:
                    <input
                      type="number"
                      placeholder="Enter Calories"
                      className="input input-bordered input-sm w-2/3 max-w-x ml-8"
                      min="0"
                      onChange={(ev) => {
                        setCalories(ev.target.value);
                      }}
                    />
                    <span className="tooltip tooltip-left tooltip-success absolute justify-center" data-tip="Will automatically calculate if no input">
                      <img src={alert} className="w-6 h-7 ml-1 pt-1" alt="alert" />
                    </span>
                  </div>
                </div>
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
        <img src={venom_orangePic} alt="venom_orangePic" className="rounded-lg w-full mb-12 mt-12" />
      </div>
    </div>
  );
};

export default AddLog;
