import React from "react";
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Legend, Tooltip } from "chart.js";
import { Line } from "react-chartjs-2";
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Legend, Tooltip);

const ActivityGraph = () => {
  {
    /* ชื่อฐานกราฟ แกน X - แก้เป็นระบบวันจริง */
  }
  const labels = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  {
    /*เส้นกราฟการออกกำลังกาย 6 ชนิด ช่อง data คือ จำนวนวัน 7 วัน*/
  }
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
  return (
    <div id="line-chart">
      <div>
        <Line data={data} />
      </div>
    </div>
  );
};

export default ActivityGraph;
