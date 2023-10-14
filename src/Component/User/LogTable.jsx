import React from "react";
import axios from "axios";
import { useLoginContext } from "../../Context/LoginContext";

const LogTable = ({ ExerciseLog, reload, setReload }) => {
  const { user } = useLoginContext();
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
  return (
    <>
      {/* Table log Data  */}
      <table className="min-w-full divide-y">
        <thead className="bg-dark-orange">
          <tr>
            <th className="px-6 py-5 text-left text-xs font-bold text-black uppercase tracking-wider">Activity</th>
            <th className="px-6 py-5 text-left text-xs font-bold text-black uppercase tracking-wider">Date</th>
            <th className="px-6 py-5 text-left text-xs font-bold text-black uppercase tracking-wider">Start-Time</th>
            <th className="px-6 py-5 text-left text-xs font-bold text-black uppercase tracking-wider">Duration</th>
            <th className="px-6 py-5 text-left text-xs font-bold text-black uppercase tracking-wider">Calories</th>
            <th className="px-6 py-5 text-left text-xs font-bold text-black uppercase tracking-wider"></th>
            <th className="px-6 py-5 text-left text-xs font-bold text-black uppercase tracking-wider"></th>
          </tr>
        </thead>
        <tbody>
          {ExerciseLog.map((Log, index) => (
            <tr key={Log._id} className={index % 2 === 0 ? "bg-lightsalmon" : "bg-gray-100"}>
              <td className="px-6 py-4 text-black whitespace-nowrap">{Log.exerciseName}</td>
              <td className="px-6 py-4 text-black whitespace-nowrap">{Log.dateTime.split("T")[0]}</td>
              <td className="px-6 py-4 text-black whitespace-nowrap">{Log.startTime}</td>
              <td className="px-6 py-4 text-black whitespace-nowrap">{Log.duration}</td>
              <td className="px-6 py-4 text-black whitespace-nowrap">{Log.calories}</td>

              <td>
                {/* ส่วนปุ่ม view photo  */}
                <button className="btn btn-outline btn-primary  disabled:opacity-80 disabled:bg-gray-400 disabled:text-white" onClick={() => document.getElementById(`my_modal_${Log._id}`).showModal()} disabled={!Log.picture}>
                  View Photo
                </button>
                <dialog id={`my_modal_${Log._id}`} className="modal modal-bottom sm:modal-middle">
                  <div className="modal-box">
                    <h3 className="font-bold text-lg text-white mb-4">{Log.exerciseName}</h3>
                    <img src={Log.picture} alt="imglog" />
                    <div className="modal-action">
                      <form method="dialog">
                        <button className="btn btn-outline btn-error" onClick={() => document.getElementById(`my_modal_${Log._id}`).close()}>
                          Close
                        </button>
                      </form>
                    </div>
                  </div>
                </dialog>
              </td>
              <td className="px-6 py-4 text-black whitespace-nowrap">
                {/* ส่วนปุ่ม DELETE  */}
                <button className="btn btn-outline btn-error" onClick={() => DeleteHandler(Log._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/*ส่วนที่คุณฟลุ๊คแก้ไข - ตาราง - ห้ามเคลื่อน*/}
    </>
  );
};

export default LogTable;
