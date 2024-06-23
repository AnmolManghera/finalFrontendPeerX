import React, { useState } from "react";
import { ScheduleMeeting } from "react-schedule-meeting";
import UserAccounts from "../components/interview/UserList";
import { Outlet,Link ,NavLink} from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import {
  BarChart,
  Wallet,
  Newspaper,
  BellRing,
  Paperclip,
  Brush,
  Wrench,
} from "lucide-react";

export function Sidebar() {
  return (
    <div className="flex flex-col space-y-1 w-[90%] mx-auto">
      <NavLink to="/interviews/myinterviews" className="text-white font-bold p-4 rounded-lg mt-2">
        My Interviews
      </NavLink>
      <NavLink to="/interviews/updateschedule" className="p-4 border border-gray-300 rounded-lg">
        Update Schedule
      </NavLink>
      <NavLink to="/interviews/requestinterview" className="p-4 border border-gray-300 rounded-lg">
        Request Interview
      </NavLink>
    </div>

  );
}




const Interview = () => {

  return (
    <div className="flex flex-row">
      <div className="bg-slate-300 w-[20%] h-[90vh]">
      <Sidebar />
      </div>
      <Outlet />
    </div>
  );
};

export default Interview;
