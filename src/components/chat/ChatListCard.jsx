import React from "react";
import { Link } from "react-router-dom";
import moment from 'moment'

function formatTimeAgo(timestamp) {
  const now = new Date(); // Current time
  const duration = moment.duration(moment(now).diff(moment(timestamp)));

  if (duration.asSeconds() < 60) {
    return 'Just now';
  } else if (duration.asMinutes() < 60) {
    return `${Math.floor(duration.asMinutes())} minutes ago`;
  } else if (duration.asHours() < 24) {
    return `${Math.floor(duration.asHours())} hours ago`;
  } else if (duration.asDays() < 30) {
    return `${Math.floor(duration.asDays())} days ago`;
  } else {
    return moment(timestamp).format('MMM D, YYYY');
  }
}




const ChatListCard = ({chatId,name,url,isSelected,lastMessage}) => {
  return (
    <Link to = {`/chat/${chatId}`}>
    <div className={`block ${isSelected? 'active' :''}`}>
      <div className="imgbx">
        <img src={url} className="cover"/>
      </div>
      <div className="details">
        <div className="listHead">
          <h4>{name}</h4>
          <p className="time">{formatTimeAgo(lastMessage[0]?.createdAt)}</p>
        </div>
        <div className="message_p">
          <p>{lastMessage[0]?.content}</p>
        </div>
      </div>
    </div>
    </Link>
  );
};

export default ChatListCard;
