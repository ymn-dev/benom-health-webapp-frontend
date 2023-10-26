import React, { useEffect, useState } from "react";
import { useLoginContext } from "../../Context/LoginContext";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import editIcon from "../../assets/edit-svgrepo-com.svg";
import venom from "../../assets/venom-about.png";
import defaultPicture from "../../assets/Emily_profile_icon.png";
import Loading from "../Layout/Loading";

const Profile = () => {
  const { login, user, setUser, setLogin } = useLoginContext();
  const navigate = useNavigate();
  if (!login) {
    navigate("/signin");
  }

  const [ProfileImg, setProfileImg] = useState("");
  const [ProfileURL, setProfileURL] = useState("https://i.ibb.co/mHF9LZZ/venom-Cheese.png");
  const [reload, setReload] = useState(false);
  const [loading, setLoading] = useState(false);
  // ส่วนต่อ backend
  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://benom-backend.onrender.com/users/${user._id}`, { headers: user.headers });
        setLoading(false);
        const { profilePicture, firstName, lastName, gender, birthday, height, weight } = response.data.data;
        setUser({
          ...user,
          profilePicture,
          firstName,
          lastName,
          gender,
          birthday,
          height,
          weight,
        });
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
      setLoading(true);
      const response = await axios.patch(`https://benom-backend.onrender.com/users/${user._id}`, { profilePicture: ProfileImg }, { headers: user.headers });
      setLoading(false);
      if (response.status === 200) {
        setUser({ ...user, profilePicture: ProfileImg });
        document.getElementById("my_modal_5").close();
        setReload(!reload);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const DeleteHandler = async () => {
    try {
      setLoading(true);
      const response = await axios.delete(`https://benom-backend.onrender.com/users/${user._id}`, { headers: user.headers });
      setLoading(false);
      if (response.status === 200) {
        setUser({});
        setLogin(false);
        localStorage.removeItem("user");
        document.getElementById("my_modal_1").close();
        navigate("/");
      }
    } catch (error) {
      setLoading(false);
      alert(error.response.data.error);
      console.error("Error deleting user", error);
    }
  };

  return (
    <div className="bg-dark-blue pt-20 pb-20 min-h-screen">
      <div className="lg:px-20">
        <div className="bg-dark-sea rounded-t-lg">
          <div className="flex justify-between items-center">
            <div className="relative left-1/2 top-20 transform -translate-x-1/2  lg:left-1/4">
              <img src={user.profilePicture || defaultPicture} alt="Profile" className="w-48 h-48 rounded-full" />

              {/* ส่วน modal update รูปภาพ  */}
              <button className="absolute bottom-0 right-0 bg-transparent border-none cursor-pointer" onClick={() => document.getElementById("my_modal_5").showModal()}>
                <img src={editIcon} className="w-10 h-10" alt="editIcon" />
              </button>
              <dialog id="my_modal_5" className="modal">
                <div className="modal-box">
                  <Loading loading={loading} />
                  <h2 className="text-dark-sea font-bold text-2xl mb-5">Add New Profile Picture</h2>
                  <img src={ProfileImg || ProfileURL} alt="venom-PROFILE" className="rounded-lg w-full h-auto" />
                  <div className="field-value-pair mt-5">
                    <labels>Enter image URL : </labels>
                    <input type="text" name="profilePicture" placeholder="image URL" value={ProfileImg} onChange={(ev) => setProfileImg(ev.target.value)} className="bg-white border border-gray-300 p-5 mb-10 ml-10" />
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
            {/* ส่วน Welcome */}
            <div className=" w-1/2 text-white font-bold text-2xl hidden lg:flex">
              <h1>Welcome, {user.userName}</h1>
            </div>
          </div>
        </div>

        {/* ส่วนด้านล่าง */}
        <div className="bg-white rounded-b-lg md:flex md:flex-row pl-48 py-10">
          <div className="md:flex-1">
            <h2 className="text-dark-sea font-bold text-2xl mb-5 mt-16 text-center md:text-left ">PERSONAL INFO</h2>

            <div className="field-value-pair">
              <p className="mb-2 mt-1">
                <span className="text-black">First name</span>
                <span className="text-dark-sea ml-3"> {user.firstName || "please add via edit button"}</span>
              </p>
              <p className="mb-2 mt-1">
                <span className="text-black">Last name</span>
                <span className="text-dark-sea ml-3"> {user.lastName || "please add via edit button"}</span>
              </p>
              <p className="mb-2 mt-1">
                <span className="text-black">Gender</span>
                <span className="text-dark-sea ml-8"> {user.gender || "please add via edit button"}</span>
              </p>
              <p className="mb-2 mt-1">
                <span className="text-black">Birthday</span>
                <span className="text-dark-sea ml-6"> {user.birthday || "please add via edit button"}</span>
              </p>
              <p className="mb-2 mt-1">
                <span className="text-black">Email</span>
                <span className="text-dark-sea ml-11"> {user.email}</span>
              </p>
              <p className="mb-2 mt-1">
                <span className="text-black">Height</span>
                <span className="text-dark-sea ml-8"> {user.height ? user.height + " (cm)" : "(cm) please add via edit button"}</span>
              </p>
              <p className="mb-2 mt-1">
                <span className="text-black">Weight</span>
                <span className="text-dark-sea ml-7"> {user.weight ? user.weight + " (kg)" : "(kg) please add via edit button"}</span>
              </p>
            </div>

            <div className="flex">
              <Link to="/edit-profile">
                <button className="justify-center bg-dark-sea hover:bg-dark-blue text-white font-bold py-2 px-4 rounded block mx-auto  md:mx-0 mt-5 ">Edit</button>
              </Link>

              {/* ส่วน Delete botton   */}

              <button onClick={() => document.getElementById("my_modal_1").showModal()} className="bg-dark-sea hover:bg-dark-blue text-white font-bold py-2 px-4 rounded mt-5 ml-5">
                Delete
              </button>
              {/* ส่วน modal  */}
              <dialog id="my_modal_1" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                  <h2 className="text-dark-sea font-bold text-2xl mb-5">Confirm delete</h2>
                  <p className="">Are you sure to delete this user?</p>
                  <div className="field-value-pair mt-5">{/* Field-value pairs can be added here */}</div>
                  <div className="modal-action">
                    <button onClick={DeleteHandler} className="btn hover:btn-error">
                      Delete
                    </button>
                    <form method="dialog">
                      <button className="btn btn-circle hover:btn-success">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </form>
                  </div>
                </div>
              </dialog>
            </div>
          </div>

          {/* ส่วนด้านขวา  */}
          <div className="">
            <img src={venom} alt="venomimg-right-profile" width={500} className="md:flex-1 hidden lg:flex mr-40" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
