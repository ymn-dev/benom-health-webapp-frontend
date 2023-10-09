import React, { useEffect, useState } from "react";
import { useLoginContext } from "../../Context/LoginContext";
import { Link } from "react-router-dom";
import editIcon from "../../assets/edit-svgrepo-com.svg";

const EditProfile = () => {
  const { login, user, setUser } = useLoginContext();
  //these are the only field we let them edit
  const [editUser, setEditUser] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProfilePicture, setNewProfilePicture] = useState("");

  const submitHandler = (ev) => {
    ev.preventDefault();
    // ใช้ URL รูปภาพใหม่จาก state ในการอัปเดต editUser
    setUser({ ...user, ...editUser, profilePicture: newProfilePicture });
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

  const editButtonStyle = {
    position: "absolute",
    bottom: "0",
    right: "0",
    backgroundColor: "transparent",
    border: "none",
    cursor: "pointer",
  };

  const editIconStyle = {
    width: "30px",
    height: "30px",
  };

  return (
    <form onSubmit={submitHandler}>
      <div className="md:w-1/2 mx-auto">
        <div className="bg-salmon p-4  rounded-t-lg ">
          <div className="flex justify-between items-center">
            <div className="relative">
              <img src={user.profilePicture} alt="Profile" style={profileImageStyle} />
              {/* แสดงปุ่มและเปิด modal เมื่อกด */}
              <button type="button" onClick={() => setIsModalOpen(true)} style={editButtonStyle}>
                <img src={editIcon} style={editIconStyle} alt="editIcon" />
              </button>
            </div>
            <div className="text-white font-bold text-2xl">
              <h1>Edit your Profile Here</h1>
            </div>
          </div>
        </div>

        {/* แสดง modal เมื่อ isModalOpen เป็น true */}
        {isModalOpen && (
          <div className="bg-white p-4 rounded-b-lg pt-5 md:flex md:flex-row">
            <div className="md:flex-1">
              {/* ให้ผู้ใช้กรอก URL รูปภาพใหม่ */}
              <h2 className="text-salmon font-bold text-2xl mb-5">Add New Profile Picture</h2>
              <div className="field-value-pair">
                <p>
                  <input type="url" name="profilePicture" placeholder="New image URL here" value={newProfilePicture} onChange={(ev) => setNewProfilePicture(ev.target.value)} style={inputStyle} />
                </p>
              </div>

              {/* ปุ่ม "Save" และ "Cancel" ใน modal */}
              <div>
                <button type="submit" className="bg-salmon hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-5">
                  Save
                </button>
                <button type="button" onClick={() => setIsModalOpen(false)} className="bg-salmon hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-5 ml-5">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white p-4 rounded-b-lg pt-5 md:flex md:flex-row">
          <div className="md:flex-1">
            <h2 className="text-salmon font-bold text-2xl mb-5">PERSONAL INFO</h2>
            <div className="field-value-pair">
              <p>
                <span className="text-black">First name</span>
                <input
                  type="text"
                  placeholder={"Add first name" || user.firstName}
                  name="firstName"
                  id="firstName"
                  onChange={(ev) => {
                    setEditUser({ ...editUser, [ev.target.name]: ev.target.value });
                  }}
                  style={inputStyle}
                />
              </p>
              <p>
                <span className="text-black">Last name</span>
                <input
                  type="text"
                  placeholder={"Add last name" || user.lastName}
                  name="lastName"
                  id="lastName"
                  onChange={(ev) => {
                    setEditUser({ ...editUser, [ev.target.name]: ev.target.value });
                  }}
                  style={inputStyle}
                />
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
                          setEditUser({ ...editUser, [ev.target.name]: ev.target.value });
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
                          setEditUser({ ...editUser, [ev.target.name]: ev.target.value });
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
                    onChange={(ev) => {
                      setEditUser({ ...editUser, [ev.target.name]: ev.target.value });
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
                  onChange={(ev) => {
                    setEditUser({ ...editUser, [ev.target.name]: ev.target.value });
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
                  onChange={(ev) => {
                    setEditUser({ ...editUser, [ev.target.name]: ev.target.value });
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
