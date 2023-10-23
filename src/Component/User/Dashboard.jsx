import { React, useRef, useState, Component, useEffect } from "react";
import AddLog from "./AddLog";
import { useLoginContext } from "../../Context/LoginContext";
import axios from "axios";
import LogTable from "./LogTable";
import ActivityGraph from "./ActivityGraph";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  // Import User
  const { user, setUser, login } = useLoginContext();
  const navigate = useNavigate();
  if (!login) {
    navigate("/");
  }
  //Upload Image - Click
  const uploadImage = useRef(null);
  const [image, setImage] = useState("");

  const handleImageClick = () => {
    uploadImage.current.click();
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(event.target.files[0]);
  };

  const [reload, setReload] = useState(false);

  const ExerciseLog = user.exerciseLog;
  ExerciseLog.sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime));

  // ใช้ UseEffect rerender
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`https://benom-backend.onrender.com/users/${user._id}/activities`, { headers: user.headers });
        const { exerciseLog, exerciseTime, caloriesBurned } = response.data.data;
        setUser({ ...user, exerciseLog, exerciseTime, caloriesBurned });
      } catch (error) {
        console.error("Error fetching activities", error);
      }
    };

    getData();
  }, [reload]);

  return (
    <>
      {/*Chart Box*/}
      <div className="bg-slate-700 pb-7">
        <div className="md:block">
          <h1 className="text-6xl text-white pt-10 pb-6 text-center">Activities log</h1>
          <div id="common_activity" className="border-solid border-2 border-white bg-white my-6 ml-5 mr-5 rounded-lg pb-5 xl:mx-60 xl:my-10">
            <ActivityGraph ExerciseLog={ExerciseLog} />
          </div>
        </div>
        {/*Chart Box*/}

        {/*AddLog + Table Box*/}
        <div className="xl:flex">
          {/*AddLog*/}
          <div className="xl:flex-1 xl:w-1/2">
            <div className="border-solid border-2 border-white bg-white my-6 ml-5 mr-5 rounded-lg px-4 pt-4">
              <AddLog reload={reload} setReload={setReload} />
            </div>
          </div>
          {/*AddLog */}

          {/*Table*/}

          <div className="xl:flex-1 xl:first-letter:w-1/2">
            <div className="border-solid border-2 border-white bg-white ml-5 mr-5 rounded-lg pb-5 mt-6">
              <h2 className="text-4xl mt-14 mb-9 text-start ml-2 xl:ml-12">Activities history</h2>
              <LogTable reload={reload} setReload={setReload} ExerciseLog={ExerciseLog} />
            </div>
          </div>

          {/*Table*/}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
