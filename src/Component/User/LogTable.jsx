import { React, useState } from "react";
import axios from "axios";
import { useLoginContext } from "../../Context/LoginContext";
import alert from "../../assets/alert.png";
import ReactPaginate from "react-paginate";

const LogTable = ({ ExerciseLog, reload, setReload }) => {
  //paginate
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

  const DeleteHandler = async (id) => {
    try {
      const response = await axios.delete(`https://benom-backend.onrender.com/users/${user._id}/activities/${id}`, { headers: user.headers });

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

  return (
    <>
      {/* Table log Data  */}

      <div className="my-4 xl:mx-10 mx-5 border-dark-blue">
        {" "}
        {/*container mx-auto max-w-screen-lg*/}
        <table className="flex flex-col bg-dark-blue text-white border rounded-t-3xl">
          <thead className="">
            <tr className="flex justify-between items-center py-4">
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
                <td className="xl:w-2/12 w-2/12 text-center text-black">{Log.dateTime.split("T")[0]}</td>
                <td className="xl:w-2/12 w-2/12 text-center text-black">{Log.startTime}</td>
                <td className="xl:w-2/12 w-2/12 text-center text-black">{`${Log.duration > 60 ? `${Math.floor(Log.duration / 60)} hr ${Math.round(Log.duration % 60)} min` : `${Math.round(Log.duration % 60)} min`}`}</td>
                <td className="xl:w-1/12 w-1/12 text-center text-black">{Math.round(Log.calories)}</td>

                {/*ปุ่ม VIEW DETAIL*/}
                <td className="xl:w-2/12 w-2/12 text-center text-black py-2">
                  <button
                    className="btn btn-warning border-black "
                    onClick={() => {
                      document.getElementById("my_modal_5").showModal();
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
          <img src="https://i.ibb.co/ck92yGC/Screenshot-2023-10-20-225703.png" className="rounded-lg" />

          <h2 className="ml-3 pt-5 text-xl">
            Activity :<span className="text-xl ml-10 text-white bg-sea-blue border border-slate-300 rounded-lg px-40 py-1"></span>
          </h2>

          <h2 className="ml-3 pt-5 text-xl">
            Date :<span className="text-xl ml-16 text-white bg-sea-blue border border-slate-300 rounded-lg px-40 py-1"></span>
          </h2>

          <h2 className="ml-3 pt-5 text-xl">
            Start-Time :<span className="text-xl ml-3 text-white bg-sea-blue border border-slate-300 rounded-lg px-40 py-1"></span>
          </h2>

          <h2 className="ml-3 pt-5 text-xl">
            {" "}
            Duration :<span className="text-xl ml-7 text-white bg-sea-blue border border-slate-300 rounded-lg px-40 py-1"></span>
          </h2>

          <h2 className="ml-3 pt-5 text-xl">
            {" "}
            Calories :<span className="text-xl ml-9 text-white bg-sea-blue border border-slate-300 rounded-lg px-40 py-1"></span>
          </h2>

          <div className="modal-action">
            <td>
              <button className="btn btn-active hover:btn-warning" onClick={() => document.getElementById("my_modal_3").showModal()}>
                Edit Details
              </button>
              {/*Edit Modal*/}
              <dialog id="my_modal_3" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                  <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                  </form>

                  <h3 className="text-xl font-bold text-center pb-5">Edit Details</h3>

                  {/*Upload Image*/}

                  <div>
                    <img src={imageUrl || tempImageUrl} alt="venom-no" className="rounded-lg" />
                    <labels className="ml-5">Enter image URL : </labels>
                    <input
                      type="text"
                      onChange={(ev) => {
                        setImageUrl(ev.target.value);
                      }}
                      className="input input-bordered input-sm w-1/2 max-w-x mt-5 ml-6"
                    />
                  </div>

                  {/*Upload image*/}

                  <ul>
                    <li className="text-start ml-5">
                      Activity:
                      <select className="select select-bordered select-sm w-2/3 max-w-xs ml-8 mt-5">
                        <option disabled selected>
                          Choose new activities
                        </option>
                        <option>Cycling: Vigorous-mountain</option>
                        <option>Cycling: General-mountain</option>
                        <option>Cycling: Racing</option>
                        <option>Cycling: General</option>
                        <option>Cycling: Stationary</option>
                        <option>Calisthenics: Vigorous</option>
                        <option>Calisthenics: Moderate</option>
                        <option>Calisthenics: Light</option>
                        <option>Calisthenics: General</option>
                        <option>Calisthenics: Water</option>
                        <option>Running: Walk Combination</option>
                        <option>Running: General</option>
                        <option>Running: In Place</option>
                        <option>Running: Stairs Up</option>
                        <option>Running: Marathon</option>
                        <option>Swimming: Moderate Freestyle</option>
                        <option>Swimming: General Backstroke</option>
                        <option>Swimming: General Breaststroke</option>
                        <option>Swimming: General Butterfly</option>
                        <option>Swimming: General Sidestroke</option>
                        <option>Walking: Race</option>
                        <option>Walking: Normal</option>
                        <option>Walking: Slow</option>
                        <option>Walking: Stair Climb</option>
                        <option>Walking: Hills Climb</option>
                        <option>Yoga: Hatha</option>
                        <option>Yoga: Power</option>
                        <option>Yoga: Nadisodhana</option>
                        <option>Yoga: Surya Namaskar</option>
                        <option>Yoga: Stretching</option>
                      </select>
                    </li>
                    <br />

                    <li className="text-start ml-5">
                      Date :
                      <input
                        type="date"
                        className="input input-bordered input-sm w-2/3 max-w-x ml-12"
                        max={new Date().toISOString().split("T")[0]}
                        onChange={(ev) => {
                          setDate(ev.target.value);
                        }}
                      />
                    </li>

                    <li className="text-start ml-5">
                      Start-Time:
                      <select
                        className="select select-bordered select-sm w-1/6 max-w-x ml-3 mr-2 text-center mt-6"
                        value={selectedHour}
                        onChange={(ev) => {
                          setSelectedHour(ev.target.value);
                        }}>
                        <option disabled selected value="">
                          HH
                        </option>{" "}
                        {/*Hours*/}
                        {hours.map((hour) => (
                          <option key={hour} value={hour}>
                            {hour}
                          </option>
                        ))}
                      </select>
                      :
                      <select
                        className="select select-bordered select-sm w-1/6 max-w-x ml-2 mr-4 text-center"
                        onChange={(ev) => {
                          setSelectedMinute(ev.target.value);
                        }}>
                        <option selected value="00">
                          MM
                        </option>{" "}
                        {/*Mins*/}
                        {minutes.map((minute) => (
                          <option key={minute} value={minute}>
                            {minute}
                          </option>
                        ))}
                      </select>
                    </li>
                    <br />

                    <li className="text-start ml-5">
                      Duration:
                      <input
                        type="number"
                        placeholder="HH"
                        className="input input-bordered input-sm w-1/6 max-w-x ml-6 mr-2 text-center"
                        min="0"
                        onChange={(ev) => {
                          setDurationHour(ev.target.value);
                        }}
                      />
                      :
                      <input
                        type="number"
                        placeholder="MM"
                        className="input input-bordered input-sm w-1/6 max-w-x text-center ml-2"
                        min="0"
                        onChange={(ev) => {
                          setDurationMinute(ev.target.value);
                        }}
                      />
                    </li>
                    <br />

                    <li className="text-start mb-5 ml-5">
                      Calories:
                      <input
                        type="number"
                        placeholder="Enter Calories"
                        className="input input-bordered input-sm w-2/3 max-w-x ml-7"
                        min="0"
                        onChange={(ev) => {
                          setCalories(ev.target.value);
                        }}
                      />
                      <span className="lg:tooltip" data-tip="Will automatically calculate if no input">
                        <img src={alert} className="w-6 h-6 ml-1 md:ml-2 lg:ml-2" alt="alert" />
                      </span>
                    </li>
                  </ul>

                  <div className="modal-action">
                    <td>
                      <button className="btn btn-active hover:btn-success">Save Change</button>
                    </td>
                    <form method="dialog">
                      <button className="btn btn-active hover:btn-outline">cancel</button>
                    </form>
                  </div>
                </div>
              </dialog>
            </td>

            <td>
              <button className="btn btn-active hover:btn-error hover:text-white" onClick={() => DeleteHandler(Log._id)}>
                Delete
              </button>
            </td>
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
