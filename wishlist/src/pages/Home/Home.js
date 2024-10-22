import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div>
      <Link to="/CreateAccount">
        <button>Create New Account</button>
      </Link>
      <Link to="/Login">
        <button>Login</button>
      </Link>
      <Link to="/AddNewItem/">
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
  );
}

export default Home;

