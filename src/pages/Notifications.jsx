import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { getSocket } from "../socket";
import { NotificationsTable } from "../components/NotificationsTable";
const url = import.meta.env.VITE_BACKEND_URL;

const Notifications = () => {
  const [nfs, setNfs] = useState([]);
  const socket = getSocket();
  const handleConnectionRequest = async ({ requestId, accept }) => {
    try {
      const { data } = await axios.post(
        `${url}/user/acceptConnectionrequest`,
        {
          requestId,
          accept,
        },
        { withCredentials: true }
      );
      console.log(data);
      setNfs(nfs.filter((nf) => nf._id !== requestId));
    } catch (error) {
      console.log(error);
    }
  };
  const handleInterviewRequest = async({ requestId, accept,reqTD }) => {
    try {
      const { data } = await axios.post(
        `${url}/user/acceptinterviewrequest`,
        {
          requestId,
          accept,
          reqTD
        },
        { withCredentials: true }
      );
      setNfs(nfs.filter((nf) => nf._id !== requestId));
      console.log(data);
     
    } catch (error) {
      console.log(error);
    }
  }
  const getNotifications = async () => {
    try {
      const { data } = await axios.get(
        `${url}/user/notifications`,
        { withCredentials: true }
      );
      if (data) {
        console.log(data);
        setNfs(data.allRequests);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getNotifications();
  }, []);

 
  return (
    <NotificationsTable notifications = {nfs} handleConnectionRequest={handleConnectionRequest} handleInterviewRequest={handleInterviewRequest}/>
  );
};


export default Notifications;
