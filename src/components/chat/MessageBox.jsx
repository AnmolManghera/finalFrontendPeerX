import React from "react";

const MessageBox = () => {
  return (
    <div className="grid grid-cols-6 bg-violet-200">
      <div className="col-span-5 flex items-center justify-center">
        <input
          id="chat"
          className="w-full px-5 py-3 my-2 border border-gray-300 rounded-md box-border"
          placeholder="Your message..."
        />
      </div>
      <div className="flex items-center justify-center">
        <button className="px-5 py-3 my-2 border border-gray-300 rounded-md box-border">Send</button>
      </div>
    </div>
  );
};

export default MessageBox;
