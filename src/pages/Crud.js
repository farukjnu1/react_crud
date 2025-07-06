// src/pages/Crud.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/users';

function Crud() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [editingUser, setEditingUser] = useState(null);

  // Read
  useEffect(() => {
    axios.get(API_URL).then((res) => setUsers(res.data));
  }, []);

  // Create
  const addUser = () => {
    if (!name) return;
    axios.post(API_URL, { name }).then((res) => {
      setUsers([...users, res.data]);
      setName('');
    });
  };

  // Update
  const updateUser = () => {
    axios.put(`${API_URL}/${editingUser.id}`, { name }).then((res) => {
      setUsers(users.map((u) => (u.id === res.data.id ? res.data : u)));
      setEditingUser(null);
      setName('');
    });
  };

  // Delete
  const deleteUser = (id) => {
    axios.delete(`${API_URL}/${id}`).then(() => {
      setUsers(users.filter((u) => u.id !== id));
    });
  };

  return (
    <div style={{ padding: '10px' }}>
      <h2>CRUD</h2>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter name"
      />
      <button onClick={editingUser ? updateUser : addUser}>
        {editingUser ? 'Update' : 'Add'}
      </button>

      <ul>
        {users.map((u) => (
          <li key={u.id}>
            {u.name}
            <button onClick={() => {
              setEditingUser(u);
              setName(u.name);
            }}>Edit</button>
            <button onClick={() => deleteUser(u.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Crud;
