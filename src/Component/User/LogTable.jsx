import { React, useState } from "react";
import axios from "axios";
import { useLoginContext } from "../../Context/LoginContext";
import alert from "../../assets/alert.png";
import ReactPaginate from "react-paginate";
import ExerciseChoices from "../Exercises/exercises";
import Loading from "../Layout/Loading";

const LogTable = ({ ExerciseLog, reload, setReload }) => {
  //paginate
  const [loading, setLoading] = useState(false);
  const itemsPerPage = 9;
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = ExerciseLog.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(ExerciseLog.length / itemsPerPage);
  const handlePageClick = (ev) => {
    const newOffset = (ev.selected * itemsPerPage) % ExerciseLog.length;
    setItemOffset(newOffset);
  };
  const { user } = useLoginContext();
  const [selectedModal, setSelectedModal] = useState({});
  const [editModal, setEditModal] = useState({});
  const [durationHour, setDurationHour] = useState("");
  const [durationMinute, setDurationMinute] = useState("");

  const DeleteHandler = async (id) => {
    try {
      setLoading(true);
      const response = await axios.delete(`https://benom-backend.onrender.com/users/${user._id}/activities/${id}`, { headers: user.headers });
      setLoading(false);

      if (response.status === 200) {
        setReload(!reload);
      }
    } catch (error) {
      console.error("Error deleting activity", error);
    }
  };

  const revertName = (str) => {
    const [type, exercise] = str.split(":");
    const exerciseArr = exercise.split("-");
    const reverted = exerciseArr
      .map((word) => {
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(" ");
    return `${type}: ${reverted}`;
  };

  //ปุ่มชั่วโมง
  const [selectedHour, setSelectedHour] = useState("");
  const hours = Array.from({ length: 24 }, (_, i) => (i < 10 ? `0${i}` : `${i}`));

  //ปุ่มนาที
  const [selectedMinute, setSelectedMinute] = useState("00");
  const minutes = Array.from({ length: 60 }, (_, i) => (i < 10 ? `0${i}` : `${i}`));

  //Upload Image ด้วย URL
  const [imageUrl, setImageUrl] = useState(""); // User Input
  const [tempImageUrl, setTempImageUrl] = useState("https://i.ibb.co/ck92yGC/Screenshot-2023-10-20-225703.png"); // Default

  const [selectedOption1, setSelectedOption1] = useState("");
  const [selectedOption2, setSelectedOption2] = useState("");
  const [options2, setOptions2] = useState([]);

  const options1 = [];
  for (const ExerciseType in ExerciseChoices) {
    options1.push({ label: ExerciseType, value: ExerciseType });
  }
  const [newCalories, setNewCalories] = useState(null);
  const handleDropdown1Change = (event, option = null) => {
    const selectedValue = option ? option : event.target.value;
    setSelectedOption2("");
    setSelectedOption1(selectedValue);

    if (selectedValue in ExerciseChoices) {
      const newOptions2 = [];
      for (const subtype in ExerciseChoices[selectedValue]) {
        newOptions2.push({ label: ExerciseChoices[selectedValue][subtype], value: subtype });
      }
      setOptions2(newOptions2);
    } else {
      setOptions2([]);
    }
  };
  const handleSaveEdit = async (ev) => {
    ev.preventDefault();
    const { startTime, duration, exerciseName, calories, id, ...data } = editModal;
    data._id = id;
    data.duration = durationHour * 60 + durationMinute;
    data.startTime = selectedHour + ":" + selectedMinute;
    data.exerciseName = selectedOption1 + ":" + selectedOption2;
    if (newCalories) {
      data.calories = newCalories;
    }
    console.log(data);
    try {
      setLoading(true);
      const response = await axios.patch(`https://benom-backend.onrender.com/users/${user._id}/activities/${id}`, data, { headers: user.headers });
      setLoading(false);
      console.log(response);
      if (response.status === 200) {
        setReload(!reload);
      }
    } catch (err) {
      console.error("Error editing activity", err);
    }
  };

  return (
    <>
      {/* Table log Data  */}

      <div className="my-4 xl:mx-10 mx-5 border border-dark-blue rounded-t-3xl ">
        {/*container mx-auto max-w-screen-lg*/}
        <table className="w-full bg-dark-blue text-white rounded-t-3xl ">
          <thead className=" ">
            <tr className="py-4 ">
              <th className="xl:w-3/12 w-3/12 text-center font-bold uppercase text-white">Activity</th>
              <th className="xl:w-2/12 w-2/12 text-center font-bold uppercase text-white">Date</th>
              <th className="xl:w-2/12 w-2/12 text-center font-bold uppercase text-white">Start-Time</th>
              <th className="xl:w-2/12 w-2/12 text-center font-bold uppercase text-white">Duration</th>
              <th className="xl:w-1/12 w-1/12 text-center font-bold uppercase text-white">
                Calories
                <br />
                (kcals)
              </th>
              <th className="xl:w-2/12 w-2/12 text-center font-bold uppercase text-white"></th>
            </tr>
          </thead>

          <tbody className="">
            {currentItems.map((Log, index) => (
              <tr key={Log._id} className={`${index % 2 === 1 ? "bg-sea-blue" : "bg-white"}`}>
                <td className="xl:w-3/12 w-3/12 text-center text-black">{revertName(Log.exerciseName)}</td>
                <td className="xl:w-2/12 w-2/12 text-center text-black">{Log.date.split("T")[0]}</td>
                <td className="xl:w-2/12 w-2/12 text-center text-black">{Log.startTime}</td>
                <td className="xl:w-2/12 w-2/12 text-center text-black">{`${Log.duration >= 60 ? `${Math.floor(Log.duration / 60)} hr ${Math.round(Log.duration % 60)} m` : `${Math.round(Log.duration % 60)} min`}`}</td>
                <td className="xl:w-1/12 w-1/12 text-center text-black">{Math.round(Log.calories)}</td>

                {/*ปุ่ม VIEW DETAIL*/}
                <td className="xl:w-2/12 w-2/12 text-center text-black py-2">
                  <button
                    className="btn btn-warning border-black"
                    onClick={() => {
                      document.getElementById("my_modal_5").showModal();
                      setSelectedModal({
                        ...selectedModal,
                        id: Log._id,
                        picture: Log.picture,
                        exerciseName: Log.exerciseName,
                        date: Log.date.split("T")[0],
                        startTime: Log.startTime,
                        duration: Log.duration,
                        weight: Log.weight,
                        calories: Log.calories,
                      });

                      setSelectedHour("");
                      setSelectedMinute("");
                      setDurationHour(0);
                      setDurationMinute(0);
                    }}>
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
          {/*view only Modal*/}
          <h3 className="text-xl font-bold text-center pb-5">View Details</h3>
          <img src={selectedModal.picture || "https://i.ibb.co/ck92yGC/Screenshot-2023-10-20-225703.png"} className="rounded-lg" />

          <div className="text-xl w-full flex py-3">
            <span className=" w-3/12 text-right">Activity: </span> <span className="pl-4 text-xl text-black bg-sea-blue border border-slate-300 rounded-lg w-9/12">{selectedModal.exerciseName && revertName(selectedModal.exerciseName)}</span>
          </div>
          <div className="text-xl w-full flex py-3">
            <span className=" w-3/12 text-right">Date: </span> <span className="pl-4 text-xl text-black bg-sea-blue border border-slate-300 rounded-lg w-9/12">{selectedModal.date && selectedModal.date.split("T")[0]}</span>
          </div>
          <div className="text-xl w-full flex py-3">
            <span className=" w-3/12 text-right">Start-Time: </span> <span className="pl-4 text-xl text-black bg-sea-blue border border-slate-300 rounded-lg w-9/12">{selectedModal.startTime}</span>
          </div>
          <div className="text-xl w-full flex py-3">
            <span className=" w-3/12 text-right">Duration: </span>{" "}
            <span className="pl-4 text-xl text-black bg-sea-blue border border-slate-300 rounded-lg w-9/12">{`${
              selectedModal.duration >= 60 ? `${Math.floor(selectedModal.duration / 60)} hr ${Math.round(selectedModal.duration % 60)} min` : `${Math.round(selectedModal.duration % 60)} min`
            }`}</span>
          </div>
          <div className="text-xl w-full flex py-3">
            <span className=" w-3/12 text-right">Calories: </span> <span className="pl-4 text-xl text-black bg-sea-blue border border-slate-300 rounded-lg w-9/12">{`${Math.round(selectedModal.calories)} kcals`}</span>
          </div>

          <div className="modal-action">
            <div>
              <button
                className="btn btn-active hover:btn-warning"
                onClick={() => {
                  document.getElementById("my_modal_3").showModal();
                  setEditModal(selectedModal);
                  setSelectedOption1(selectedModal.exerciseName.split(":")[0]);
                  handleDropdown1Change(null, selectedModal.exerciseName.split(":")[0]);
                  setSelectedOption2(selectedModal.exerciseName.split(":")[1]);
                  setSelectedHour(selectedModal.startTime.split(":")[0]);
                  setSelectedMinute(selectedModal.startTime.split(":")[1]);
                  setDurationHour(Math.floor(selectedModal.duration / 60));
                  setDurationMinute(selectedModal.duration % 60);
                  document.getElementById("my_modal_5").close();
                }}>
                Edit Details
              </button>
              {/*Edit Modal*/}
            </div>

            <td>
              <button className="btn btn-active hover:btn-error hover:text-white" onClick={() => DeleteHandler(selectedModal.id)}>
                Delete
              </button>
            </td>
          </div>
        </div>
      </dialog>
      <dialog id="my_modal_3" className="modal modal-bottom sm:modal-middle">
        <Loading loading={loading} />
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>

          <h3 className="text-xl font-bold text-center pb-5">Edit Details</h3>

          {/*Upload Image*/}
          <img src={editModal.picture || (selectedModal.picture ? selectedModal.picture : tempImageUrl)} alt="image" className="rounded-lg" />
          <div className="w-full my-3 flex">
            <span className="text-right w-4/12 mr-2">New Image URL: </span>
            <input
              type="text"
              onChange={(ev) => {
                setEditModal({ ...editModal, picture: ev.target.value });
              }}
              className="input input-bordered input-sm w-8/12 mr-6"
            />
          </div>

          {/*Upload image*/}

          <div className="w-full my-3 flex">
            <span className="text-right w-4/12 mr-2">Activity Type: </span>
            <select className="select select-bordered select-sm w-8/12 mr-6" value={selectedOption1} onChange={handleDropdown1Change}>
              <option disabled value="" selected>
                Choose new activity type
              </option>
              {options1.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div className="w-full my-3 flex">
            <span className="text-right w-4/12 mr-2">Activity Variation: </span>
            <select
              className="select select-bordered select-sm w-8/12 mr-6"
              value={selectedOption2}
              onChange={(ev) => {
                setSelectedOption2(ev.target.value);
              }}>
              <option disabled value="" selected>
                Choose new activity type
              </option>
              {options2.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="w-full my-3 flex">
            <span className="text-right w-4/12 mr-2"> Date: </span>
            <input
              type="date"
              className="input input-bordered input-sm w-8/12 mr-6"
              max={new Date().toISOString().split("T")[0]}
              value={editModal.date && editModal.date.split("T")[0]}
              onChange={(ev) => {
                setEditModal({ ...editModal, date: ev.target.value });
              }}
            />
          </div>
          <div className="w-full my-3 flex">
            <span className="text-right w-4/12 mr-2"> Start time: </span>
            <div className="w-8/12 mr-6">
              <select
                className="select select-bordered select-sm text-center w-3/12"
                value={selectedHour || editModal.startTime}
                onChange={(ev) => {
                  setSelectedHour(ev.target.value);
                }}>
                <option disabled selected value="">
                  HH
                </option>
                {/*Hours*/}
                {hours.map((hour) => (
                  <option key={hour} value={hour}>
                    {hour}
                  </option>
                ))}
              </select>
              :
              <select
                className="select select-bordered select-sm w-3/12 text-center"
                onChange={(ev) => {
                  setSelectedMinute(ev.target.value);
                }}
                value={selectedMinute || (editModal.startTime && editModal.startTime.split(":")[1])}>
                <option selected value="">
                  MM
                </option>{" "}
                {/*Mins*/}
                {minutes.map((minute) => (
                  <option key={minute} value={minute}>
                    {minute}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="w-full my-3 flex">
            <span className="text-right w-4/12 mr-2"> Duration: </span>
            <div className="w-8/12 mr-6">
              <input
                type="number"
                placeholder="HH"
                className="input input-bordered input-sm w-3/12 text-center"
                min="0"
                value={durationHour || Math.floor(editModal.duration / 60)}
                onChange={(ev) => {
                  setDurationHour(ev.target.value);
                }}
              />
              :
              <input
                type="number"
                placeholder="MM"
                value={durationMinute || editModal.duration % 60}
                className="input input-bordered input-sm w-3/12 text-center"
                min="0"
                onChange={(ev) => {
                  setDurationMinute(ev.target.value);
                }}
              />
            </div>
          </div>
          <div className="w-full my-3 flex relative">
            <span className="text-right w-4/12 mr-2"> Calories: </span>
            <input
              type="number"
              placeholder="Enter Calories"
              className="input input-bordered input-sm w-8/12 mr-6"
              min="0"
              value={newCalories}
              onChange={(ev) => {
                setNewCalories(ev.target.value);
              }}
            />
            <span className=" tooltip tooltip-left tooltip-success absolute top-1 right-0" data-tip="Will automatically calculate if no input">
              <img src={alert} className="w-6 h-6" alt="alert" />
            </span>
          </div>
          <div className="modal-action">
            <div>
              <button className="btn btn-active hover:btn-success" onClick={handleSaveEdit} disabled={!selectedOption2}>
                Save Change
              </button>
            </div>
            <div>
              <button
                className="btn btn-active hover:btn-error"
                onClick={() => {
                  document.getElementById("my_modal_3").close();
                }}>
                cancel
              </button>
            </div>
          </div>
        </div>
      </dialog>

      {/*Paginate*/}
      <ReactPaginate
        className={"flex flex-row justify-center items-center gap-5 mx-10 rounded-full border bg-neutral-200 border-neutral-200 py-1"}
        breakLabel="..."
        nextLabel="NEXT >> "
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel=" << BACK"
        renderOnZeroPageCount={null}
        containerClassName={"pagination flex space-x-2"}
        pageLinkClassName={"cursor-pointer"}
        activeClassName={""}
        activeLinkClassName={"text-amber-500 cursor-not-allowed"}
        previousClassName={"p-2 rounded-full cursor-pointer"}
        nextClassName={"p-2 rounded-full cursor-pointer"}
      />
    </>
  );
};

export default LogTable;
