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
  let i;
  if (showType === "Last Week") {
    i = 7;
  } else if (showType === "Last Month") {
    i = 30;
  }
  for (i; i > 0; i--) {
    labels.push(new Date(today - (i - 1) * 24 * 60 * 60 * 1000).toISOString().split("T")[0]);
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

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Cycling",
        backgroundColor: "#e5e823",
        borderColor: "#e5e823",
        data: exercises["Cycling"].data,
      },
      {
        label: "Swimming",
        backgroundColor: "#0fdef5",
        borderColor: "#0fdef5",
        data: exercises["Swimming"].data,
      },
      {
        label: "Yoga",
        backgroundColor: "#a922f2",
        borderColor: "#a922f2",
        data: exercises["Yoga"].data,
      },
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
        label: "Calisthenics",
        backgroundColor: "#00d447",
        borderColor: "#00d447",
        data: exercises["Calisthenics"].data,
      },
    ],
  };
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
      <nav>
        <ul className="flex text-sm">
          <li className="flex w-80">
            <img />
            Weekly Totals
          </li>
          <li className="flex-1">
            <img /> {`${Math.floor(exercises.totalTime / 60)} hours, ${exercises.totalTime % 60} minutes.`}
          </li>
          <li className="flex-1 ml-3">
            <img />
            Total Calories Burned
          </li>
          <li className="flex-1">
            <img />
            {`${exercises.totalCalories} kcals`}
          </li>
        </ul>
      </nav>

      {/*จบแถบแสดงข้อมูลผลรวมกราฟ - ใต้เส้นสีดำ */}
      <div class="border-t border-gray-700 w-3/3 mx-auto my-2"></div>
      {/*เส้นตรงสีดำ จบ*/}
    </>
  );
};

export default ActivityGraph;
