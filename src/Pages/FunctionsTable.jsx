import React, { useState } from 'react';

const FunctionsTable = () => {
  const [functions, setFunctions] = useState([]);
  const [formData, setFormData] = useState({ id: null, name: '', description: '', type: '' });
  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddFunction = (e) => {
    e.preventDefault();
    const newFunction = { ...formData, id: functions.length + 1 };
    setFunctions([...functions, newFunction]);
    setFormData({ id: null, name: '', description: '', type: '' });
  };

  const handleEditFunction = (func) => {
    setIsEditing(true);
    setFormData(func);
  };

  const handleUpdateFunction = (e) => {
    e.preventDefault();
    setFunctions(functions.map(f => f.id === formData.id ? formData : f));
    setIsEditing(false);
    setFormData({ id: null, name: '', description: '', type: '' });
  };

  const handleDeleteFunction = (id) => {
    setFunctions(functions.filter(f => f.id !== id));
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
          <input
            type="text"
            name="type"
            value={formData.type}
            onChange={handleInputChange}
            placeholder="Type"
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
            <th className="py-2 px-4 border-b">Description</th>
            <th className="py-2 px-4 border-b">Type</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {functions.map(func => (
            <tr key={func.id} className="text-center">
              <td className="py-2 px-4 border-b">{func.name}</td>
              <td className="py-2 px-4 border-b">{func.description}</td>
              <td className="py-2 px-4 border-b">{func.type}</td>
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
