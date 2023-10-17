import React, { useState } from "react";
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Legend, Tooltip } from "chart.js";
import { Line } from "react-chartjs-2";
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Legend, Tooltip);

const ActivityGraph = ({ ExerciseLog }) => {
  const [showType, setShowType] = useState("Last Week");
  {
    /* ชื่อฐานกราฟ แกน X - แก้เป็นระบบวันจริง */
  }
  const today = new Date();
  const labels = [];
  let days;
  if (showType === "Last Week") {
    days = 7;
  } else if (showType === "Last Month") {
    days = 30;
  } else if (showType === "Last 3 Months") {
    days = 90;
  } else if (showType === "Last 6 Months") {
    days = 180;
  } else if (showType === "Last Year") {
    days = 365;
  } else if (showType === "All Time") {
    //only work because default sort is from the most recent
    const oldestDate = new Date(ExerciseLog[ExerciseLog.length - 1].date);
    const timeDifference = new Date(today.toISOString().split("T")[0]) - oldestDate;
    days = timeDifference / 24 / 60 / 60 / 1000;
  }
  const initialDays = days;
  for (days - 1; days >= 0; days--) {
    labels.push(new Date(today - days * 24 * 60 * 60 * 1000).toISOString().split("T")[0]);
  }

  {
    /*เส้นกราฟการออกกำลังกาย 6 ชนิด ช่อง data คือ จำนวนวัน 7 วัน*/
  }
  const exercises = {
    Cycling: { data: Array(labels.length).fill(0), time: 0 },
    Swimming: { data: Array(labels.length).fill(0), time: 0 },
    Yoga: { data: Array(labels.length).fill(0), time: 0 },
    Running: { data: Array(labels.length).fill(0), time: 0 },
    Walking: { data: Array(labels.length).fill(0), time: 0 },
    Calisthenics: { data: Array(labels.length).fill(0), time: 0 },
    totalCalories: 0,
    totalTime: 0,
  };
  ExerciseLog.forEach((ex) => {
    if (new Date(ex.date) < new Date(labels[0])) return;
    const exIndex = labels.indexOf(ex.date.split("T")[0]);
    if (exIndex === -1) return;
    const exerciseType = ex.exerciseName.split(":")[0];
    exercises[exerciseType].data[exIndex] += ex.calories;
    exercises.totalCalories += ex.calories;
    exercises[exerciseType].time += ex.duration;
    exercises.totalTime += ex.duration;
  });

  let modNum = 0;
  if (initialDays === 30) {
    modNum = 2;
  } else if (initialDays === 90) {
    modNum = 2;
  } else if (initialDays === 180) {
    modNum = 3;
  } else if (initialDays === 365) {
    modNum = 6;
  } else {
    modNum = Math.round(initialDays / 55);
  }
  if (labels.length > 13) {
    for (let i = 0; i < labels.length; i++) {
      if (i % modNum > 0) labels[i] = "";
    }
  }

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Running",
        backgroundColor: "#f21605",
        borderColor: "#f21605",
        data: exercises["Running"].data,
      },
      {
        label: "Walking",
        backgroundColor: "#ff8000",
        borderColor: "#ff8000",
        data: exercises["Walking"].data,
      },
      {
        label: "Yoga",
        backgroundColor: "#a922f2",
        borderColor: "#a922f2",
        data: exercises["Yoga"].data,
      },
      {
        label: "Swimming",
        backgroundColor: "#0fdef5",
        borderColor: "#0fdef5",
        data: exercises["Swimming"].data,
      },
      {
        label: "Cycling",
        backgroundColor: "#e5e823",
        borderColor: "#e5e823",
        data: exercises["Cycling"].data,
      },
      {
        label: "Calisthenics",
        backgroundColor: "#00d447",
        borderColor: "#00d447",
        data: exercises["Calisthenics"].data,
      },
    ],
  };
  const { totalCalories, totalTime, ...types } = exercises;
  const byTypes = [];
  for (const type in types) {
    const sumType = Math.round(types[type].data.reduce((sum, current) => sum + current, 0));
    if (sumType) {
      byTypes.push(
        <tr className="w-full flex">
          <td className="w-2/12 text-center">{type}</td>
          <td className="w-2/12 text-center">{showType}</td>
          <td className="w-4/12 text-center">{`${Math.floor(types[type].time / 60)} hours, ${Math.round(types[type].time % 60)} minutes.`}</td>
          <td className="w-4/12 text-center">{`${sumType} kcals`}</td>
        </tr>
      );
    }
  }
  return (
    <>
      <div className="flex">
        <select
          className="select select-bordered border-gray-700 ml-auto bg-white"
          onChange={(ev) => {
            setShowType(ev.target.value);
          }}>
          <option selected value="Last Week">
            Last Week
          </option>
          <option value="Last Month">Last Month</option>
          <option value="Last 3 Months">Last 3 Months</option>
          <option value="Last 6 Months">Last 6 Months</option>
          <option value="Last Year">Last Year</option>
          <option value="All Time">All Time</option>
        </select>
      </div>
      <div id="line-chart">
        <div>
          <Line data={data} />
        </div>
      </div>

      {/*เส้นตรงสีดำ เริ่ม*/}
      <div class="border-t border-gray-700 w-3/3 mx-auto my-2"></div>
      {/*แถบแสดงข้อมูลผลรวมกราฟ - ใต้เส้นสีดำ */}
      <table className="flex flex-col">
        <thead className="">
          <tr className="flex justify-between items-center">
            <th className=" w-2/12">Name</th>
            <th className=" w-2/12">Time span</th>
            <th className=" w-4/12">Total exercise time</th>
            <th className=" w-4/12">Total calories burned</th>
          </tr>
        </thead>
        <tbody className="">{byTypes}</tbody>
        <tfoot>
          <tr className="w-full flex">
            <td className="w-2/12 text-center font-bold">Total</td>
            <td className="w-2/12 text-center font-bold">{showType}</td>
            <td className="w-4/12 text-center font-bold">{`${Math.floor(exercises.totalTime / 60)} hours, ${Math.round(exercises.totalTime % 60)} minutes.`}</td>
            <td className="w-4/12 text-center font-bold">{`${Math.round(exercises.totalCalories)} kcals`}</td>
          </tr>
        </tfoot>
      </table>

      {/* <div className="flex flex-col">
        <ul className="flex text-md justify-between">
          <li className="">{showType}</li>
          <li className=""></li>
          <li className="">Total Calories Burned</li>
          <li className=""></li>
        </ul>
      </div> */}

      {/*จบแถบแสดงข้อมูลผลรวมกราฟ - ใต้เส้นสีดำ */}
      <div class="border-t border-gray-700 w-3/3 mx-auto my-2"></div>
      {/*เส้นตรงสีดำ จบ*/}
    </>
  );
};

export default ActivityGraph;
