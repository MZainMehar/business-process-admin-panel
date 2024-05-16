import React, { useState } from 'react';
import { FaUser, FaCogs, FaTasks, FaToolbox, FaBriefcase, FaBuilding } from 'react-icons/fa';
import UsersTable from './UsersTable';
import ProcessesTable from './ProcessesTable';
import TasksTable from './TasksTable';


const AdminPanel = () => {
  const [selectedMenu, setSelectedMenu] = useState('users');

  return (
    <div className="flex h-screen">
      <div className="flex flex-col bg-gray-800 text-white w-64">
        <div className="flex items-center justify-center h-20 border-b border-gray-700">
          <h1 className="text-2xl uppercase font-bold">Admin Panel</h1>
        </div>
        <nav className="flex flex-col p-4 space-y-2">
          <a
            href="#users"
            onClick={() => setSelectedMenu('users')}
            className={`flex items-center p-2 text-gray-300 hover:bg-gray-700 rounded ${selectedMenu === 'users' && 'bg-gray-700'}`}
          >
            <FaUser className="mr-3" /> Users
          </a>
          <a
            href="#processes"
            onClick={() => setSelectedMenu('processes')}
            className={`flex items-center p-2 text-gray-300 hover:bg-gray-700 rounded ${selectedMenu === 'processes' && 'bg-gray-700'}`}
          >
            <FaCogs className="mr-3" /> Processes
          </a>
          <a
            href="#tasks"
            onClick={() => setSelectedMenu('tasks')}
            className={`flex items-center p-2 text-gray-300 hover:bg-gray-700 rounded ${selectedMenu === 'tasks' && 'bg-gray-700'}`}
          >
            <FaTasks className="mr-3" /> Tasks
          </a>
          <a
            href="#functions"
            onClick={() => setSelectedMenu('functions')}
            className={`flex items-center p-2 text-gray-300 hover:bg-gray-700 rounded ${selectedMenu === 'functions' && 'bg-gray-700'}`}
          >
            <FaToolbox className="mr-3" /> Functions
          </a>
          <a
            href="#jobs"
            onClick={() => setSelectedMenu('jobs')}
            className={`flex items-center p-2 text-gray-300 hover:bg-gray-700 rounded ${selectedMenu === 'jobs' && 'bg-gray-700'}`}
          >
            <FaBriefcase className="mr-3" /> Jobs
          </a>
          <a
            href="#buildings"
            onClick={() => setSelectedMenu('buildings')}
            className={`flex items-center p-2 text-gray-300 hover:bg-gray-700 rounded ${selectedMenu === 'buildings' && 'bg-gray-700'}`}
          >
            <FaBuilding className="mr-3" /> Buildings
          </a>
        </nav>
      </div>
      <main className="flex-1 p-4 bg-gray-100 overflow-auto">
        {selectedMenu === 'users' && <UsersTable />}
        {selectedMenu === 'processes' && <ProcessesTable />}
        {selectedMenu === 'tasks' && <TasksTable />}
        {selectedMenu === 'functions' && <h2>Functions Content</h2>}
        {selectedMenu === 'jobs' && <h2>Jobs Content</h2>}
        {selectedMenu === 'buildings' && <h2>Buildings Content</h2>}
      </main>
    </div>
  );
};

export default AdminPanel;
