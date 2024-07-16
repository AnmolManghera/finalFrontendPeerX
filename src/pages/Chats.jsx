import React from "react";
import ChatList from "../components/chat/ChatList";
import "./chat.css";

const Chats = () => {
  return (
    <div className="container">
      <div className="leftside">
        <div className="search_chat">
          <div>
            {/* <input type="text" placeholder="Search for a chat" />
            <ion-icon name="search-outline"></ion-icon> */}
          </div>
        </div>

        <div className="chatlist">
         <ChatList/> 
        </div>
      </div>
      <div className="rightside">
        <div className="header">
          Please select a chat
          {/* <ul className="nav_icons">
            <li>
              <ion-icon name="add-circle-outline"></ion-icon>
            </li>
            <li>
              <ion-icon name="chatbox-outline"></ion-icon>
            </li>
            <li>
              <ion-icon name="ellipsis-vertical-outline"></ion-icon>
            </li>
          </ul> */}
        </div>
      </div>
    </div>
  );
};

export default Chats;
