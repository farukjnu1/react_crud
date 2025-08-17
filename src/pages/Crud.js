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
      <h2 className="text-primary">CRUD</h2>
      <div class="form-group">
        <label for="exampleInputEmail1">Name</label>
        <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter name" className='form-control' id='name' aria-describedby="name"
      />
        <small id="name" class="form-text text-muted">We can share your name with anyone.</small>
      </div>
      <button onClick={editingUser ? updateUser : addUser} className={editingUser ? "btn btn-secondary" : "btn btn-primary"}>
        {editingUser ? 'Update' : 'Add'}
      </button>

      <table className='table table-bordered'>
        <thead>
          <tr>
            <th>Name</th>
            <th>#</th>
            <th>#</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
          <tr key={u.id}>
            <td>{u.name}</td>
            <td>
              <button onClick={() => {
              setEditingUser(u);
              setName(u.name);
              }} className="btn btn-success">Edit</button>
            </td>
            <td>
              <button onClick={() => deleteUser(u.id)} className="btn btn-danger">Delete</button>
            </td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
}

export default Crud;
