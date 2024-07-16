import React, { useState, useEffect } from "react";
import axios from "axios";
const url = import.meta.env.VITE_BACKEND_URL;

const days = [];
for (let i = 0; i < 7; i++) {
  const date = new Date();
  date.setDate(date.getDate() + i);
  const day = String(date.getDate()).padStart(2, "0"); // Add leading zero if single digit
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is zero-based
  const formattedDate = `${day}-${month}`;
  days.push(formattedDate);
}
const timeSlots = ["09", "10", "11", "12", "01", "02", "03", "04"];
const UpdateSchedule = () => {
  // const schedule = new Set();
  const [schedule, setSchedule] = useState([]);
  function handleClick(e) {
    const value = e.currentTarget.getAttribute("data");
    setSchedule((prevData) => {
      if (!Array.isArray(prevData)) {
        return [value];
      }
      if (prevData.indexOf(value) !== -1) {
        return prevData.filter((item) => item !== value);
      } else {
        return [...prevData, value];
      }
    });
    
  }
  const getUserSchedule = async () => {
    try {
      const { data } = await axios.get(`${url}/user/schedule`, {
        withCredentials: true,
      });
      if (data) {
        console.log(data.schedule)
        setSchedule(data.schedule);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleUpdateSchedule = async () => {
    try {
      const { data } = await axios.post(
        `${url}/user/updateschedule`,
        { schedule },
        { withCredentials: true }
      );
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUserSchedule();
  }, []);

  return (
    <div className="mx-auto">
      <div className="grid grid-cols-7 gap-4">
        {days.map((day, idx) => (
          <div className="flex flex-col gap-2" key={idx}>
            {day}
            {timeSlots.map((time, index) => (
              <div
                key={index}
                className={`w-full border border-gray-300 p-4 rounded-lg ${
                  Array.from(schedule).indexOf(day + "-" + time) !== -1
                    ? "bg-rose-300"
                    : "bg-gray-200"
                }`}
                data={day + "-" + time}
                onClick={handleClick}
              >
                {time}
              </div>
            ))}
          </div>
        ))}
      </div>
      <button
        className="mt-2 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
        onClick={handleUpdateSchedule}
      >
        Update Schedule
      </button>
    </div>
  );
};

export default UpdateSchedule;
