import React, { useEffect } from "react";
import { getSocket } from "../socket";
import { useNavigate } from "react-router-dom";

const Interviews = () => {
  const socket = getSocket();
  const navigate = useNavigate();
  const createRoom = () => {
    // socket?.emit("join-room")
    socket.emit("create-room");
    console.log(socket)
  };
  const enterRoom = ({ roomId }) => {
    console.log({ roomId });
    navigate(`/room/${roomId}`);
  };
  useEffect(() => {
    
    socket.on("room-created", enterRoom);
  }, []);
  return (
    <div>
      <button onClick={createRoom}>Create New Meeting</button>
    </div>
  );
};

export default Interviews;
