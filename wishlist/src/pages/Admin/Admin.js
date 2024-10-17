import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Admin.css';

const Admin = () => {
    const [users, setUsers] = useState([
        { username: 'Test1', name: '', email: '', isAdmin: false },
        { username: 'Test2', name: '', email: '', isAdmin: false }
    ]);
    const [newUser, setNewUser] = useState({ username: '', name: '', email: '', isAdmin: false });
    const [updateUser, setUpdateUser] = useState({ username: '', name: '', email: '', isAdmin: true });

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = () => {
        // Implement GET request to [URL]/users
        console.log('Fetching all users');
    };

    const deleteUser = (username) => {
        if (window.confirm(`Are you sure you want to delete user ${username}?`)) {
            // Implement DELETE request to [URL]/users?username={username}
           
        }
    };

    const addUser = () => {
        // Implement PUT request to [URL]/users?username={username}&{...}
        console.log('Adding new user', newUser);
        
    };

    const updateUserHandler = () => {
        // Implement PATCH request to [URL]/users?username={username}&{...}
        
    };

    return (
        <div>
            <div className="header">
                <div>
                    <Link to="/">Home</Link>
                    <Link to="/AddNewItem">Add Item</Link>
                    <Link to="/EditItem">Edit List</Link>
                    <Link to="/Lists">Preview List</Link>
                    <Link to="/EditUser">User Settings</Link>
                    <Link to="/Admin">Admin</Link>
                </div>
                <Link to="/logout">Logout</Link>
            </div>

            <div className="container">
                <div className="section">
                    <h2>Users List</h2>
                    <table id="usersTable">
                        <thead>
                            <tr>
                                <th>Username</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user.username}>
                                    <td>{user.username}</td>
                                    <td><button className="delete-btn" onClick={() => deleteUser(user.username)}>Delete User</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="section">
                    <h2>Add User</h2>
                    <input type="text" value={newUser.username} onChange={(e) => setNewUser({...newUser, username: e.target.value})} placeholder="Username" />
                    <input type="text" value={newUser.name} onChange={(e) => setNewUser({...newUser, name: e.target.value})} placeholder="Name" />
                    <input type="email" value={newUser.email} onChange={(e) => setNewUser({...newUser, email: e.target.value})} placeholder="Email" />
                    <select value={newUser.isAdmin} onChange={(e) => setNewUser({...newUser, isAdmin: e.target.value === 'true'})}>
                        <option value="false">Not Admin</option>
                        <option value="true">Is Admin</option>
                    </select>
                    <button onClick={addUser}>Add User</button>

                    <h2>Update User</h2>
                    <input type="text" value={updateUser.username} readOnly />
                    <input type="text" value={updateUser.name} onChange={(e) => setUpdateUser({...updateUser, name: e.target.value})} />
                    <input type="email" value={updateUser.email} onChange={(e) => setUpdateUser({...updateUser, email: e.target.value})} />
                    <select value={updateUser.isAdmin} onChange={(e) => setUpdateUser({...updateUser, isAdmin: e.target.value === 'true'})}>
                        <option value="false">Not Admin</option>
                        <option value="true">Is Admin</option>
                    </select>
                    <button onClick={updateUserHandler}>Update</button>
                </div>
            </div>
        </div>
    );
};

export default Admin;