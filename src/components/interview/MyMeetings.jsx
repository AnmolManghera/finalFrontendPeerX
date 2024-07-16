import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import MeetingCard from "./MeetingCard";
const url = import.meta.env.VITE_BACKEND_URL;

const MyMeetings = () => {
  const [meetings, setMeetings] = useState([]);
  const navigate = useNavigate()
  const getMyMeetings = async () => {
    try {
      const meetings = await axios.get(
        `${url}/user/interviews`,
        {
          withCredentials: true,
        }
      );
      if(meetings.data.interviews){
        setMeetings(meetings.data.interviews);
      }
      else{
        setMeetings([])
      }
      console.log(meetings);
    } catch (error) {
      console.log(error);
    }
  };
  const handleJoining = (id) => {
    navigate(`/interviews/${id}`);
  }
  function getDate(dateString) {
    const [day, month] = dateString.split("-");
    const date = new Date();
    date.setDate(parseInt(day, 10));
    date.setMonth(parseInt(month, 10) - 1);
    return date;
  }
  function getTimeFromString(timeString) {
    const date = new Date();
    date.setHours(parseInt(timeString, 10));
    return date;
  }
  useEffect(() => {
    getMyMeetings();
  }, []);
  if (!meetings || meetings.length === 0) {
    return (
      <div>No meetings scheduled for you yet.</div>
    );
  }
  return (
    <div className="ml-10 mt-4">
      <ul
        role="list"
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {meetings?.map((meeting) => (
          <MeetingCard meeting={meeting} key={meeting._id} />
        ))}
      </ul>
    </div>
  );
};

export default MyMeetings;
