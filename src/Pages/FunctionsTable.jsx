import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FunctionsTable = () => {
  const [functions, setFunctions] = useState([]);
  const [processes, setProcesses] = useState([]);
  const [formData, setFormData] = useState({ id: null, name: '', description: '', processName: '' });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchFunctions();
    fetchProcesses();
  }, []);

  const fetchFunctions = async () => {
    try {
      const response = await axios.get('/functions');
      setFunctions(response.data);
    } catch (error) {
      console.error('Error fetching functions:', error);
    }
  };

  const fetchProcesses = async () => {
    try {
      const response = await axios.get('http://localhost:5000/processesNames');
      setProcesses(response.data);
    } catch (error) {
      console.error('Error fetching processes:', error);
    }
  };  // This was missing

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddFunction = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/functions', formData);
      fetchFunctions();
      setFormData({ id: null, name: '', description: '', processName: '' });
    } catch (error) {
      console.error('Error adding function:', error);
    }
  };

  const handleEditFunction = (func) => {
    setIsEditing(true);
    setFormData(func);
  };

  const handleUpdateFunction = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/functions/${formData.id}`, formData);
      fetchFunctions();
      setIsEditing(false);
      setFormData({ id: null, name: '', description: '', processName: '' });
    } catch (error) {
      console.error('Error updating function:', error);
    }
  };

  const handleDeleteFunction = async (id) => {
    try {
      await axios.delete(`/functions/${id}`);
      fetchFunctions();
    } catch (error) {
      console.error('Error deleting function:', error);
    }
  };

  return (
    <div className="bg-white shadow-md rounded p-4">
      <h2 className="text-2xl font-bold mb-4">Functions</h2>

      <form onSubmit={isEditing ? handleUpdateFunction : handleAddFunction} className="mb-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Name"
            className="p-2 border rounded"
            required
          />
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Description"
            className="p-2 border rounded"
            required
          />
          <select
            name="processName"
            value={formData.processName}
            onChange={handleInputChange}
            className="p-2 border rounded"
            required
          >
            <option value="">Select a Process</option>
            {processes.map(process => (
              <option key={process.id} value={process.id}>
                {process.name}
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
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Description</th>
            <th className="py-2 px-4 border-b">Process</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(functions) && functions.map(func => (
            <tr key={func.id} className="text-center">
              <td className="py-2 px-4 border-b">{func.name}</td>
              <td className="py-2 px-4 border-b">{func.description}</td>
              <td className="py-2 px-4 border-b">{func.processName}</td>
              <td className="py-2 px-4 border-b">
                <button
                  className="text-green-500 hover:underline mr-2"
                  onClick={() => handleEditFunction(func)}
                >
                  Edit
                </button>
                <button
                  className="text-red-500 hover:underline"
                  onClick={() => handleDeleteFunction(func.id)}
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

export default FunctionsTable;
