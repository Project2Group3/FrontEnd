import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import './Admin.css';
import Cookies from 'js-cookie';
import axios from 'axios';

const Admin = () => {
    const [users, setUsers] = useState([]);
    const [newUser, setNewUser] = useState({ username: '', name: '', email: '', isAdmin: false });
    const [updateUser, setUpdateUser] = useState({ username: '', name: '', email: '', isAdmin: true });

    const user = JSON.parse(Cookies.get('user') || '{}');
    console.log(user);

    const fetchUsers = useCallback (async () => {
        console.log( user.is_admin ? 'true' : 'false');
        try{
            const response = await axios.get('https://publish-0341c21de65c.herokuapp.com/users/',{
                headers: {
                    'Is-Admin': user.is_admin ? 'true' : 'false'
                    
                }
            }
        );
        setUsers(response.data)
        } catch (error){
            console.error("Error getting User", error);
            if(error.response && error.response.status === 403){
                alert("Admin Only!")
            }
        }
    }, [user.is_admin]);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    const deleteUser = async (id) => {
        if (window.confirm(`Are you sure you want to delete user ${id}?`)) {
            try{
                await axios.delete(`https://publish-0341c21de65c.herokuapp.com/admin/users/${id}/delete/` , {
                    headers: {
                        'Is-Admin' : user.is_admin ? 'true' : 'false'
                    }
                });
                alert('User deleted successfully');
                fetchUsers();
            }catch (error){
                console.error("Error deleting", error);
                if(error.response && error.response.status === 403){
                    alert("Admin Only!");
                }
                else if(error.response && error.response.status === 404){
                    alert("User not found");
                }
                else{
                    alert("Error occured when deleting User")
                }
            }
           
        }
    };

    const addUser = async () => {

        if(!newUser.username || !newUser.name || !newUser.email){
            alert("All fields are required")
        }

        const userData = {
            username: newUser.username,
            name: newUser.name,
            email: newUser.email,
            is_admin: newUser.isAdmin
        };

        try{
            const response = await axios.post(`https://publish-0341c21de65c.herokuapp.com/admin/users/create/`, userData, {
                headers: {
                    'is_admin': user.is_admin ? 'true' : 'false'
                }
            });
            alert("user craeted");
            set([...users, response.data]);
            setNewUser({username:'',name:'',email:'',isAdmin:false});
        } catch(error){
            console.error("Error creating user", error);
            if(error.response && error.response.status === 403){
                alert("admin only");
            }else{
                alert("An error occured");
            }
        }
        
    };

    const updateUserHandler = async () => {
        if(!updateUser.id){
            alert("Please enter the user ID to update");
            return;
        }
        const updateData = {};
        if (updateUser.username) updateData.username = updateUser.username;
        if (updateUser.name) updateData.name = updateUser.name;
        if (updateUser.email) updateData.email = updateUser.email;
        updateData.is_admin = updateUser.isAdmin;

        try{
            await axios.patch(`https://publish-0341c21de65c.herokuapp.com/admin/users/${updateUser.id}/update/` ,updateData,{
                headers: {
                    'Is-Admin' : user.is_admin ? 'true' : 'false'
                }
            });
            alert("User Updated");
            fetchUsers();
        }catch(error){
            console.error("Error updating user", error);
            if(error.response && error.response.status === 403){
                alert("Admin Only!");
            }
            else if(error.response && error.response.status === 404){
                alert("User not found");
            }
            else{
                alert("An error occurred while updating the user")
            }
        }
        
    };

    return (
        <div>
            <nav className="nav-container">
    <div className="nav-content">
        <Link to="/" className="nav-brand">
            Wishlist API
        </Link>
        <div className="nav-links">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/Lists" className="nav-link">Lists</Link>
            <Link to="/UpdateUserInfo" className="nav-link">Update UserInfo</Link>
            {/* {user.is_admin && <Link to="/Admin" className="nav-link">Admin</Link>} */}
        </div>
    </div>
</nav>

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
                                    <td>
                                    <button className="delete-btn" onClick={() => deleteUser(user.id)}>
                                            Delete User
                                        </button>
                                    </td>
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
                    <input
                        type="text"
                        value={updateUser.id}
                        onChange={(e) => setUpdateUser({ ...updateUser, id: e.target.value })}
                        placeholder="User ID"
                    />
                    <input
                        type="text"
                        value={updateUser.username}
                        onChange={(e) => setUpdateUser({ ...updateUser, username: e.target.value })}
                        placeholder="Username"
                    />
                    <input
                        type="text"
                        value={updateUser.name}
                        onChange={(e) => setUpdateUser({ ...updateUser, name: e.target.value })}
                        placeholder="Name"
                    />
                    <input
                        type="email"
                        value={updateUser.email}
                        onChange={(e) => setUpdateUser({ ...updateUser, email: e.target.value })}
                        placeholder="Email"
                    />
                    <select
                        value={updateUser.isAdmin}
                        onChange={(e) => setUpdateUser({ ...updateUser, isAdmin: e.target.value === 'true' })}
                    >
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