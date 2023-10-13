import { React, useState } from "react";
import venom_orangePic from "../../assets/DashboardPic/venom_orangePic.png";
import venomIconGroup from "../../assets/DashboardPic/venomIconGroup.png";
import plus_button from "../../assets/DashboardPic/plus_button.svg";


const AddLog = () => {

{/*----ปุ่มยิงข้อมูล dropdown ให้เปลี่ยนขื่อหัวข้อใน Modal + */}
const [selectValue, setSelectValue] = useState("");

function handleSelect(event) {
  setSelectValue(event.target.value)
};

{/*----ปุ่มชั่วโมง บังคับให้มี 12 ชั่วโมง - Select Hours for 24 hours only - {selectedHour}*/}
const [selectedHour, setSelectedHour] = useState('');
  const hours = Array.from({ length: 24 }, (_, i) => 
  i < 10 ? `0${i}` : `${i}`);

  const handleChange = (e) => {
    setSelectedHour(e.target.value);
  };

{/*----ปุ่มนาที บังคับให้มี 60 นาที Select Minuts for 60 mins only - {selectedMins}*/}
const [selectedMinute, setSelectedMinute] = useState('');

// Generate an array of 60 minutes (00 to 59)
const minutes = Array.from({ length: 60 }, (_, i) =>
  i < 10 ? `0${i}` : `${i}`
);

const handleMinsChange = (e) => {
  setSelectedMinute(e.target.value);
};

{/*----แถบ Dropdownประเภทกีฬา เปลี่ยนตามชื่อกีฬาที่เลือก*/}
const [selectedOption1, setSelectedOption1] = useState('');
const [selectedOption2, setSelectedOption2] = useState('');
const [options2, setOptions2] = useState([]);

// Define the options for the first dropdown.
const options1 = [
  { label: 'Cycling', value: 'Cycling' },
  { label: 'Swimming', value: 'Swimming' },
  { label: 'Yoga', value: 'Yoga' },
  { label: 'Running', value: 'Running' },
  { label: 'Walking', value: 'Walking' },
  { label: 'Calisthenics', value: 'Calisthenics' },
  // Add more options as needed
];

// Define the options for the second dropdown based on the selection in the first dropdown.
const handleDropdown1Change = (event) => {
  const selectedValue = event.target.value;
  setSelectedOption1(selectedValue);

  // Generate options for the second dropdown based on the selection in the first dropdown.
  if (selectedValue === 'Cycling') {
    setOptions2([
      { label: 'vigorous-mountain', value: 'vigorous-mountain' },
      { label: 'general-mountain', value: 'general-mountain' },
      { label: 'racing', value: 'racing' },
      { label: 'general', value: 'general' },
      { label: 'stationary', value: 'stationary' },
    ]);
  } else if (selectedValue === 'Swimming') {
    setOptions2([
      { label: 'moderate-freestyle', value: 'moderate-freestyle' },
      { label: 'general-backstroke', value: 'general-backstroke' },
      { label: 'general-breaststroke', value: 'general-breaststroke' },
      { label: 'general-butterfly', value: 'general-butterfly' },
      { label: 'general-sidestroke', value: 'general-sidestroke' },
    ]);
  } else if (selectedValue === 'Yoga') {
    setOptions2([
      { label: 'hatha', value: 'hatha' },
      { label: 'power', value: 'power' },
      { label: 'nadisodhana', value: 'nadisodhana' },
      { label: 'surya-namaskar', value: 'surya-namaskar' },
      { label: 'stretching', value: 'stretching' },
    ]);
  } else if (selectedValue === 'Running') {
    setOptions2([
      { label: 'walk-combination', value: 'walk-combination' },
      { label: 'general', value: 'general' },
      { label: 'in-place', value: 'in-place' },
      { label: 'stairs-up', value: 'stairs-up' },
      { label: 'marathon', value: 'marathon' },
    ]);
  } else if (selectedValue === 'Walking') {
    setOptions2([
      { label: 'race', value: 'race' },
      { label: 'normal', value: 'normal' },
      { label: 'slow', value: 'slow' },
      { label: 'stair-climb', value: 'stair-climb' },
      { label: 'hills-climb', value: 'hills-climb' },
    ]);
  } else if (selectedValue === 'Calisthenics') {
    setOptions2([
      { label: 'vigorous', value: 'vigorous' },
      { label: 'moderate', value: 'moderate' },
      { label: 'light', value: 'light' },
      { label: 'general', value: 'general' },
      { label: 'water', value: 'water' },
    ]);
  } 
  else {
    setOptions2([]); // Reset options when no selection is made
  }
};

{/*----ปุ่ม Upload Image ด้วย URL*/}
const [imageUrl, setImageUrl] = useState('https://i.ibb.co/mHF9LZZ/venom-Cheese.png'); // Default image URL
const [tempImageUrl, setTempImageUrl] = useState(''); // Temporary URL for user input

const handleImageUrlChange = (e) => {
  setTempImageUrl(e.target.value);
};

const handleUpdateImage = () => {
  if (tempImageUrl !== '') {
    setImageUrl(tempImageUrl);
  }
  setTempImageUrl('');
};

const handleCancel = () => {
  setImageUrl('https://i.ibb.co/mHF9LZZ/venom-Cheese.png');
};

const handleClose = () => {
  setTempImageUrl('');
};


    return (
        <>
        <div className="hidden md:block flex-1">

{/*เริ่ม Activity log ซ้ายมือ*/}
  <h1 className="text-6xl text-white mt-6 mb-6 text-center">Activities log</h1>
  

{/*หัวข้อรอง Common activities ซ้ายมือ*/}
  <div id="common_activity" className="border-solid border-2 border-white bg-white my-6 ml-6 mr-3 rounded-lg pb-2">
    <h2 className="text-4xl mt-3 mb-3 text-center">Common activities</h2>

  {/*หัวข้อ create custom activities ที่มีปุ่มกดเรียก Modal*/}
  <div><p className="mr-2 text-center">create custom activities
  {/*เริ่ม Modal สำหรับเก็บข้อมูลประจำวัน กีฬา ประเภท วันเวลา น้ำหนัก เวลาที่เริ่ม เวลาที่เล่นกีฬาชนิดนี้ทั้งหมด แคลที่กินเข้าไป*/}
    <button className="btn bg-white border-white" onClick={()=>document.getElementById('my_modal_1').showModal()}><img src={plus_button} width={15} height={15}/></button>
     <dialog id="my_modal_1" className="modal">
      <div className="modal-box">

  {/*ชื่อหัวข้อ Modal ที่จะเปลี่ยนตามชนิดกีฬาที่กดเลือกใน dropdown*/}
       <h3 className="font-bold text-lg pb-5">Activity : {selectValue}</h3>
        <ul>
  {/*ชนิดกีฬา เปลี่ยนตามประเภทที่เลือกหัวข้อ Modal*/}
        <li className="text-start">Options: 
        <select className="select select-bordered select-sm w-2/3 max-w-x ml-6" value={selectedOption2} onChange={(event) => setSelectedOption2(event.target.value)}>
        <option disabled selected value="">Choose sport options</option>
        {options2.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
        </li>
        <br />
  {/*วันที่เล่นกีฬา*/}
        <li className="text-start">Date: 
        <input type="date" className="input input-bordered input-sm w-2/3 max-w-x ml-12" />
        </li>
        <br />
  {/*น้ำหนักในวันที่เล่นกีฬา*/}
        <li className="text-start">Weight: <input type="number" placeholder="Enter weight in KG" className="input input-bordered input-sm w-2/3 max-w-x ml-6"/>
        </li>
        <br />
  {/*เวลาที่เริ่มเล่นกีฬา*/}      
        <li className="text-start">Start Time: 
        <select className="select select-bordered select-sm w-1/6 max-w-x ml-2 mr-2 text-center" value={selectedHour} onChange={handleChange}>
            <option disabled selected value="">HH</option> {/*เลือกเวลาเป็นชั่วโมง*/}
            {hours.map((hour) => (
              <option key={hour} value={hour}>
                {hour}
              </option>
            ))}
          </select>
          : 
          <select className="select select-bordered select-sm w-1/6 max-w-x ml-2 mr-4 text-center" value={selectedMinute} onChange={handleMinsChange}>
          <option disabled selected value="">MM</option> {/*เลือกเวลาเป็นนาที*/}
          {minutes.map((minute) => (
          <option key={minute} value={minute}>
          {minute}
        </option>
      ))}
          </select>
        </li>
        <br />
        
  {/*เวลาที่ออกกำลังกาย*/}
        <li className="text-start">Duration: 
        <input type="number" placeholder="HH" className="input input-bordered input-sm w-1/6 max-w-x ml-4 mr-2 text-center"/>:
        <input type="number" placeholder="MM" className="input input-bordered input-sm w-1/6 max-w-x text-center ml-2"/>
        </li>
        <br />

  {/*แคลอรี่ที่กินเข้าไปในวันนี้*/}
        <li className="text-start mb-5">Calories: 
        <input type="number" placeholder="Enter Calories" className="input input-bordered input-sm w-2/3 max-w-x ml-4"/>
        </li>
        <h3 className="border rounded-full text-xs w-5/6 max-w-x text-center mb-5 ml-12 bg-slate-200 font-medium">* If do not enter calories, the app will calculate them automatically *</h3>
    </ul>
{/*จบ Modal สำหรับเก็บข้อมูลประจำวัน - ยังอยู่ใน Modal*/}

{/*เริ่ม Update image ใน Modal - ยังอยู่ใน Modal*/}
  <div>
    <img src={imageUrl} alt="venom-cheese" className="rounded-lg"/>

    <labels>Enter image URL : </labels>
    <input
      type="text"
      value={tempImageUrl}
      onChange={handleImageUrlChange}
      className="input input-bordered input-sm w-2/3 max-w-x mt-5"
    />

  <div className="modal-action">
      <button onClick={handleUpdateImage} className="btn hover:btn-success">Update</button>
      <button onClick={handleCancel} className="btn">Cancel</button>
    <form method="dialog"> 
      <button onClick={handleClose} className="btn btn-circle hover:btn-error"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg></button>
    </form>
  </div>
</div>  
{/*จบ Update image ใน Modal - ยังอยู่ใน Modal*/}
</div>
</dialog>
</p></div>
{/*จบ Modal - create custom activities*/}

{/*****แก้เป็น hover ตอนเรากดเลือก type ในก้อน Modal ต้องมี5ภาพ แต่ละภาพมี hover*/}
<img src={venomIconGroup} width={200} height={200} className="max-w-[550px] w-full mx-auto"/>

{/*เริ่ม dropdown เลือกชนิดกีฬา - ซ้ายมือ*/}
<div className="text-center">
<select className="select select-bordered border-gray-700 w-full max-w-xs mb-3 bg-white" value={selectedOption1} onChange={handleDropdown1Change} onClick={handleSelect}>
        <option disabled selected value="">Choose your exercise</option>
        {options1.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
</div>
{/*จบ dropdown เลือกชนิดกีฬา - ซ้ายมือ*/}

{/*รูป venom พื้นสีส้ม*/}
<img src={venom_orangePic} alt="venom_orangePic" className="rounded-lg max-w-[550px] w-full mx-auto mb-6 mt-5"/>
  </div>
</div>
{/*จบกล่องด้านซ้ายมือ สีขาว*/}
        </>
    );
};

export default AddLog;