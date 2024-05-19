import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RoomsTable = () => {
  const [rooms, setRooms] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [formData, setFormData] = useState({ id: null, roomNumber: '', floorId: '', roomName: '', jobName: '', taskName: '' });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchRooms();
    fetchJobs();
    fetchTasks();
  }, []);

  const fetchRooms = async () => {
    try {
      const response = await axios.get('http://localhost:5000/rooms');
      setRooms(response.data);
    } catch (error) {
      console.error('Error fetching rooms:', error);
    }
  };

  const fetchJobs = async () => {
    try {
      const response = await axios.get('http://localhost:5000/jobNames');
      setJobs(response.data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/taskName');
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddRoom = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/rooms', formData);
      setRooms([...rooms, response.data]);
      setFormData({ id: null, roomNumber: '', floorId: '', roomName: '', jobName: '' });
    } catch (error) {
      console.error('Error adding room:', error);
    }
  };

  const handleEditRoom = (room) => {
    setIsEditing(true);
    setFormData(room);
  };

  const handleUpdateRoom = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/rooms/${formData.id}`, formData);
      setRooms(rooms.map(rm => rm.id === formData.id ? formData : rm));
      setIsEditing(false);
      setFormData({ id: null, roomNumber: '', floorId: '', roomName: '', jobName: '' });
    } catch (error) {
      console.error('Error updating room:', error);
    }
  };

  const handleDeleteRoom = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/rooms/${id}`);
      setRooms(rooms.filter(room => room.id !== id));
    } catch (error) {
      console.error('Error deleting room:', error);
    }
  };

  return (
    <div className="bg-white shadow-md rounded p-4">
      <h2 className="text-2xl font-bold mb-4">Rooms</h2>

      <form onSubmit={isEditing ? handleUpdateRoom : handleAddRoom} className="mb-4">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
          <input
            type="text"
            name="roomNumber"
            value={formData.roomNumber}
            onChange={handleInputChange}
            placeholder="Room Number"
            className="p-2 border rounded"
            required
          />
          <input
            type="text"
            name="floorId"
            value={formData.floorId}
            onChange={handleInputChange}
            placeholder="Floor ID"
            className="p-2 border rounded"
            required
          />
          <input
            type="text"
            name="roomName"
            value={formData.roomName}
            onChange={handleInputChange}
            placeholder="Room Name"
            className="p-2 border rounded"
            required
          />
          <select
            name="jobName"
            value={formData.jobName}
            onChange={handleInputChange}
            className='p-2 border rounded'
            required
          >
            <option value="">Select Job</option>
            {jobs.map(job => (
              <option key={job.id} value={job.id}>
                {job.jobName}
              </option>
            ))}
          </select>
          <select
            name="taskName"
            value={formData.taskName}
            onChange={handleInputChange}
            className='p-2 border rounded'
            required
          >
            <option value="">Select Task</option>
            {tasks.map(task => (
              <option key={task.id} value={task.id}>
                {task.taskName}
              </option>
            ))}
          </select>
          <button type="submit" className="p-2 bg-blue-500 text-white rounded">
            {isEditing ? 'Update' : 'Add'}
          </button>
        </div>
      </form>

      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Room Number</th>
            <th className="py-2 px-4 border-b">Floor ID</th>
            <th className="py-2 px-4 border-b">Room Name</th>
            <th className="py-2 px-4 border-b">Job</th>
            <th className="py-2 px-4 border-b">Task</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {rooms.map(room => (
            <tr key={room.id} className="text-center">
              <td className="py-2 px-4 border-b">{room.roomNumber}</td>
              <td className="py-2 px-4 border-b">{room.floorId}</td>
              <td className="py-2 px-4 border-b">{room.roomName}</td>
              <td className="py-2 px-4 border-b">{room.jobName}</td>
              <td className="py-2 px-4 border-b">{room.taskName}</td>
              <td className="py-2 px-4 border-b">
                <button
                  className="text-green-500 hover:underline mr-2"
                  onClick={() => handleEditRoom(room)}
                >
                  Edit
                </button>
                <button
                  className="text-red-500 hover:underline"
                  onClick={() => handleDeleteRoom(room.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RoomsTable;
