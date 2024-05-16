import React, { useState } from 'react';

const ProcessesTable = () => {
  const [processes, setProcesses] = useState([]);
  const [formData, setFormData] = useState({ id: null, name: '', jobs: '', tasks: '' });
  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddProcess = (e) => {
    e.preventDefault();
    const newProcess = { ...formData, id: processes.length + 1 };
    setProcesses([...processes, newProcess]);
    setFormData({ id: null, name: '', jobs: '', tasks: '' });
  };

  const handleEditProcess = (process) => {
    setIsEditing(true);
    setFormData(process);
  };

  const handleUpdateProcess = (e) => {
    e.preventDefault();
    setProcesses(processes.map(proc => proc.id === formData.id ? formData : proc));
    setIsEditing(false);
    setFormData({ id: null, name: '', jobs: '', tasks: '' });
  };

  const handleDeleteProcess = (id) => {
    setProcesses(processes.filter(proc => proc.id !== id));
  };

  return (
    <div className="bg-white shadow-md rounded p-4">
      <h2 className="text-2xl font-bold mb-4">Processes</h2>

      <form onSubmit={isEditing ? handleUpdateProcess : handleAddProcess} className="mb-4">
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
            name="jobs"
            value={formData.jobs}
            onChange={handleInputChange}
            placeholder="Jobs"
            className="p-2 border rounded"
            required
          />
          <input
            type="text"
            name="tasks"
            value={formData.tasks}
            onChange={handleInputChange}
            placeholder="Tasks"
            className="p-2 border rounded"
            required
          />
          <button type="submit" className="p-2 bg-blue-500 text-white rounded">
            {isEditing ? 'Update' : 'Add'}
          </button>
        </div>
      </form>

      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Jobs</th>
            <th className="py-2 px-4 border-b">Tasks</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {processes.map(proc => (
            <tr key={proc.id} className="text-center">
              <td className="py-2 px-4 border-b">{proc.name}</td>
              <td className="py-2 px-4 border-b">{proc.jobs}</td>
              <td className="py-2 px-4 border-b">{proc.tasks}</td>
              <td className="py-2 px-4 border-b">
                <button
                  className="text-green-500 hover:underline mr-2"
                  onClick={() => handleEditProcess(proc)}
                >
                  Edit
                </button>
                <button
                  className="text-red-500 hover:underline"
                  onClick={() => handleDeleteProcess(proc.id)}
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

export default ProcessesTable;
