import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import './EditUser.css';
const EditUser = () => {

    const navigate = useNavigate();
    const [message, setMessage] = useState('');
    const [newUserName, setNewUserName] = useState('');
    const [newImage, setNewImage] = useState('');
    const user = JSON.parse(Cookies.get('user') || '{}');


    const handleSubmit = async (e) => {
        e.preventDefault();

        const updateData ={};
        if(newUserName!=='' && newImage!=='' ){
            updateData.username=newUserName;
            updateData.image=newImage;
        }
        else if (newUserName !== ''){
            updateData.username=newUserName;
        }
        else if (newImage !== ''){
            updateData.image=newImage;
        }

        console.log("UPDATE:",updateData)
        try {
            console.log('Updating user:', user);
            await axios.patch(
                `https://publish-0341c21de65c.herokuapp.com/users/${user.id}`,
                updateData,
                {
                    headers:{
                        'User-Id' :user.id
                    }
                }
            );
            setMessage('Profile updated successfully');
        } catch (error) {
            console.error('Error updating user:', error);
            setMessage('Failed to update profile');
        }
    };

    const handleDeleteAccount = async (userId) => {
        if (!window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) return;
        
        try {
            await axios.delete(
                `https://publish-0341c21de65c.herokuapp.com/users/${userId}`,
                {
                    headers:{
                        'User-Id' :user.id
                    }
                }
            );
            setMessage('Failed to update profile');
            // Cookies.remove('user');
            navigate('/login');
        } catch (error) {
            console.error('Error deleting user:', error);
            setMessage('Failed to delete account');
            // setError('Failed to delete user');
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
            {user.is_admin && <Link to="/Admin" className="nav-link">Admin</Link>}
        </div>
    </div>
</nav>
            <div className="edit-user-container">
                <h2>Edit User Profile</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">New Username:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={newUserName}
                            onChange={(e) => setNewUserName(e.target.value)}
                            placeholder='Enter New Username'
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="image">New Image URL:</label>
                        <input
                            type="text"
                            id="image"
                            name="image"
                            value={newImage}
                            onChange={(e) => setNewImage(e.target.value)}
                            placeholder='Enter New Image Link'
                        />
                    </div>
                    <button type="submit" className="update-btn">Update Profile</button>
                </form>
                <button onClick={() => handleDeleteAccount(user.id)} className="delete-btn">Delete Account</button>
                {message && <div className="message">{message}</div>}
            </div>
        </div>
    );
};

export default EditUser;