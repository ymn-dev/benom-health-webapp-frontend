import { React, useRef, useState, Component,useEffect} from "react";
import venom_orangePic from "../../assets/DashboardPic/venom_orangePic.png";
import venomIconGroup from "../../assets/DashboardPic/venomIconGroup.png";
import plus_button from "../../assets/DashboardPic/plus_button.svg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faBolt, faStopwatch, faFire} from '@fortawesome/free-solid-svg-icons';
import venomCheese from "../../assets/DashboardPic/venomCheese.png";
import dumpbell_venom from "../../assets/DashboardPic/dumpbell_venom.png";
import Calendar from "./Calendar";
import { Line } from 'react-chartjs-2';
import { useLoginContext } from "../../Context/LoginContext";
import axios from 'axios';

import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip
  } from 'chart.js';

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip
);




const labels = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

const data = {
  labels: labels,
  datasets: [
    {
      label: "Cycling",
      backgroundColor: "#f21605",
      borderColor: "#f21605",
      data: [30, 0, 0, 0, 0, 30, 0],
    },
    {
      label: "Swimming",
      backgroundColor: "#fe7534",
      borderColor: "#fe7534",
      data: [0, 0, 60, 0, 0, 0, 0],
    },
    {
      label: "Yoga",
      backgroundColor: "#ffb443",
      borderColor: "#ffb443",
      data: [0, 120, 0, 0, 0, 0, 0],
    },
    {
      label: "Running",
      backgroundColor: "#DE3163",
      borderColor: "#DE3163",
      data: [0, 0, 0, 90, 0, 0, 60],
    },
    {
      label: "Walking",
      backgroundColor: "#e456c6",
      borderColor: "#e456c6",
      data: [0, 0, 0, 30, 30, 0, 0],
    },
    {
      label: "Calisthenics",
      backgroundColor: "#ff6767",
      borderColor: "#ff6767",
      data: [0, 0, 0, 0, 120, 0, 0],
    },
  ],
};


const Dashboard = () => {

{/*Sport Select Option*/}
const selectOptions = [
  {label: "Cycling"}, 
  {label: "Swimming"}, 
  {label: "Yoga"},
  {label: "Running"},
  {label: "Walking"}, 
  {label: "Calisthenics"},
];

const [selectValue, setSelectValue] = useState("");

function handleSelect(event) {
  setSelectValue(event.target.value)
};


{/*Upload Image*/}
const uploadImage = useRef(null);
const [image, setImage] = useState("");

const handleImageClick = () => {
  uploadImage.current.click();
};

const handleImageChange = (event) => {
  const file = event.target.files[0];
  setImage(event.target.files[0]);
};

// Import User
const {user,setUser} = useLoginContext();
const [reload,setReload] = useState("");

const ExerciseLog = user.exerciseLog ;
ExerciseLog.sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime));

// ใช้ UseEffect rerender 
useEffect(() => {
  const getData = async () => {
    try {
      const response = await axios.get(
        `https://benom-backend.onrender.com/users/${user._id}/activities`,
        { headers: user.headers }
      );
      const {exerciseLog} = response.data.data;
      setUser({ ...user,exerciseLog});
    } catch (error) {
      console.error('Error fetching activities', error);
    }
  };

  getData();
  
}, [reload]);  

// function ลบข้อมูลโดยระบุ ID 
const DeleteHandler = async (id) => {
  try {
  const response = await axios.delete(
      `https://benom-backend.onrender.com/users/${user._id}/activities/${id}`,{headers:user.headers}
    );

    if (response.status === 200) {
      setReload(!reload);
    }
   }  catch (error) {
    
    console.error('Error deleting activity', error);
  }
  }
  
  return (
    <>
  <div className="bg-slate-700 flex">

  <div className="hidden md:block flex-1">
    <h1 className="text-6xl text-white mt-6 mb-6 text-center">Activities log</h1>

    <div id="common_activity" className="border-solid border-2 border-white bg-white my-6 ml-6 mr-3 rounded-lg pb-2">
      <h2 className="text-4xl mt-3 mb-3 text-center">Common activities</h2>

    {/*ก้อน Modal เลือกแบบกีฬา*/}
    <div><p className="mr-2 text-center ">create custom activities
    {/* Modal */}
<button className="btn" onClick={()=>document.getElementById('my_modal_1').showModal()}><img src={plus_button} width={15} height={15}/></button>
<dialog id="my_modal_1" className="modal">
  <div className="modal-box">
    <h3 className="font-bold text-lg pb-10">Activity : {selectValue}</h3>
    <ul>
    <li className="text-start">Date: <input placeholder="08-08-2023"/></li><br />
    <li className="text-start">Weight: <input placeholder="Enter weight in KG"/></li><br />
    <li className="text-start">Start-Time: <input placeholder="HH/MM"/></li><br />
    <li className="text-start">Duration: <input placeholder="HH/MM"/></li><br />
    <li className="text-start">Calories: <input placeholder="Enter Calories"/></li>
    </ul>
  <div className="modal-action">
      <form method="dialog"> 
        {/* อ่านเพิ่มเติม method นี้ เผื่อมีปุ่มอัพเดทโดยที่ไม่ต้องกดปิดไปก่อน วิธีนี้มันปิด */}
        <button className="btn">Update</button>
        <button className="btn ml-2">Close</button>
      </form>
  </div>
  </div>
</dialog>
</p></div>

      {/*อันนี้จะเปลี่ยนเป็น hover ตอนเรากดเลือก type ในก้อน Modal ต้องมี5ภาพ แต่ละภาพมี hover*/}
<img src={venomIconGroup} width={200} height={200} className="max-w-[550px] w-full mx-auto"/>
<div className="text-center">
  <select className="select select-bordered border-gray-700 w-full max-w-xs mb-3" onChange={handleSelect}>
  <option disabled selected>Choose your exercise</option>

  {/*อันนี้เอาไว้เปลี่ยนชื่อกีฬาใน modal แรก*/}
  {selectOptions.map(option => (<option value={option.label}>{option.label}</option>
))}
  </select>
</div>

  <img src={venom_orangePic} alt="enom_orangePic" className="rounded-lg max-w-[550px] w-full mx-auto"/>

  <div><p className="mr-8 text-end">
  {/*Modal*/}
   <button className="btn" onClick={()=>document.getElementById('my_modal_2').showModal()}><img src={plus_button} width={15} height={15}/></button>
   <dialog id="my_modal_2" className="modal text-center">
    <div className="modal-box">

  {/*Upload-Image*/}
    <h3 className="font-bold text-lg">Select file</h3>
  <div>
    <div>
    {image ? (<img src={URL.createObjectURL(image)} alt="" />
    ) : (
    <img src={venomCheese} alt="venomCheese" />
    )}
    <input type="file" 
    ref={uploadImage} 
    onClick={handleImageClick}
    onChange={handleImageChange}
    />
    </div>
  </div>  
{/*End Upload-Image*/}

    <div className="modal-action">
      <form method="dialog">
        {/* ดูคำสั่ง Modal เพิ่ม modal-action method="dialog" ใช้อันอื่นแทนได้ไหม*/}
        <button className="btn">Update</button>
        <button className="btn ml-2">Close</button>
      </form>
    </div>
  </div>
</dialog>
Add Picture</p></div>
    </div>
  </div>

<div className="hidden md:block flex-1">
  <div className="border-solid border-2 border-white bg-white my-6 ml-3 mr-6 rounded-lg px-2 pb-3">
  <div id="line-chart">
    <div>
      <Line data={data} />
    </div>
  </div>

<div class="border-t border-gray-700 w-3/3 mx-auto my-2"></div>
  <nav>
    <ul className="flex text-sm">
      <li className="flex w-80"><img />Daily Totals</li>
      <li className="flex-1"><img /> 190 minutes</li>
      <li className="flex-1 ml-3"><img />Exercise</li>
      <li className="flex-1"><img />2,183 calories</li>  
    </ul>
  </nav>

  <div class="border-t border-gray-700 w-3/3 mx-auto my-2"></div>
  <h2 className="text-5xl text-salmon-profile mt-14 mb-5 text-start">Activities history</h2>
  
  {/* Table log Data  */}
  <table className="min-w-full divide-y">
  <thead className="bg-dark-orange">
    <tr>
      <th className="px-6 py-5 text-left text-xs font-bold text-black uppercase tracking-wider">Activity</th>
      <th className="px-6 py-5 text-left text-xs font-bold text-black uppercase tracking-wider">Date</th>
      <th className="px-6 py-5 text-left text-xs font-bold text-black uppercase tracking-wider">Start-Time</th>
      <th className="px-6 py-5 text-left text-xs font-bold text-black uppercase tracking-wider">Duration</th>
      <th className="px-6 py-5 text-left text-xs font-bold text-black uppercase tracking-wider">Calories</th>
      <th className="px-6 py-5 text-left text-xs font-bold text-black uppercase tracking-wider"></th>
      <th className="px-6 py-5 text-left text-xs font-bold text-black uppercase tracking-wider"></th>
    </tr>
  </thead>
  <tbody>
    {ExerciseLog.map((Log, index) => (
      <tr key={Log._id} className={index % 2 === 0 ? 'bg-lightsalmon' : 'bg-gray-100'}>
        <td className="px-6 py-4 text-black whitespace-nowrap">{Log.exerciseName}</td>
        <td className="px-6 py-4 text-black whitespace-nowrap">{Log.dateTime.split('T')[0]}</td>
        <td className="px-6 py-4 text-black whitespace-nowrap">{Log.startTime}</td>
        <td className="px-6 py-4 text-black whitespace-nowrap">{Log.duration}</td>
        <td className="px-6 py-4 text-black whitespace-nowrap">{Log.calories}</td>
        <td className="px-6 py-4 text-black whitespace-nowrap">
          {/* ส่วนปุ่ม DELETE  */}
          <button className="btn btn-outline btn-error" onClick={() => DeleteHandler(Log._id)}>Delete</button>
        </td>
        <td>
          {/* ส่วนปุ่ม view photo  */}
          <button className="btn btn-outline btn-primary" onClick={() => document.getElementById(`my_modal_${Log._id}`).showModal()}>View Photo</button>
          <dialog id={`my_modal_${Log._id}`} className="modal modal-bottom sm:modal-middle">
            <div className="modal-box">
              <h3 className="font-bold text-lg text-white mb-4">{Log.exerciseName}</h3>
              <img src={Log.picture} alt="imglog" />
              <div className="modal-action">
                <form method="dialog">
                  <button className="btn btn-outline btn-error" onClick={() => document.getElementById(`my_modal_${Log._id}`).close()}>Close</button>
                </form>
              </div>
            </div>
          </dialog>
        </td>
      </tr>
    ))}
  </tbody>
</table>

 
  </div>
  </div>
</div>


<div id="Small-Screen" className="md:hidden bg-slate-700">  
<p className="text-slate-700">gap</p> 
  <div className="border-solid border-2 border-white bg-white mx-6 rounded-lg pl-2 pr-2">
  <h1 className="text-5xl text-salmon-profile text-center mt-10">Activities history</h1>
  <img src={venomIconGroup} width={300} height={300} alt="venom-group" className="max-w-[350px] w-full mx-auto"/>
  <input placeholder="NAME" className="input input-sm input-bordered w-full max-w-x"/>
  <br />

{/*Calendar*/}
<div>
  <Calendar />
</div>
{/*End Calendar*/}

 <div className="grid grid-flow-col gap-2 text-center">
  <button className="btn bg-dark-orange text-white w-50">START</button>
  <button className="btn bg-neutral text-white w-50">END</button>
 </div>

  <div className="flex">
  <div className="flex-1">
  
  <div>
      <img src={venom_orangePic} alt="enom_orangePic" className="rounded-lg w-full mx-auto mt-2"/>
    </div>

      <div><p className="mr-8 text-start">
      {/* Modal */}
      <button className="btn" onClick={()=>document.getElementById('my_modal_3').showModal()}><img src={plus_button} width={10} height={10}/></button>
      <dialog id="my_modal_3" className="modal text-center">
        <div className="modal-box">

      {/*Upload-Image*/}
        <h3 className="font-bold text-lg">Select file</h3>
      <div>
        <div>
        {image ? (<img src={URL.createObjectURL(image)} alt="" />
        ) : (
        <img src={venomCheese} alt="venomCheese" />
        )}
        <input type="file" 
        ref={uploadImage} 
        onChange={handleImageChange}
        onClick={handleImageClick}
        />
        </div>
      </div>  

    {/*End Upload-Image*/}
        <div className="modal-action">
          <form method="dialog">
            {/* ใช้คำสั่ง Modal อื่น */}
            <button className="btn">Update</button>
            <button className="btn ml-2">Close</button>
          </form>
        </div>
      </div>
    </dialog>
    Add Picture</p></div>
    </div>
  <img src={dumpbell_venom} width={100} height={200} alt="dumpbell_venom" className="flex-1 ml-1 mt-2"/>
  </div>
  </div>
  <p className="text-slate-700">gap</p> 
</div>
  
</>
  );
};


export default Dashboard; 

