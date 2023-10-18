import React, { useEffect, useState } from "react";
import { useLoginContext } from "../../Context/LoginContext";
import { Link,useNavigate } from "react-router-dom";
import axios from "axios";
import venom from "../../assets/venom-about.png"
import Loading from "../Layout/Loading";
import defaultPicture from "../../assets/Emily_profile_icon.png";
import alert from "../../assets/alert.png"


const EditProfile = () => {
  const { login, user, setUser } = useLoginContext();
  //these are the only field we let them edit
  // const [editUser, setEditUser] = useState({});
  

  const [reload, setReload] = useState(false);
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [gender, setgender] = useState("");
  const [birthday, setbirthday] = useState("");
  const [height, setheight] = useState("");
  const [weight, setweight] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
   // ส่วนต่อ backend 
  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://benom-backend.onrender.com/users/${user._id}`, { headers: user.headers });
        setLoading(false);
        const { firstName,lastName,gender,birthday,height,weight } = response.data.data;
        setUser({ ...user, firstName,lastName,gender,birthday,height,weight});
      } catch (error) {
        console.error("Error update User", error);
      }
    };

    getData();
  }, [reload]);

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
      setLoading(true);
      const response = await axios.patch(`https://benom-backend.onrender.com/users/${user._id}`, dataUser ,{ headers: user.headers });
      setLoading(false);
      if (response.status === 200) {
        setReload(!reload);
        navigate("/profile");
       
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



  return (
    
    <div className="bg-dark-blue pt-20 pb-20">
      <Loading loading={loading} />
    <form onSubmit={submitHandler}>
      <div className="md:w-1/2 mx-auto">
        <div className="bg-dark-sea  rounded-t-lg ">
          <div className="flex justify-between items-center">

        
            <div className="relative left-1/2 top-20 transform -translate-x-1/2  lg:left-1/4">
              <img src={user.profilePicture || defaultPicture} alt="Profile" className="w-48 h-48 rounded-full" />
            </div>
            {/* ส่วนขวาบน */}
            <div className="w-1/2 text-white font-bold text-2xl hidden lg:flex">
              <h1>Edit your Profile Here</h1>
            </div>
          </div>
        </div>

        
        {/* ส่วนล่าง  */}
        <div className="bg-white p-10  rounded-b-lg  md:flex md:flex-row">
          <div className="md:flex-1">
            <h2 className="text-dark-sea font-bold text-2xl mb-5 mt-16 text-center md:text-left">PERSONAL INFO</h2>
            <div className="field-value-pair">
              <p className="mb-2 mt-1">
                <span className="text-black">First name</span>
                {user.firstName ? (
                  <span className="text-dark-sea ml-3">{user.firstName}</span>
                ) : (
                  <>
                <input
                  type="text"
                  placeholder={"first name" || user.firstName}
                  name="firstName"
                  id="firstName"
                  value={firstName}
                  onChange={(ev) => {
                    setfirstName(ev.target.value);
                  }}
                  className="bg-white border border-dark-sea p-1 mb-2  ml-2 lg:ml-5"
                  
                /> 
                <span className="tooltip " data-tip="Add first name only once time">
                <img src={alert} className="w-6 h-6 ml-2 mt-3" alt="alert" />
                </span>
                </>
                )}
                
              </p>
              <p className="mb-2 mt-1">
                <span className="text-black">Last name</span>
                {user.lastName ? (
                  <span className="text-dark-sea ml-3">{user.lastName}</span>
                ) : (
                  <>
                <input
                  type="text"
                  placeholder={"last name" || user.lastName}
                  name="lastName"
                  id="lastName"
                  value={lastName}
                  onChange={(ev) => {
                    setlastName(ev.target.value);
                  }}
                  className="bg-white border border-dark-sea p-1 mb-1  ml-2 lg:ml-5"
                />
                <span className="tooltip " data-tip="Add last name only once time">
                <img src={alert} className="w-6 h-6 ml-2 mt-3" alt="alert" />
                </span>
                </>
                )}
                
              </p>
              <p className="mb-2 mt-1">
                <span className="text-black mr-5 ">Gender</span>
                {user.gender ? (
                  <span className="text-dark-sea ml-3 ">{user.gender}</span>
                ) : (
                  <>
                    <label>
                      <input
                        type="radio"
                        name="gender"
                        value="Male"
                        className="ml-4 "
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
                        className="ml-3"
                        onChange={(ev) => {
                          setgender(ev.target.value);
                        }}
                      />
                      Female
                    </label>
                    <span className="tooltip " data-tip="Add gender only once time">
                     <img src={alert} className="w-6 h-6 ml-2 mt-3" alt="alert" />
                    </span>
                  </>
                )}
              </p>
              <p>
                <span className="text-black">Birthday</span>
                {user.birthday ? (
                  <span className="text-dark-sea ml-6">{user.birthday}</span>
                ) : (
                  <>
                  <input
                    type="date"
                    name="birthday"
                    id="birthday"
                    placeholder={"Add birthday only once time"}
                    value={birthday}
                    onChange={(ev) => {
                      setbirthday(ev.target.value);
                    }}
                    className="bg-white border border-dark-sea p-1 mb-1  ml-6 lg:ml-8"
                  />
                  <span className="tooltip mt-3" data-tip="Add birthday only once time">
                    <img src={alert} className="w-6 h-6 ml-2 mt-3 " alt="alert" />
                  </span>
                </>
                )}
              </p>
              <p className="mb-2 mt-1">
                <span className="text-black">Email</span>
                <span className="text-dark-sea ml-12">{user.email}</span>
              </p>
              <p className="mb-2 mt-1">
                <span className="text-black">Height</span>
                <input
                  type="number"
                  name="height"
                  id="height"
                  placeholder="Height (cm)"
                  value={height}
                  min={0}
                  onChange={(ev) => {
                    setheight(ev.target.value);
                  }}
                  className="bg-white border border-dark-sea p-1 mb-1 ml-9 lg:ml-10"
                />
              </p>
              <p className="mb-2 mt-1">
                <span className="text-black">Weight</span>
                <input
                  type="number"
                  name="weight"
                  id="weight"
                  placeholder="Weight (kg)"
                  
                  value={weight}
                  min={0}
                  onChange={(ev) => {
                    setweight(ev.target.value);
                  }}
                  className="bg-white border border-dark-sea p-1 mb-1  ml-8 lg:ml-9"
                />
              </p>
              
            </div>

            {/* <Link to="/profile"> */}
            <button type="submit" className="bg-dark-sea hover:bg-dark-blue text-white font-bold py-2 px-4 rounded mt-5">
              Save
            </button>
            {/* </Link> */}

            <Link to="/profile">
              <button className="bg-dark-sea hover:bg-dark-blue text-white font-bold py-2 px-4 rounded mt-5 ml-5">Back</button>
            </Link>
          </div>
           
           {/* ส่วนขวา */}
          <div className="md:flex-1 hidden lg:flex">
            <img src={venom} alt="venomimg-right-profile" /> 
            
          </div>
        </div>
      </div>
    </form>
    </div>
  );
};

export default EditProfile;
