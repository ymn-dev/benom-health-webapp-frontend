import { React, useState } from "react";
import venom_orangePic from "../../assets/DashboardPic/venom_orangePic.png";
import venomIconGroup from "../../assets/DashboardPic/venomIconGroup.png";
import plus_button from "../../assets/DashboardPic/plus_button.svg";
import axios from "axios";
import { useLoginContext } from "../../Context/LoginContext";

const AddLog = ({ reload, setReload }) => {
  const { user } = useLoginContext();
  const [durationHour, setDurationHour] = useState(0);
  const [durationMinute, setDurationMinute] = useState(0);
  const [calories, setCalories] = useState(0);
  const [weight, setWeight] = useState(user.weight || 0);
  const [date, setDate] = useState("");
  const handleSubmit = async (ev) => {
    ev.preventDefault();
    if ((!durationHour && !durationMinute) || (!selectedHour && !selectedMinute) || !date || !weight || !selectedOption1 || !selectedOption2) return;

    const exerciseName = `${selectedOption1}:${selectedOption2}`;
    const duration = Number(durationHour) * 60 + Number(durationMinute);
    const startTime = `${selectedHour}:${selectedMinute}`;
    const data = {
      exerciseName,
      date,
      weight,
      startTime,
      duration,
      calories,
      picture: imageUrl,
    };
    try {
      const response = await axios.post(`https://benom-backend.onrender.com/users/${user._id}/activities`, data, { headers: user.headers });
      if (response.status === 200) {
        setReload(!reload);
        // alert(`successfully added new activity!`);
      }
    } catch (err) {
      console.error(err);
    }
  };

  {
    /*----ปุ่มยิงข้อมูล dropdown ให้เปลี่ยนขื่อหัวข้อใน Modal + */
  }
  const [selectValue, setSelectValue] = useState("");

  function handleSelect(event) {
    setSelectValue(event.target.value);
  }

  {
    /*----ปุ่มชั่วโมง บังคับให้มี 12 ชั่วโมง - Select Hours for 24 hours only - {selectedHour}*/
  }
  const [selectedHour, setSelectedHour] = useState("");
  const hours = Array.from({ length: 24 }, (_, i) => (i < 10 ? `0${i}` : `${i}`));

  {
    /*----ปุ่มนาที บังคับให้มี 60 นาที Select Minuts for 60 mins only - {selectedMins}*/
  }
  const [selectedMinute, setSelectedMinute] = useState("00");

  // Generate an array of 60 minutes (00 to 59)
  const minutes = Array.from({ length: 60 }, (_, i) => (i < 10 ? `0${i}` : `${i}`));

  {
    /*----แถบ Dropdownประเภทกีฬา เปลี่ยนตามชื่อกีฬาที่เลือก*/
  }
  const [selectedOption1, setSelectedOption1] = useState("");
  const [selectedOption2, setSelectedOption2] = useState("");
  const [options2, setOptions2] = useState([]);

  // Define the options for the first dropdown.
  const options1 = [
    { label: "Cycling", value: "Cycling" },
    { label: "Swimming", value: "Swimming" },
    { label: "Yoga", value: "Yoga" },
    { label: "Running", value: "Running" },
    { label: "Walking", value: "Walking" },
    { label: "Calisthenics", value: "Calisthenics" },
    // Add more options as needed
  ];

  // Define the options for the second dropdown based on the selection in the first dropdown.
  const handleDropdown1Change = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption1(selectedValue);

    // Generate options for the second dropdown based on the selection in the first dropdown.
    if (selectedValue === "Cycling") {
      setOptions2([
        { label: "Vigorous Mountain", value: "vigorous-mountain" },
        { label: "General Mountain", value: "general-mountain" },
        { label: "Racing", value: "racing" },
        { label: "General", value: "general" },
        { label: "Stationary", value: "stationary" },
      ]);
    } else if (selectedValue === "Swimming") {
      setOptions2([
        { label: "Moderate Freestyle", value: "moderate-freestyle" },
        { label: "General Backstroke", value: "general-backstroke" },
        { label: "General Breaststroke", value: "general-breaststroke" },
        { label: "General Butterfly", value: "general-butterfly" },
        { label: "General Sidestroke", value: "general-sidestroke" },
      ]);
    } else if (selectedValue === "Yoga") {
      setOptions2([
        { label: "Hatha", value: "hatha" },
        { label: "Power", value: "power" },
        { label: "Nadisodhana", value: "nadisodhana" },
        { label: "Surya Namaskar", value: "surya-namaskar" },
        { label: "Stretching", value: "stretching" },
      ]);
    } else if (selectedValue === "Running") {
      setOptions2([
        { label: "Walk Combination", value: "walk-combination" },
        { label: "General", value: "general" },
        { label: "In Place", value: "in-place" },
        { label: "Stairs Up", value: "stairs-up" },
        { label: "Marathon", value: "marathon" },
      ]);
    } else if (selectedValue === "Walking") {
      setOptions2([
        { label: "Race", value: "race" },
        { label: "Normal", value: "normal" },
        { label: "Slow", value: "slow" },
        { label: "Stair Climb", value: "stair-climb" },
        { label: "Hills Climb", value: "hills-climb" },
      ]);
    } else if (selectedValue === "Calisthenics") {
      setOptions2([
        { label: "Vigorous", value: "vigorous" },
        { label: "Moderate", value: "moderate" },
        { label: "Light", value: "light" },
        { label: "General", value: "general" },
        { label: "Water", value: "water" },
      ]);
    } else {
      setOptions2([]); // Reset options when no selection is made
    }
  };

  {
    /*----ปุ่ม Upload Image ด้วย URL*/
  }
  const [imageUrl, setImageUrl] = useState(""); // User Input
  const [tempImageUrl, setTempImageUrl] = useState("https://i.ibb.co/mHF9LZZ/venom-Cheese.png"); // Default

  // const handleCancel = () => {
  //   setImageUrl("https://i.ibb.co/mHF9LZZ/venom-Cheese.png");
  // };

  return (
    <>
      <div className="hidden md:block flex-1">
        {/*เริ่ม Activity log ซ้ายมือ*/}
        <h1 className="text-6xl text-white mt-6 mb-6 text-center">Activities log</h1>
        {/*หัวข้อรอง Common activities ซ้ายมือ*/}
        <div id="common_activity" className="border-solid border-2 border-white bg-white my-6 ml-6 mr-3 rounded-lg pb-2">
          <h2 className="text-4xl mt-3 mb-3 text-center">Common activities</h2>
          {/*เริ่ม dropdown เลือกชนิดกีฬา - ซ้ายมือ*/}
          <div className="text-center">
            <select className="select select-bordered border-gray-700 w-full max-w-xs mb-3 bg-white" value={selectedOption1} onChange={handleDropdown1Change} onClick={handleSelect}>
              <option disabled selected value="">
                Choose your exercise
              </option>
              {options1.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          {/*จบ dropdown เลือกชนิดกีฬา - ซ้ายมือ*/}

          {/*****แก้เป็น hover ตอนเรากดเลือก type ในก้อน Modal ต้องมี5ภาพ แต่ละภาพมี hover*/}
          <img src={venomIconGroup} width={200} height={200} className="max-w-[550px] w-full mx-auto" />

          {/*หัวข้อ create custom activities ที่มีปุ่มกดเรียก Modal*/}
          <div>
            <p className="mr-2 text-center">
              create custom activities
              {/*เริ่ม Modal สำหรับเก็บข้อมูลประจำวัน กีฬา ประเภท วันเวลา น้ำหนัก เวลาที่เริ่ม เวลาที่เล่นกีฬาชนิดนี้ทั้งหมด แคลที่กินเข้าไป*/}
              <button className="btn bg-white border-white" onClick={() => document.getElementById("my_modal_1").showModal()} disabled={!selectedOption1}>
                <img src={plus_button} width={15} height={15} />
              </button>
              <dialog id="my_modal_1" className="modal">
                <div className="modal-box">
                  {/*ชื่อหัวข้อ Modal ที่จะเปลี่ยนตามชนิดกีฬาที่กดเลือกใน dropdown*/}
                  <h3 className="font-bold text-lg pb-5">Activity : {selectValue}</h3>
                  <ul>
                    {/*ชนิดกีฬา เปลี่ยนตามประเภทที่เลือกหัวข้อ Modal*/}
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
                    {/*วันที่เล่นกีฬา*/}
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
                    {/*น้ำหนักในวันที่เล่นกีฬา*/}
                    <li className="text-start">
                      Weight:{" "}
                      <input
                        type="number"
                        placeholder={weight || "Enter weight in KG"}
                        className="input input-bordered input-sm w-2/3 max-w-x ml-6"
                        onChange={(ev) => {
                          setWeight(ev.target.value);
                        }}
                      />
                    </li>
                    <br />
                    {/*เวลาที่เริ่มเล่นกีฬา*/}
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
                        {/*เลือกเวลาเป็นชั่วโมง*/}
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
                        {/*เลือกเวลาเป็นนาที*/}
                        {minutes.map((minute) => (
                          <option key={minute} value={minute}>
                            {minute}
                          </option>
                        ))}
                      </select>
                    </li>
                    <br />

                    {/*เวลาที่ออกกำลังกาย*/}
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

                    {/*แคลอรี่ที่เผาในการออกกำลังกายนี้*/}
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
                    </li>
                    <h3 className="border rounded-full text-xs w-5/6 max-w-x text-center mb-5 ml-12 bg-slate-200 font-medium">* Will automatically calculate if no input *</h3>
                  </ul>
                  {/*จบ Modal สำหรับเก็บข้อมูลประจำวัน - ยังอยู่ใน Modal*/}

                  {/*เริ่ม Update image ใน Modal - ยังอยู่ใน Modal*/}
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
                      <button onClick={handleSubmit} className="btn hover:btn-success" disabled={(!durationHour && !durationMinute) || (!selectedHour && !selectedMinute) || !date || !weight || !selectedOption1 || !selectedOption2}>
                        Update
                      </button>
                      {/* <button onClick={handleCancel} className="btn">
                        Cancel
                      </button> */}
                      <form method="dialog">
                        <button className="btn btn-circle hover:btn-error">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </form>
                    </div>
                  </div>
                  {/*จบ Update image ใน Modal - ยังอยู่ใน Modal*/}
                </div>
              </dialog>
            </p>
          </div>
          {/*จบ Modal - create custom activities*/}

          {/*รูป venom พื้นสีส้ม*/}
          <img src={venom_orangePic} alt="venom_orangePic" className="rounded-lg max-w-[550px] w-full mx-auto mb-6 mt-5" />
        </div>
      </div>
      {/*จบกล่องด้านซ้ายมือ สีขาว*/}
    </>
  );
};

export default AddLog;
