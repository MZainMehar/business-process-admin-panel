import React, { useState, useEffect } from 'react';
import axios from 'axios';

const JobsTable = () => {
  const [jobs, setJobs] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [formData, setFormData] = useState({ id: null, jobName: '', roomId: '' });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchJobs();
    fetchRooms();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await axios.get('http://localhost:5000/jobs');
      setJobs(response.data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  const fetchRooms = async () => {
    try {
      const response = await axios.get('http://localhost:5000/rooms');
      setRooms(response.data);
    } catch (error) {
      console.error('Error fetching rooms:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddJob = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/jobs', formData);
      setJobs([...jobs, response.data]);
      setFormData({ id: null, jobName: '', roomId: '' });
    } catch (error) {
      console.error('Error adding job:', error);
    }
  };

  const handleEditJob = (job) => {
    setIsEditing(true);
    setFormData(job);
  };

  const handleUpdateJob = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/jobs/${formData.id}`, formData);
      setJobs(jobs.map(job => job.id === formData.id ? formData : job));
      setIsEditing(false);
      setFormData({ id: null, jobName: '', roomId: '' });
    } catch (error) {
      console.error('Error updating job:', error);
    }
  };

  const handleDeleteJob = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/jobs/${id}`);
      setJobs(jobs.filter(job => job.id !== id));
    } catch (error) {
      console.error('Error deleting job:', error);
    }
  };

  return (
    <div className="bg-white shadow-md rounded p-4">
      <h2 className="text-2xl font-bold mb-4">Jobs</h2>

      <form onSubmit={isEditing ? handleUpdateJob : handleAddJob} className="mb-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <input
            type="text"
            name="jobName"
            value={formData.jobName}
            onChange={handleInputChange}
            placeholder="Job Name"
            className="p-2 border rounded"
            required
          />
          <select
            name="roomId"
            value={formData.roomId}
            onChange={handleInputChange}
            className="p-2 border rounded"
            required
          >
            <option value="">Select Room</option>
            {rooms.map(room => (
              <option key={room.id} value={room.id}>
                {room.roomName} (ID: {room.id})
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
            <th className="py-2 px-4 border-b">Job Name</th>
            <th className="py-2 px-4 border-b">Room ID</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map(job => (
            <tr key={job.id} className="text-center">
              <td className="py-2 px-4 border-b">{job.jobName}</td>
              <td className="py-2 px-4 border-b">{job.roomId}</td>
              <td className="py-2 px-4 border-b">
                <button
                  className="text-green-500 hover:underline mr-2"
                  onClick={() => handleEditJob(job)}
                >
                  Edit
                </button>
                <button
                  className="text-red-500 hover:underline"
                  onClick={() => handleDeleteJob(job.id)}
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

export default JobsTable;
