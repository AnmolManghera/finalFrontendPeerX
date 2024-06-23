import React from 'react'
import { useSelector } from 'react-redux';

const Message = ({message}) => {
  console.log(message)
  const {user} = useSelector(state => state.auth)
  const { sender, content } = message;
  const sameSender = sender?._id === user?._id;
  console.log(sender , content)
  return (
    <div className={sameSender?"message my_message" :"message frnd_message"}>
        <p>
          {content}
          <br />
          <span>12:01</span>
        </p>
    </div>
  )
}

export default Message