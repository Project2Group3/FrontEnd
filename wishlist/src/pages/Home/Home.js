import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import './Home.css';

function Home() {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const userCookie = Cookies.get('user');
        if (userCookie) {
            try {
                const userData = JSON.parse(userCookie);
                setUser(userData);
            } catch (error) {
                console.error('Error parsing user cookie:', error);
            }
        }
        setIsLoading(false);
    }, []);

    const handleLogout = () => {
        Cookies.remove('user');
        navigate('/login');
    };

    if (isLoading) {
        return (
            <div className="loading-container">
                <div className="loader"></div>
                <p>Loading...</p>
            </div>
        );
    }

    return (
        <div className="home-container">
            <nav className="home-nav">
                <div className="nav-brand">Wishlist API</div>
                {user && (
                    <div className="user-profile">
                        {user.image && (
                            <img 
                                src={user.image} 
                                alt={user.name} 
                                className="profile-image"
                            />
                        )}
                        <div className="user-info">
                            <span className="user-name">{user.name}</span>
                            <button onClick={handleLogout} className="logout-button">
                                Logout
                            </button>
                        </div>
                    </div>
                )}
            </nav>

            <main className="home-main">
                {!user ? (
                    <div className="welcome-section">
                        <h1>Welcome to Wishlist</h1>
                        <p>Create and manage your wishlists with ease</p>
                        <div className="auth-buttons">
                            <Link to="/login" className="primary-button">
                                Login
                            </Link>
                            <Link to="/createaccount" className="secondary-button">
                                Create Account
                            </Link>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="welcome-back">
                            <h1>Welcome back, {user.name}!</h1>
                            <p>What would you like to do today?</p>
                        </div>

                        <div className="features-grid">
                            <Link to="/AddNewItem" className="feature-card">
                                <div className="feature-icon">➕</div>
                                <h3>Add New Item</h3>
                                <p>Add items to your wishlist</p>
                            </Link>

                            <Link to="/Lists" className="feature-card">
                                <div className="feature-icon">📋</div>
                                <h3>My Lists</h3>
                                <p>View and manage your lists</p>
                            </Link>

                            <Link to="/EditItem" className="feature-card">
                                <div className="feature-icon">✏️</div>
                                <h3>Edit Items</h3>
                                <p>Modify your wishlist items</p>
                            </Link>

                            <Link to="/EditUser" className="feature-card">
                                <div className="feature-icon">👤</div>
                                <h3>Profile Settings</h3>
                                <p>Update your account details</p>
                            </Link>

                            {user.is_admin && (
                                <Link to="/Admin" className="feature-card admin-card">
                                    <div className="feature-icon">⚙️</div>
                                    <h3>Admin Panel</h3>
                                    <p>Manage system settings</p>
                                </Link>
                            )}
                        </div>
                    </>
                )}
            </main>

            <footer className="home-footer">
                <p>&copy; 2024 Wishlist API. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default Home;