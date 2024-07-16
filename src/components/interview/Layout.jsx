import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const Layout = () => {
  return (
    <div className="flex flex-row">
      <div className="bg-slate-300 h-[90vh]">
        <Sidebar/>
      </div>
      <div className="flex flex-1 justify-center h-[90vh] w-full">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;