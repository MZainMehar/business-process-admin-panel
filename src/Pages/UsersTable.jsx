import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UsersTable = () => {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({ id: null, name: '', username: '', password: '', score: '' });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:5000/users')
      .then(response => setUsers(response.data))
      .catch(error => console.error(error));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddUser = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/users', formData)
      .then(response => {
        setUsers([...users, response.data]);
        setFormData({ id: null, name: '', username: '', password: '', score: '' });
      })
      .catch(error => console.error(error));
  };

  const handleEditUser = (user) => {
    setIsEditing(true);
    setFormData(user);
  };

  const handleUpdateUser = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:5000/users/${formData.id}`, formData)
      .then(response => {
        setUsers(users.map(user => user.id === formData.id ? response.data : user));
        setIsEditing(false);
        setFormData({ id: null, name: '', username: '', password: '', score: '' });
      })
      .catch(error => console.error(error));
  };

  const handleDeleteUser = (id) => {
    axios.delete(`http://localhost:5000/users/${id}`)
      .then(response => {
        setUsers(users.filter(user => user.id !== id));
      })
      .catch(error => console.error(error));
  };

  return (
    <div className="bg-white shadow-md rounded p-4">
      <h2 className="text-2xl font-bold mb-4">Users</h2>

      <form onSubmit={isEditing ? handleUpdateUser : handleAddUser} className="mb-4">
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
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            placeholder="Username"
            className="p-2 border rounded"
            required
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Password"
            className="p-2 border rounded"
            required
          />
          <input
            type="number"
            name="score"
            value={formData.score}
            onChange={handleInputChange}
            placeholder="Score"
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
            <th className="py-2 px-4 border-b">Username</th>
            <th className="py-2 px-4 border-b">Password</th>
            <th className="py-2 px-4 border-b">Score</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id} className="text-center">
              <td className="py-2 px-4 border-b">{user.name}</td>
              <td className="py-2 px-4 border-b">{user.username}</td>
              <td className="py-2 px-4 border-b">{user.password}</td>
              <td className="py-2 px-4 border-b">{user.score}</td>
              <td className="py-2 px-4 border-b">
                <button
                  className="text-green-500 hover:underline mr-2"
                  onClick={() => handleEditUser(user)}
                >
                  Edit
                </button>
                <button
                  className="text-red-500 hover:underline"
                  onClick={() => handleDeleteUser(user.id)}
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

export default UsersTable;
