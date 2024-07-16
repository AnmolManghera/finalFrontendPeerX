import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="w-64 h-full bg-gray-800 text-white shadow-lg p-6">
      <ul className="space-y-4">
        <li>
          <NavLink
            to="/interviews"
            end
            className={({ isActive }) =>
              isActive
                ? "block p-3 rounded-md bg-gray-700"
                : "block p-3 rounded-md hover:bg-gray-700 transition duration-200"
            }
          >
            Interviews
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/interviews/updateschedule"
            className={({ isActive }) =>
              isActive
                ? "block p-3 rounded-md bg-gray-700"
                : "block p-3 rounded-md hover:bg-gray-700 transition duration-200"
            }
          >
            Update Schedule
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/interviews/requestinterview"
            className={({ isActive }) =>
              isActive
                ? "block p-3 rounded-md bg-gray-700"
                : "block p-3 rounded-md hover:bg-gray-700 transition duration-200"
            }
          >
            Request Interview
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
