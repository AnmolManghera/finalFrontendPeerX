import React, { useState, useEffect } from "react";
import axios from "axios";
import ChatListCard from "./ChatListCard";
const url = import.meta.env.VITE_BACKEND_URL;
import { useLocation } from "react-router-dom";

const ChatList = () => {
  const [chats, setChats] = useState([]);
  const location = useLocation();
  const currentChatId = location.pathname.split("/chat/")[1];
  
  const getChats = async () => {
    try {
      const { data } = await axios.get(`${url}/chat/my`, {
        withCredentials: true,
      });
      if (data) {
        setChats(data?.chats);
        
        // chats.map(chat => {
        //   if (chat.lastMessage) {
        //     console.log("Type of lastMessage:", typeof chat.lastMessage);
        //     console.log("Last Message:", chat.lastMessage);
        //   } else { 
        //     console.log("lastMessage is undefined or null");
        //   }
        // });
        
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
      
      <ChatListCard key =  {chat._id} chatId = {chat._id} name = {chat.name} url = {chat.url} isSelected={chat._id === currentChatId} lastMessage = {chat.lastMessage}/>
      
    ))}
  </div>)
};

export default ChatList;
