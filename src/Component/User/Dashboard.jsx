import { React, useRef, useState, Component, useEffect } from "react";
import venom_orangePic from "../../assets/DashboardPic/venom_orangePic.png";
import venomIconGroup from "../../assets/DashboardPic/venomIconGroup.png";
import plus_button from "../../assets/DashboardPic/plus_button.svg";
import venomCheese from "../../assets/DashboardPic/venomCheese.png";
import dumpbell_venom from "../../assets/DashboardPic/dumpbell_venom.png";
import Calendar from "./Calendar";
import AddLog from "./AddLog";
import { useLoginContext } from "../../Context/LoginContext";
import axios from "axios";
import LogTable from "./LogTable";
import ActivityGraph from "./ActivityGraph";

const Dashboard = () => {
  {
    /*ปุ่ม Upload Image ด้วยการคลิก*/
  }
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
  const { user, setUser } = useLoginContext();
  const [reload, setReload] = useState(false);

  const ExerciseLog = user.exerciseLog;
  ExerciseLog.sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime));

  // ใช้ UseEffect rerender
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`https://benom-backend.onrender.com/users/${user._id}/activities`, { headers: user.headers });
        const { exerciseLog } = response.data.data;
        setUser({ ...user, exerciseLog });
      } catch (error) {
        console.error("Error fetching activities", error);
      }
    };

    getData();
  }, [reload]);

  return (
    <>
      {/*เริ่ม กล่อง 1 ด้านซ้าย สีขาว*/}
      <div className="bg-slate-700 flex">
        <AddLog reload={reload} setReload={setReload} />
        {/*จบ กล่อง 1 ด้านซ้าย สีขาว*/}

        {/*เริ่มกล่อง 2 ด้านขวามือ สีขาว*/}
        <div className="hidden md:block flex-1">
          <div className="border-solid border-2 border-white bg-white my-6 ml-3 mr-6 rounded-lg px-2">
            {/*กราฟเส้น*/}
            <ActivityGraph />
            {/*จบกราฟเส้น*/}

            {/*เส้นตรงสีดำ เริ่ม*/}
            <div class="border-t border-gray-700 w-3/3 mx-auto my-2"></div>
            {/*แถบแสดงข้อมูลผลรวมกราฟ - ใต้เส้นสีดำ */}
            <nav>
              <ul className="flex text-sm">
                <li className="flex w-80">
                  <img />
                  Daily Totals
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

            <h2 className="text-5xl text-salmon-profile mt-14 mb-9 text-start">Activities history</h2>

            {/*ส่วนที่คุณฟลุ๊คแก้ไข - ตาราง - ห้ามเคลื่อน*/}

            <LogTable reload={reload} setReload={setReload} ExerciseLog={ExerciseLog} />
          </div>
        </div>
      </div>
      {/*จบกล่อง 2 ด้านขวามือ สีขาว*/}

      {/*เริ่มหน้าจอเล็ก Responsive*/}
      <div id="Small-Screen" className="md:hidden bg-slate-700">
        <p className="text-slate-700">gap</p>
        {/*เริ่ม กล่องขาว*/}
        <div className="border-solid border-2 border-white bg-white mx-6 rounded-lg pl-2 pr-2">
          {/*หัวข้อ Activities history*/}
          <h1 className="text-5xl text-salmon-profile text-center mt-10">Activities history</h1>
          {/*ภาพ venom ออกกำลังกาย 6 แบบ*/}
          <img src={venomIconGroup} width={300} height={300} alt="venom-group" className="max-w-[350px] w-full mx-auto" />
          {/*input name - เปล่า */}
          <input placeholder="NAME" className="input input-sm input-bordered w-full max-w-x" />
          <br />

          {/*ปฎิธินกลางหน้าจอ*/}
          <div>
            <Calendar />
          </div>
          {/*จบ ปฎิธินกลางหน้าจอ*/}

          <div className="grid grid-flow-col gap-2 text-center">
            {/*ปุ่มกดเริ่มออกกำลังกาย*/}
            <button className="btn bg-dark-orange text-white w-50">START</button>
            {/*ปุ่มสิ้นสุดการออกกำลังกาย ปุ่มสิ้นสุด*/}
            <button className="btn bg-neutral text-white w-50">END</button>
          </div>

          <div className="flex">
            <div className="flex-1">
              {/*ภาพ venom สีส้มสำหรับอัพโหลดภาพถ่ายประจำวัน*/}
              <div>
                <img src={venom_orangePic} alt="enom_orangePic" className="rounded-lg w-full mx-auto mt-2" />
              </div>

              {/* Modal Upload-Image */}
              <div>
                <p className="mr-8 text-start">
                  <button className="btn" onClick={() => document.getElementById("my_modal_3").showModal()}>
                    <img src={plus_button} width={10} height={10} />
                  </button>
                  <dialog id="my_modal_3" className="modal text-center">
                    <div className="modal-box">
                      <h3 className="font-bold text-lg">Select file</h3>
                      <div>
                        <div>
                          {image ? <img src={URL.createObjectURL(image)} alt="" /> : <img src={venomCheese} alt="venomCheese" />}
                          <input type="file" ref={uploadImage} onChange={handleImageChange} onClick={handleImageClick} />
                        </div>
                      </div>

                      <div className="modal-action">
                        <form method="dialog">
                          {/*ปุ่มอัพเดท*/}
                          <button className="btn">Update</button>
                          <button className="btn ml-2">Close</button>
                        </form>
                      </div>
                    </div>
                  </dialog>
                  Add Picture
                </p>
              </div>
            </div>
            {/*End Modal Upload-Image*/}

            {/*สติ๊กเกอร์ Venom ถือดัมเบล*/}
            <img src={dumpbell_venom} width={100} height={200} alt="dumpbell_venom" className="flex-1 ml-1 mt-2" />
          </div>
        </div>
        {/*จบ กล่องขาว*/}
        <p className="text-slate-700">gap</p>
      </div>
      {/*จบหน้าจอเล็ก Responsive*/}
    </>
  );
};

export default Dashboard;
