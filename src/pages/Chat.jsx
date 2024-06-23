import React ,{useState,useEffect, useRef}from "react";
import "./chat.css";
import ChatList from "../components/chat/ChatList";
import axios from "axios";
import { useParams } from "react-router-dom";
import Message from "../components/chat/Message";
import { getSocket } from "../socket";
import { NEW_MESSAGE } from "../constants/events";
const url = import.meta.env.VITE_BACKEND_URL;

function Chat() {
  const [members,setMembers] = useState([]);
  const [message,setMessage] = useState("");
  const [msgs,setMsgs] = useState([]);
  const messagesEndRef = useRef(null)
  const params = useParams();
  const chatId = params.chatId;
  const socket = getSocket()
  const sendMessage = (e) => {
    // console.log(members)
    e.preventDefault();
    if(!message.trim()) return;
    socket?.emit(NEW_MESSAGE,{
      chatId,members,message
    })
    setMessage("");
  }  
  const getMembers = async() => {
    try {
      const {data} = await axios.get(`${url}/chat/${chatId}`,{ withCredentials: true })
      setMembers(data?.chat?.members)
      console.log(data?.chat?.members);
    } catch (error) {
      console.log(error)
    }
  }
  const getMessages = async () => {
    try {
      // setIsLoading(true);
      const {data} = await axios.get(`${url}/chat/message/${chatId}`,{ withCredentials: true });
      
      if(data) {
        setMsgs(data?.messages)
        console.log(data.messages)
        // setIsLoading(false);
      } else {
        // setIsError(true);
      }
      
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(()=>{
    getMembers();
    getMessages();
  },[chatId])

  useEffect(()=>{
    socket.on(NEW_MESSAGE,(data => {
      console.log(data.message)
      setMsgs((prev)=> [...prev,data.message])
    }))
  },[])

  useEffect(()=>{
    messagesEndRef.current?.scrollIntoView();
  },[msgs])
  return (
    <div className="container">
      <div className="leftside">
        {/* <div className="header">
          <div className="userimg">
            <img src="assets/images/user.jpg" className="cover" />
          </div>
          <ul className="nav_icons">
            <li>
              <ion-icon name="add-circle-outline"></ion-icon>
            </li>
            <li>
              <ion-icon name="chatbox-outline"></ion-icon>
            </li>
            <li>
              <ion-icon name="ellipsis-vertical-outline"></ion-icon>
            </li>
          </ul>
        </div> */}
        <div className="search_chat">
          <div>
            <input type="text" placeholder="Search for a chat" />
            <ion-icon name="search-outline"></ion-icon>
          </div>
        </div>
        {/* <!-- Chat List --> */}
        <div className="chatlist">
         <ChatList/> 
        </div>
      </div>
      <div className="rightside">
        <div className="header">
          <div className="imgText">
            <div className="userimg">
              <img src="assets/images/user.jpg" className="cover" />
            </div>
            <h4>
              Johnny Shelby
              <br />
              <span>online</span>
            </h4>
          </div>
          <ul className="nav_icons">
            <li>
              <ion-icon name="add-circle-outline"></ion-icon>
            </li>
            <li>
              <ion-icon name="chatbox-outline"></ion-icon>
            </li>
            <li>
              <ion-icon name="ellipsis-vertical-outline"></ion-icon>
            </li>
          </ul>
        </div>
        {/* <!-- Chat box --> */}
        <div className="chatBox">
          {msgs.map(msg => <Message key = {msg._id} message={msg}/>)}
          <div ref = {messagesEndRef}/>
        </div>
        {/* <!-- message input --> */}
        <div className="chatbox_input">
          <ion-icon name="happy-outline"></ion-icon>
          <ion-icon name="attach-outline"></ion-icon>
          <input type="text" placeholder="Type a message...." value={message} onChange={(e)=>setMessage(e.target.value)}/>
          <button onClick={sendMessage}><ion-icon name="send-outline"></ion-icon></button>
        </div>
      </div>
    </div>
  );
}

export default Chat;
