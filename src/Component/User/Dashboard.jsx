import React from "react";
import venom_orangePic from "../../assets/DashboardPic/venom_orangePic.png";
import venomIconGroup from "../../assets/DashboardPic/venomIconGroup.png";
import plus_button from "../../assets/DashboardPic/plus_button.svg";
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
  const data = {
    labels: ['12AM', '4AM', '8AM', '12PM', '4PM', '8PM', '11PM'],
    datasets: [
      {
        label: 'Steps',
        data: [0, 0, 0, 0, 2500],
        backgroundColor: '#F24822',
      },
    ] 
  };
  const options = {};

  return (
    <>
  <div className="bg-slate-700 flex text-center">

  <div className="flex-1">
    <h1 className="text-6xl text-white mt-6 mb-6">Activities log</h1>

    <div id="common_activity" className="border-solid border-2 border-white bg-white my-6 ml-6 mr-3 rounded-lg pb-2">
      <h2 className="text-4xl mt-3 mb-3">Common activities</h2>

    <div className="max-w-[200px] w-full mx-auto">
      <div className="flex items-center text-1xl">
      <p className="mr-2">create custom activities</p>
      <a href="#"><img src={plus_button} width={20} height={20} /></a>
      </div>
    </div>

      <img src={venomIconGroup} width={200} height={200} className="max-w-[550px] w-full mx-auto"/>


  <select className="select select-bordered border-gray-700 w-full max-w-xs mb-3">
    <option disabled selected>Cycling</option>
    <option>Cycling</option>
    <option>Swimming</option>
    <option>Yoga</option>
    <option>Running</option>
    <option>Walking</option>
    <option>Calisthenics</option>
  </select>

      <img src={venom_orangePic} width={400} height={400} className="rounded-lg max-w-[550px] w-full mx-auto"/>
      

    <div className="max-w-[170px] w-full">
      <div className="flex items-center justify-end text-1xl">
      <a href="#"><img src={plus_button} width={20} height={20} /></a>
      <p className="ml-2">Add Picture</p>
      </div>

    </div>
    </div>
  </div>

<div className="flex-1">
  <div className="border-solid border-2 border-white bg-white my-6 ml-3 mr-6 rounded-lg px-2">
  <div id="bar-chart">
    <div>
      <Bar data={data} options={options}></Bar>
    </div>
  </div>

<div class="border-t border-gray-700 w-3/3 mx-auto my-2"></div>
  <nav>
    <ul className="flex text-sm">
      <li className="flex w-60"><img />Daily Totals</li>
      <li className="flex-1"><img />54,708 steps</li>
      <li className="flex-1"><img />24 miles</li>
      <li className="flex-1"><img />2,183 calories</li>  
    </ul>
  </nav>
  <div class="border-t border-gray-700 w-3/3 mx-auto my-2"></div>

  <h2 className="text-5xl text-salmon-profile mt-6 mb-6">Activities history</h2>
  
  <div>
    <ul className="flex text-sm">
      <li className="flex w-60 hover:text-xs"><a href="#">Date</a></li>
      <li className="flex-1 hover:text-xs"><a href="#"><img />Activity</a></li>
      <li className="flex-1 hover:text-xs"><a href="#"><img />Step</a></li>
      <li className="flex-1 hover:text-xs"><a href="#"><img />Distance</a></li>
      <li className="flex-1 hover:text-xs"><a href="#"><img />Duration</a></li>
      <li className="flex-1 hover:text-xs"><a href="#"><img />Calories</a></li>    
    </ul>
  </div>
  <div class="border-t border-dark-orange w-3/3 mx-auto my-2"></div>

  <input type="text" placeholder="Name" className="input input-bordered input-sm w-full bg-salmon-column text-start mb-2"/>
  <br />
  <input type="text" placeholder="Date" className="input input-bordered input-sm w-full bg-salmon-column text-start mb-2"/>
  <br />
  <input type="text" placeholder="Start Time" className="input input-bordered input-sm w-full bg-salmon-column text-start mb-2"/>
  <br />
  <input type="text" placeholder="End Time" className="input input-bordered input-sm w-3/4 bg-salmon-column text-start mb-2"/><button className="btn btn-sm w-1/4 bg-dark-orange text-white rounded-full">Update</button>
</div>
  </div>

</div>
  
</>
  );
};


export default Dashboard; 









