import React, { useState, useEffect } from "react";
import axios from "axios";
import UserProfileCard from "./UserCard";

const Grid = ({ users }) => {
  return (
    <div className="ml-10 mt-4">
      <ul
        role="list"
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {users?.map((user) => (
          <UserProfileCard user={user} key={user._id} />
        ))}
      </ul>
    </div>
  );
};

export default Grid;
