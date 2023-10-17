import React, { useEffect, useState } from "react";
import { useLoginContext } from "../../Context/LoginContext";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import editIcon from "../../assets/edit-svgrepo-com.svg";

const Profile = () => {
  const { login, user } = useLoginContext();
  const navigate = useNavigate();
  if (!login) {
    navigate("/signin");
  }

  const [ProfileImg, setProfileImg] = useState("");
  const [ProfileURL, setProfileURL] = useState("https://i.ibb.co/mHF9LZZ/venom-Cheese.png");
  const [reload, setReload] = useState(false);
 // ส่วนต่อ backend 
 useEffect(() => {
  const getData = async () => {
    try {
      const response = await axios.get(`https://benom-backend.onrender.com/users/${user._id}`, { headers: user.headers });
      const { profilePicture } = response.data.data;
      setUser({ ...user, profilePicture});
    } catch (error) {
      console.error("Error update User", error);
    }
  };

  getData();
}, [reload]);

const submitIMG = async (ev) => {
  ev.preventDefault();
  if (!ProfileImg) return;

  try {
    const response = await axios.patch(`https://benom-backend.onrender.com/users/${user._id}`, {profilePicture: ProfileImg},{ headers: user.headers });
    if (response.status === 200) {
      setReload(!reload);
     
    }
  } catch (err) {
    console.error(err);
  }
};
// const profileImageStyle = {
//   width: "200px",
//   height: "200px",
//   borderRadius: "50%",
// };

// const inputStyle = {
//   backgroundColor: "white",
//   border: "1px solid #ccc",
//   padding: "5px",
//   marginBottom: "10px",
//   marginLeft: "10px",
// };

// const editButtonStyle = {
//   position: "absolute",
//   bottom: "0",
//   right: "0",
//   backgroundColor: "transparent",
//   border: "none",
//   cursor: "pointer",
// };

// const editIconStyle = {
//   width: "30px",
//   height: "30px",
// };

  return (
    <div className="md:w-1/2 mx-auto">
        <div className="bg-salmon p-4  rounded-t-lg ">
          <div className="flex justify-between items-center">
      
      
              <div className="relative">
              <img src={user.profilePicture} alt="Profile" className="w-48 h-48 rounded-full"/>
             
              {/* ส่วน modal update รูปภาพ  */}
              <button className="absolute bottom-0 right-0 bg-transparent border-none cursor-pointer" onClick={()=>document.getElementById('my_modal_1').showModal()}>
              <img src={editIcon} className="w-10 h-10" alt="editIcon" /></button>
                  <dialog id="my_modal_1" className="modal">
                  <div className="modal-box">

                  <h2 className="text-salmon font-bold text-2xl mb-5">Add New Profile Picture</h2>
                  <img src={ProfileImg || ProfileURL} alt="venom-PROFILE" className="rounded-lg w-full h-auto" />
                  <div className="field-value-pair mt-5">
                  <labels>Enter image URL : </labels> 
                  <input type="text" name="profilePicture" placeholder="image URL" value={ProfileImg} onChange={(ev) => setProfileImg(ev.target.value)}  className="bg-white border border-gray-300 p-5 mb-10 ml-10" />
                    
                  </div>
                   
                  <div className="modal-action">
                  <button onClick={submitIMG} className="btn hover:btn-success" disabled={!ProfileImg}>
                        Update
                  </button>
                  <form method="dialog">
                   {/* if there is a button in form, it will close the modal */}
                   <button className="btn btn-circle hover:btn-error">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                    </button>
                  </form>
                  </div>
                  </div>
                  </dialog>
              </div>
        

        
             <div className=" w-1/2 text-white font-bold text-2xl max-sm:hidden">
               <h1>Welcome, {user.userName}</h1>
              </div>
           </div>
       </div>

      {/* ส่วนด้านล่าง */}
      <div className="bg-white p-4 rounded-b-lg pt-20 md:flex md:flex-row">
        <div className="md:flex-1">
          <h2 className="text-salmon font-bold text-2xl mb-5 text-center md:text-left max-sm:hidden">PERSONAL INFO</h2>
          <h2 className="text-salmon font-bold text-2xl mb-5 text-center md:text-left sm:hidden ">Welcome, {user.userName}</h2>
          <h2 className="text-white font-bold text-2xl text-center sm:hidden">Welcome, {user.userName}</h2>

          <div className="field-value-pair">
            <p>
              <span className="text-black">First name</span>
              <span className="text-salmon"> {user.firstName || "please add via edit button"}</span>
            </p>
            <p>
              <span className="text-black">Last name</span>
              <span className="text-salmon"> {user.lastName || "please add via edit button"}</span>
            </p>
            <p>
              <span className="text-black">Gender</span>
              <span className="text-salmon"> {user.gender || "please add via edit button"}</span>
            </p>
            <p>
              <span className="text-black">Birthday</span>
              <span className="text-salmon"> {user.birthday || "please add via edit button"}</span>
            </p>
            <p>
              <span className="text-black">Email</span>
              <span className="text-salmon"> {user.email}</span>
            </p>
            <p>
              <span className="text-black">Height</span>
              <span className="text-salmon"> {user.height ? user.height + " (cm)" : "(cm) please add via edit button"}</span>
            </p>
            <p>
              <span className="text-black">Weight</span>
              <span className="text-salmon"> {user.weight ? user.weight + " (kg)" : "(kg) please add via edit button"}</span>
            </p>
          </div>

          <Link to="/edit-profile">
            <button className="bg-salmon hover:bg-blue-700 text-white font-bold py-2 px-4 rounded block mx-auto md:mx-0 md:mt-5">Edit</button>
          </Link>
        </div>

        <div className="md:flex-1 ">
          {/* <p>
            <span className="text-black">Daily Calories</span>
            <br />
            <span className="text-salmon"> {user.dailyCalories || `please set your daily goal`}</span>
          </p>
          <p>
            <span className="text-black">BMI</span>
            <br />
            <span className="text-salmon"> {user.weight / (user.height / 100) ** 2 || `please set your weight and height`}</span>
          </p> */}
          <p>
            <span className="text-black">Total time exercised</span>
            <br />
            <span className="text-salmon"> {user.exerciseTime}</span>
          </p>
          {/* <p>
            <span className="text-black">Total time exercised(live)</span>
            <br />
            <span className="text-salmon"> {user.liveExerciseTime}</span>
          </p> */}
          <p>
            <span className="text-black">Total calories burned</span>
            <br />
            <span className="text-salmon"> {user.caloriesBurned}</span>
          </p>
          {/* <p>
            <span className="text-black">Total calories burned(live)</span>
            <br />
            <span className="text-salmon"> {user.liveCaloriesBurned}</span>
          </p> */}
        </div>
      </div>
    </div>
  );
};

export default Profile;
