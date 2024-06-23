import React from "react";
import axios from 'axios'

const url = import.meta.env.VITE_BACKEND_URL;

const UserProfileCard = ({user}) => {
  const addFriendHandler = async (id) => {
    try {
      const res = await axios.post(`${url}/user/sendConnectionRequest`,{userId:id,type:"CONNECTION"},{withCredentials: true})
      console.log(res);
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="w-[90%] max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 ">
      <div className="flex flex-row items-center pb-6 pt-6 ml-8">
        <img
          className="w-24 h-24 mb-3 rounded-full shadow-lg"
          src={user.url}
          alt="Bonnie image"
        />
        <div className="flex flex-col items-center ml-2">
          <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
            {user.name}
          </h5>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {user.field[0]}
          </span>
          <div className="flex mt-4 md:mt-6">
            <button
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={()=>addFriendHandler(user._id)}
            >
              Connect
            </button>
            <a
              href="#"
              className="py-2 px-4 ms-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
              Message
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileCard;
