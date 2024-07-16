import React from 'react'
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



const Message = ({message}) => {
  console.log(message)
  const {user} = {name:"anmol","_id":"arouwe98qre"}
  const { sender, content } = message;
  const sameSender = sender?._id === user?._id;
  console.log(sender , content)
  return (
    <div className={sameSender?"message my_message" :"message frnd_message"}>
        <p>
          {content}
          <br />
          <span>{formatTimeAgo(message.createdAt)}</span>
        </p>
    </div>
  )
}

export default Message