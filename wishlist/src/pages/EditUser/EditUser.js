import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './EditUser.css';

const EditUser = () => {
    const [user, setUser] = useState({
        name: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (user.password !== user.confirmPassword) {
            alert("Passwords don't match!");
            return;
        }
        // Here you would typically send the update request to your API
        console.log('Updating user:', user);
        // Add your API call logic here
    };

    const handleDeleteAccount = () => {
        if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
            // Here you would typically send the delete request to your API
            console.log('Deleting account');
            // Add your API call logic here
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
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={user.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">New Password:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={user.password}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm New Password:</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={user.confirmPassword}
                            onChange={handleChange}
                        />
                    </div>
                    <button type="submit" className="update-btn">Update Profile</button>
                </form>
                <button onClick={handleDeleteAccount} className="delete-btn">Delete Account</button>
            </div>
        </div>
    );
};

export default EditUser;