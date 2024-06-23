import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate} from "react-router-dom";
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
    <div>
      
      {meetings.map((meeting) => (
        <div>
        <div key={meeting._id}>
          {meeting._id}
        </div>
        <button className="bg-rose-400" onClick={()=>handleJoining(meeting._id)}>
          Join Meeting
        </button>
        </div>
      ))}
    </div>
  );
};

export default MyMeetings;
