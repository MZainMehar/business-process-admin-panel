import React, { useState } from 'react';

const TasksTable = () => {
  const [tasks, setTasks] = useState([]);
  const [formData, setFormData] = useState({ id: null, name: '', description: '', deadline: '' });
  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    const newTask = { ...formData, id: tasks.length + 1 };
    setTasks([...tasks, newTask]);
    setFormData({ id: null, name: '', description: '', deadline: '' });
  };

  const handleEditTask = (task) => {
    setIsEditing(true);
    setFormData(task);
  };

  const handleUpdateTask = (e) => {
    e.preventDefault();
    setTasks(tasks.map(tsk => tsk.id === formData.id ? formData : tsk));
    setIsEditing(false);
    setFormData({ id: null, name: '', description: '', deadline: '' });
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter(tsk => tsk.id !== id));
  };

  return (
    <div className="bg-white shadow-md rounded p-4">
      <h2 className="text-2xl font-bold mb-4">Tasks</h2>

      <form onSubmit={isEditing ? handleUpdateTask : handleAddTask} className="mb-4">
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
            type="date"
            name="deadline"
            value={formData.deadline}
            onChange={handleInputChange}
            placeholder="Deadline"
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
            <th className="py-2 px-4 border-b">Deadline</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map(task => (
            <tr key={task.id} className="text-center">
              <td className="py-2 px-4 border-b">{task.name}</td>
              <td className="py-2 px-4 border-b">{task.description}</td>
              <td className="py-2 px-4 border-b">{task.deadline}</td>
              <td className="py-2 px-4 border-b">
                <button
                  className="text-green-500 hover:underline mr-2"
                  onClick={() => handleEditTask(task)}
                >
                  Edit
                </button>
                <button
                  className="text-red-500 hover:underline"
                  onClick={() => handleDeleteTask(task.id)}
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

export default TasksTable;
