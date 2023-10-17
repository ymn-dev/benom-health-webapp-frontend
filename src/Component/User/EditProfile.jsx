import React, { useEffect, useState } from "react";
import { useLoginContext } from "../../Context/LoginContext";
import { Link } from "react-router-dom";
import editIcon from "../../assets/edit-svgrepo-com.svg";
import axios from "axios";

const EditProfile = () => {
  const { login, user, setUser } = useLoginContext();
  //these are the only field we let them edit
  // const [editUser, setEditUser] = useState({});
  
  // const [ProfileImg, setProfileImg] = useState("");
  // const [ProfileURL, setProfileURL] = useState("https://i.ibb.co/mHF9LZZ/venom-Cheese.png");
  const [reload, setReload] = useState(false);
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [gender, setgender] = useState("");
  const [birthday, setbirthday] = useState("");
  const [height, setheight] = useState("");
  const [weight, setweight] = useState("");

  
   // ส่วนต่อ backend 
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`https://benom-backend.onrender.com/users/${user._id}`, { headers: user.headers });
        const { /*profilePicture,*/firstName,lastName,gender,birthday,height,weight } = response.data.data;
        setUser({ ...user,/*profilePicture,*/ firstName,lastName,gender,birthday,height,weight});
      } catch (error) {
        console.error("Error update User", error);
      }
    };

    getData();
  }, [reload]);

  // const submitIMG = async (ev) => {
  //   ev.preventDefault();
  //   if (!ProfileImg) return;

  //   try {
  //     const response = await axios.patch(`https://benom-backend.onrender.com/users/${user._id}`, {profilePicture: ProfileImg},{ headers: user.headers });
  //     if (response.status === 200) {
  //       setReload(!reload);
       
  //     }
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  const submitHandler = async (ev) => {
    ev.preventDefault();
    const dataUser = {
      ...user,
      firstName,
      lastName,
      gender,
      birthday,
      height,
      weight,
    };
    
    // setUser({ ...user, ...editUser, profilePicture: ProfileImg });
    try {
      const response = await axios.patch(`https://benom-backend.onrender.com/users/${user._id}`, dataUser ,{ headers: user.headers });
      if (response.status === 200) {
        setReload(!reload);
       
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (!login) {
    return (
      <h1>
        Please <Link to={"/signin"}>Login</Link>
      </h1>
    );
  }

  const profileImageStyle = {
    width: "200px",
    height: "200px",
    borderRadius: "50%",
  };

  const inputStyle = {
    backgroundColor: "white",
    border: "1px solid #ccc",
    padding: "5px",
    marginBottom: "10px",
    marginLeft: "10px",
  };

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
    <form onSubmit={submitHandler}>
      <div className="md:w-1/2 mx-auto">
        <div className="bg-salmon p-4  rounded-t-lg ">
          <div className="flex justify-between items-center">

        
            <div className="relative">
              <img src={user.profilePicture} alt="Profile" className="w-48 h-48 rounded-full" />
             
              {/* ส่วน modal update รูปภาพ 
              <button style={editButtonStyle} onClick={()=>document.getElementById('my_modal_1').showModal()}>
              <img src={editIcon} style={editIconStyle} alt="editIcon" /></button>
                  <dialog id="my_modal_1" className="modal">
                  <div className="modal-box">

                  <h2 className="text-salmon font-bold text-2xl mb-5">Add New Profile Picture</h2>
                  <img src={ProfileImg || ProfileURL} alt="venom-PROFILE" className="rounded-lg w-full h-auto" />
                  <div className="field-value-pair mt-5">
                  <labels>Enter image URL : </labels> 
                  <input type="text" name="profilePicture" placeholder="image URL" value={ProfileImg} onChange={(ev) => setProfileImg(ev.target.value)} style={inputStyle} />
                    
                  </div>
                   
                  <div className="modal-action">
                  <button onClick={submitIMG} className="btn hover:btn-success" disabled={!ProfileImg}>
                        Update
                  </button>
                  <form method="dialog">
                   if there is a button in form, it will close the modal
                   <button className="btn btn-circle hover:btn-error">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                    </button>
                  </form>
                  </div>
                  </div>
                  </dialog> */}
              </div>
            <div className="text-white font-bold text-2xl">
              <h1>Edit your Profile Here</h1>
            </div>
          </div>
        </div>

        

        <div className="bg-white p-4 rounded-b-lg pt-5 md:flex md:flex-row">
          <div className="md:flex-1">
            <h2 className="text-salmon font-bold text-2xl mb-5">PERSONAL INFO</h2>
            <div className="field-value-pair">
              <p>
                <span className="text-black">First name</span>
                {user.firstName ? (
                  <span className="text-salmon">{user.firstName}</span>
                ) : (
                <input
                  type="text"
                  placeholder={"Add first name only once time" || user.firstName}
                  name="firstName"
                  id="firstName"
                  value={firstName}
                  onChange={(ev) => {
                    setfirstName(ev.target.value);
                  }}
                  style={inputStyle}
                />
                )}
              </p>
              <p>
                <span className="text-black">Last name</span>
                {user.lastName ? (
                  <span className="text-salmon">{user.lastName}</span>
                ) : (
                <input
                  type="text"
                  placeholder={"Add last name only once time" || user.lastName}
                  name="lastName"
                  id="lastName"
                  value={lastName}
                  onChange={(ev) => {
                    setlastName(ev.target.value);
                  }}
                  style={inputStyle}
                />
                )}
              </p>
              <p>
                <span className="text-black mr-5 ">Gender</span>
                {user.gender ? (
                  <span className="text-salmon">{user.gender}</span>
                ) : (
                  <>
                    <label>
                      <input
                        type="radio"
                        name="gender"
                        value="Male"
                        onChange={(ev) => {
                          setgender(ev.target.value);
                        }}
                      />
                      Male
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="gender"
                        value="Female"
                        onChange={(ev) => {
                          setgender(ev.target.value);
                        }}
                      />
                      Female
                    </label>
                  </>
                )}
              </p>
              <p>
                <span className="text-black">Birthday</span>
                {user.birthday ? (
                  <span className="text-salmon">{user.birthday}</span>
                ) : (
                  <input
                    type="date"
                    name="birthday"
                    id="birthday"
                    placeholder={"Add birthday only once time"}
                    value={birthday}
                    onChange={(ev) => {
                      setbirthday(ev.target.value);
                    }}
                    style={inputStyle}
                  />
                )}
              </p>
              <p>
                <span className="text-black">Email</span>
                <span className="text-salmon">{user.email}</span>
              </p>
              <p>
                <span className="text-black">Height</span>
                <input
                  type="number"
                  name="height"
                  id="height"
                  placeholder="Height (cm)"
                  value={height}
                  onChange={(ev) => {
                    setheight(ev.target.value);
                  }}
                  style={inputStyle}
                />
              </p>
              <p>
                <span className="text-black">Weight</span>
                <input
                  type="number"
                  name="weight"
                  id="weight"
                  placeholder="Weight (kg)"
                  value={weight}
                  onChange={(ev) => {
                    setweight(ev.target.value);
                  }}
                  style={inputStyle}
                />
              </p>
              
            </div>

            {/* <Link to="/profile"> */}
            <button type="submit" className="bg-salmon hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-5">
              Save
            </button>
            {/* </Link> */}

            <Link to="/profile">
              <button className="bg-salmon hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-5 ml-5">Back</button>
            </Link>
          </div>

          <div className="md:flex-1 mt-6">
            {/* <p>
              <span className="text-black">Daily Calories</span>
              <br />
              <span className="text-salmon">{``}</span>
            </p>
            <p>
              <span className="text-black">BMI</span>
              <br />
              <span className="text-salmon">{(user.weight && user.height) && user.weight / (user.height / 100) ** 2 }</span>
            </p> */}
            <p>
              <span className="text-black">Total time exercised</span>
              <br />
              <span className="text-salmon">{user.exerciseTime}</span>
            </p>
            {/* <p>
              <span className="text-black">Total time exercised(live)</span>
              <br />
              <span className="text-salmon">{user.liveExercseTime}</span>
            </p> */}
            <p>
              <span className="text-black">Total calories burned</span>
              <br />
              <span className="text-salmon">{user.caloriesBurned}</span>
            </p>
            {/* <p>
              <span className="text-black">Total calories burned(live)</span>
              <br />
              <span className="text-salmon">{user.liveCaloriesBurned}</span>
            </p> */}

          </div>
        </div>
      </div>
    </form>
  );
};

export default EditProfile;
