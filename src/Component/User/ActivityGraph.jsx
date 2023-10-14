import React from "react";
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Legend, Tooltip } from "chart.js";
import { Line } from "react-chartjs-2";
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Legend, Tooltip);

const ActivityGraph = ({ ExerciseLog }) => {
  {
    /* ชื่อฐานกราฟ แกน X - แก้เป็นระบบวันจริง */
  }
  const today = new Date();
  const labels = [];
  for (let i = 6; i >= 0; i--) {
    labels.push(new Date(today - i * 24 * 60 * 60 * 1000).toISOString().split("T")[0]);
  }

  {
    /*เส้นกราฟการออกกำลังกาย 6 ชนิด ช่อง data คือ จำนวนวัน 7 วัน*/
  }
  const exercises = {
    Cycling: Array(labels.length).fill(0),
    Swimming: Array(labels.length).fill(0),
    Yoga: Array(labels.length).fill(0),
    Running: Array(labels.length).fill(0),
    Walking: Array(labels.length).fill(0),
    Calisthenics: Array(labels.length).fill(0),
  };
  ExerciseLog.forEach((ex) => {
    if (new Date(ex.date) < new Date(labels[0])) return;
    const exIndex = labels.indexOf(ex.date.split("T")[0]);
    if (exIndex === -1) return;
    const exerciseType = ex.exerciseName.split(":")[0];
    exercises[exerciseType][exIndex] += ex.calories;
  });

  /*
 {ExerciseLog.map((Log, index) => (
            <tr key={Log._id} className={index % 2 === 0 ? "bg-lightsalmon" : "bg-gray-100"}>
              <td className="px-6 py-4 text-black whitespace-nowrap">{Log.exerciseName}</td>
              <td className="px-6 py-4 text-black whitespace-nowrap">{Log.dateTime.split("T")[0]}</td>
              <td className="px-6 py-4 text-black whitespace-nowrap">{Log.startTime}</td>
              <td className="px-6 py-4 text-black whitespace-nowrap">{Log.duration}</td>
              <td className="px-6 py-4 text-black whitespace-nowrap">{Log.calories}</td>


  */

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Cycling",
        backgroundColor: "#f21605",
        borderColor: "#f21605",
        data: exercises["Cycling"],
      },
      {
        label: "Swimming",
        backgroundColor: "#fe7534",
        borderColor: "#fe7534",
        data: exercises["Swimming"],
      },
      {
        label: "Yoga",
        backgroundColor: "#ffb443",
        borderColor: "#ffb443",
        data: exercises["Yoga"],
      },
      {
        label: "Running",
        backgroundColor: "#DE3163",
        borderColor: "#DE3163",
        data: exercises["Running"],
      },
      {
        label: "Walking",
        backgroundColor: "#e456c6",
        borderColor: "#e456c6",
        data: exercises["Walking"],
      },
      {
        label: "Calisthenics",
        backgroundColor: "#ff6767",
        borderColor: "#ff6767",
        data: exercises["Calisthenics"],
      },
    ],
  };
  return (
    <>
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
            <img /> 190 minutes
          </li>
          <li className="flex-1 ml-3">
            <img />
            Exercise
          </li>
          <li className="flex-1">
            <img />
            2,183 calories
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
