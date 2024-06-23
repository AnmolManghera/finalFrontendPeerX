import React, { useState, useEffect } from "react";
import axios from "axios";
import ChatListCard from "./ChatListCard";
const url = import.meta.env.VITE_BACKEND_URL;

const ChatList = () => {
  const [chats, setChats] = useState([]);
  const getChats = async () => {
    try {
      const { data } = await axios.get(`${url}/chat/my`, {
        withCredentials: true,
      });
      if (data) {
        setChats(data?.chats);
        console.log(data.chats);
      } else {
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getChats();
  }, []);
  return(
  <div>
    {chats.map((chat) => (
      <ChatListCard key =  {chat._id} chatId = {chat._id} name = {chat.name}/>
    ))}
  </div>)
};

export default ChatList;
