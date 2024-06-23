import React, { useEffect, useState } from "react";
import { ScheduleMeeting } from "react-schedule-meeting";
import UserAccounts from "./UserList";
import axios from "axios";
import { InterviewTable } from "./InterviewTable";
const url = import.meta.env.VITE_BACKEND_URL;

function Calender({ setTime }) {
  const availableTimeslots = [0, 1, 2, 3, 4, 5].map((id) => {
    return {
      id,
      startTime: new Date(
        new Date(new Date().setDate(new Date().getDate() + id)).setHours(
          9,
          0,
          0,
          0
        )
      ),
      endTime: new Date(
        new Date(new Date().setDate(new Date().getDate() + id)).setHours(
          17,
          0,
          0,
          0
        )
      ),
    };
  });

  return (
    <ScheduleMeeting
      borderRadius={10}
      primaryColor="#3f5b85"
      eventDurationInMinutes={60}
      availableTimeslots={availableTimeslots}
      onStartTimeSelect={setTime}
    />
  );
}

function formatDateAndTime(date) {
  // Extract date components
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  const day = String(date.getDate()).padStart(2, "0");

  // Extract time components
  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // Handle midnight (0 hours)

  // Format date and time
  const formattedDate = `${year}-${month}-${day}`;
  let formattedTime = `${hours}:${minutes}`;

  if (formattedTime.length === 4) {
    formattedTime = "0" + formattedTime;
  }
  return { date: formattedDate, time: formattedTime };
}
const RequestInterview = () => {
  const [step, setStep] = useState(0);
  const [reqTD, setReqTD] = useState("00-00-00");
  const [aUser, setAUsers] = useState([]);
  const [finalUser, setFinalUser] = useState();
  const [time, setMeetingTime] = useState("00-00-00");
  const settime = (e) => {
    const { date, time } = formatDateAndTime(e.startTime);
    const requestTimeAndDate =
      date[8] + date[9] + "-" + date[5] + date[6] + "-" + time[0] + time[1];
    setReqTD(requestTimeAndDate);
    // setTimeout(() => {
    //   setStep(1);
    // }, 1000);
    setStep(1);
  };
  const findUsersForInterview = async (requestTD) => {
    try {
      // console.log(requestTD)
      const {data} = await axios.post(
        `${url}/user/getusersforinterviews`, {
          reqTD: requestTD,
        }, { withCredentials: true }
      );
      setAUsers(data.users)
      // console.log(data.users)
    } catch (error) {
      console.log(error);
    }
  };
  const requestForInterview = async ({requestId,reqTD})=>{
    try {
      // console.log(requestTD)
      const {data} = await axios.post(
        `${url}/user/requestinterview`, {
          requestId,
          reqTD
        }, { withCredentials: true }
      );
      // setAUsers(data.users)
      console.log(data)
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    findUsersForInterview(reqTD);
  }, [reqTD]);
  return (
    <div className="w-full">
      {step === 0 && (
        <div className="mx-auto w-[80%]">
          <Calender setTime={settime} />
        </div>
      )}
      {step === 1 && (
        <div className="mx-auto w-full">
          <div>Fetching Experienced Interviewers For you</div>
          <button className="bg-rose-200 p-3" onClick={() => setStep(0)}>
            Change Time
          </button>
          <InterviewTable users={aUser} handleRequest={requestForInterview} reqTD={reqTD}/>
        </div>
      )}
    </div>
  );
};

export default RequestInterview;
