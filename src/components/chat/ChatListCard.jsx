import React from "react";
import { Link } from "react-router-dom";

const ChatListCard = ({chatId,name}) => {
  return (

    <Link to = {`/chat/${chatId}`}>
    <div className="blocky">
      <div className="imgbx">
        <img src="./assets/images/img1.jpg" className="cover" />
      </div>
      <div className="details">
        <div className="listHead">
          <h4>{name}</h4>
          <p className="time">10:56</p>
        </div>
        <div className="message_p">
          <p>How to make whatsapp clone using html and something</p>
        </div>
      </div>
    </div>
    </Link>
  );
};

export default ChatListCard;
