import React, { useState, useEffect } from "react";
import ChatList from "../components/chat/ChatList";
import "./chat.css";

const Chats = () => {
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

        <div className="chatlist">
         <ChatList/> 
        </div>
      </div>
      <div className="rightside">
        <div className="header">
          {/* <div className="imgText">
            <div className="userimg">
              <img src="assets/images/user.jpg" className="cover" />
            </div>
            <h4>
              Johnny Shelby
              <br />
              <span>online</span>
            </h4> */}
          {/* </div> */}
          Please select a chat
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
      </div>
    </div>
  );
};

export default Chats;
