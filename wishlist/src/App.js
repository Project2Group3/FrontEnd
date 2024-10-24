import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AddItem from './pages/AddNewItem/AddNewItem.js';
import CreateAccount from './pages/CreateAccount/CreateAccount.js';
import EditItem from './pages/EditItem/EditItem.js';
import EditUser from './pages/EditUser/EditUser.js';
import Lists from './pages/Lists/Lists.js';
import Login from './pages/Login/Login.js';
import Admin from './pages/Admin/Admin.js';
import Home from './pages/Home/Home.js';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="page-top">
        <h1>Wishlist Api</h1>
      </div>
      <div className="nav-area">
        <Routes>
          <Route path="/AddNewItem" element={<AddItem />} />
          <Route path="/CreateAccount" element={<CreateAccount />} />
          <Route path="/EditItem" element={<EditItem />} />
          <Route path="/EditUser" element={<EditUser />} />
          <Route path="/Lists" element={<Lists />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Admin" element={<Admin />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
