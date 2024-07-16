import React from "react";
import axios from 'axios'
import { Outlet, useNavigate} from "react-router-dom";
const url = import.meta.env.VITE_BACKEND_URL;

const canJoinMeeting = (meeting) => {
  const currentTime = new Date();
  const meetingTime = new Date(`${meeting.createdAt} ${meeting.time}:00`);

  // Check if meeting date is today
  const isToday = meeting.date === `${currentTime.getDate()}-${currentTime.getMonth() + 1}`;
  
  // Check if meeting time is within 1 hour from current time (9 AM to 4 PM)
  const isWithinTimeRange = meetingTime >= currentTime && meetingTime <= new Date(currentTime.getTime() + 60 * 60 * 1000);
  
  return isToday && isWithinTimeRange;
}

const MeetingCard = ({meeting}) => {
    const navigate = useNavigate()
    const handleJoining = (id) => {
        navigate(`/interviews/${id}`);
    }
  return (
    <div className="w-[90%] max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 ">
      <div className="flex flex-row items-center pb-6 pt-6 ml-8">
        <img
          className="w-24 h-24 mb-3 rounded-full shadow-lg"
          src={meeting.members[0].url}
          alt="Bonnie image"
        />
        <div className="flex flex-col items-center ml-2">
          <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
            {`${meeting.members[0].name}-${meeting.members[1].name}`}
          </h5>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {`On ${meeting.date} at ${meeting.time}`}
          </span>
          <div className="flex mt-4 md:mt-6">
            <button
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={()=>handleJoining(meeting._id)}
              // disabled = {!canJoinMeeting(meeting)}
            >
              {canJoinMeeting(meeting)? "Join" : "OverDue"}  
            </button>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeetingCard;
