import { React, useRef, useState, Component} from "react";
import venom_orangePic from "../../assets/DashboardPic/venom_orangePic.png";
import venomIconGroup from "../../assets/DashboardPic/venomIconGroup.png";
import plus_button from "../../assets/DashboardPic/plus_button.svg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faBolt, faStopwatch, faFire} from '@fortawesome/free-solid-svg-icons';
import venomCheese from "../../assets/DashboardPic/venomCheese.png";
import dumpbell_venom from "../../assets/DashboardPic/dumpbell_venom.png";
import calendar from "../../assets/DashboardPic/calendar.png";
import Datepicker from "./Datepicker";

import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  } from 'chart.js';

import { Bar } from 'react-chartjs-2';

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);


const Dashboard = () => {
{/*Bar-Chart*/}
  const data = {
    labels: ['Cycling', 'Swimming', 'Yoga', 'Running', 'Walking', 'Chalistenics'],
    datasets: [
      {
        label: 'minutes',
        data: [0, 0, 10, 30, 120, 30],
        backgroundColor: '#F24822',
      },
    ] 
  };
  const options = {};

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
  
  return (
    <>
  <div className="bg-slate-700 flex">

  <div className="hidden md:block flex-1">
    <h1 className="text-6xl text-white mt-6 mb-6 text-center">Activities log</h1>

    <div id="common_activity" className="border-solid border-2 border-white bg-white my-6 ml-6 mr-3 rounded-lg pb-2">
      <h2 className="text-4xl mt-3 mb-3 text-center">Common activities</h2>

    <div><p className="mr-2 text-center ">create custom activities

    {/* Open the modal using document.getElementById('ID').showModal() method */}
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
        {/* if there is a button in form, it will close the modal */}
        <button className="btn">Update</button>
        <button className="btn ml-2">Close</button>
      </form>
  </div>
  </div>
</dialog>
</p></div>

      <img src={venomIconGroup} width={200} height={200} className="max-w-[550px] w-full mx-auto"/>

<div className="text-center">
  <select className="select select-bordered border-gray-700 w-full max-w-xs mb-3" onChange={handleSelect}>
  <option disabled selected>Choose your exercise</option>
  {selectOptions.map(option => (<option value={option.label}>{option.label}</option>
))}
  </select>
</div>




      <img src={venom_orangePic} width={400} height={400} className="rounded-lg max-w-[550px] w-full mx-auto" />

  <div><p className="mr-8 text-end">

  {/* Open the modal using document.getElementById('ID').showModal() method */}
   <button className="btn" onClick={()=>document.getElementById('my_modal_2').showModal()}><img src={plus_button} width={15} height={15}/></button>
   <dialog id="my_modal_2" className="modal text-center">
    <div className="modal-box">

  {/*Upload-Image*/}
    <h3 className="font-bold text-lg">Select file</h3>

  <div>
    <div onClick={handleImageClick}>
    {image ? (<img src={URL.createObjectURL(image)} alt="" />
    ) : (
    <img src={venomCheese} alt="venomCheese" />
    )}
    <input type="file" 
    ref={uploadImage} 
    onChange={handleImageChange}
    />
    </div>
  </div>  
{/*End Upload-Image*/}

    <div className="modal-action">
      <form method="dialog">
        {/* if there is a button in form, it will close the modal */}
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
  <div className="border-solid border-2 border-white bg-white my-6 ml-3 mr-6 rounded-lg px-2">
  <div id="bar-chart">
    <div>
      <Bar data={data} options={options}></Bar>
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
  <h2 className="text-5xl text-salmon-profile mt-14 mb-9 text-start">Activities history</h2>
  <div>
    <ul className="flex text-sm">
      <li className="Calendar-button flex w-60">Date</li>
      <li className="flex-1"><FontAwesomeIcon icon={faBolt} className="mr-1"/>Activity</li>
      <li className="flex-1"><FontAwesomeIcon icon={faPlay} className="mr-1"/>Start-Time</li>
      <li className="flex-1"><FontAwesomeIcon icon={faStopwatch} className="mr-1"/>Duration</li>
      <li className="flex-1"><FontAwesomeIcon icon={faFire} className="mr-1"/>Calories</li>    
    </ul>
  </div>
  <div class="border-t border-dark-orange w-3/3 mx-auto my-2"></div>

  <input type="text" className="input input-bordered input-sm w-full bg-salmon-column text-start mb-2"/>
  <br />
  <input type="text" className="input input-bordered input-sm w-full bg-salmon-column text-start mb-2"/>
  <br />
  <input type="text" className="input input-bordered input-sm w-full bg-salmon-column text-start mb-2"/>
  <br />
  <input type="text" className="input input-bordered input-sm w-full bg-salmon-column text-start mb-2"/>

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

<img src={calendar} className="max-w-[350px] w-full mx-auto mt-2 mb-2"/>
<div>
    <Datepicker></Datepicker>
</div>

{/*End Calendar*/}

 <div className="grid grid-flow-col gap-2 text-center">
  <button className="btn bg-dark-orange text-white w-50">START</button>
  <button className="btn bg-neutral text-white w-50">END</button>
 </div>


  <div className="flex">
  <div className="flex-1">
  <img src={venom_orangePic} alt="venom-orange" className="rounded-lg w-full mx-auto mt-2"/>
  
      <div><p className="mr-8 text-start">
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <button className="btn" onClick={()=>document.getElementById('my_modal_3').showModal()}><img src={plus_button} width={10} height={10}/></button>
      <dialog id="my_modal_3" className="modal text-center">
        <div className="modal-box">

      {/*Upload-Image*/}
        <h3 className="font-bold text-lg">Select file</h3>

      <div>
        <div onClick={handleImageClick}>
        {image ? (<img src={URL.createObjectURL(image)} alt="" />
        ) : (
        <img src={venomCheese} alt="venomCheese" />
        )}
        <input type="file" 
        ref={uploadImage} 
        onChange={handleImageChange}
        />
        </div>
      </div>  
    {/*End Upload-Image*/}

        <div className="modal-action">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
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









