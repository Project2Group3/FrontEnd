import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import './Home.css';

function Home() {
    // Initialize user state
    const [user, setUser] = useState(null);

    // On component mount, retrieve the cookie and set the user state
    useEffect(() => {
        const userCookie = Cookies.get('user');
        if (userCookie) {
            setUser(JSON.parse(userCookie));  // Parse and set user
        } else {
            console.log("No user cookie found.");
        }
    }, []);

    return (
        <div>
            {user && (
                <div className="top-right">
                    <p>Welcome, {user.given_name} {user.family_name}!</p>
                </div>
            )}

            <div>
                <Link to="/CreateAccount">
                    <button>Create New Account</button>
                </Link>
                <Link to="/Login">
                    <button>Login</button>
                </Link>
                <Link to="/AddNewItem">
                    <button>Add Item</button>
                </Link>
                <Link to="/EditItem">
                    <button>Edit Item</button>
                </Link>
                <Link to="/Lists">
                    <button>Lists</button>
                </Link>
                <Link to="/EditUser">
                    <button>Edit User</button>
                </Link>
                <Link to="/Admin">
                    <button>Admin</button>
                </Link>
            </div>
        </div>
    );
}

export default Home;
