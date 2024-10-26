import React, { useEffect } from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import AddItem from './pages/AddNewItem/AddNewItem.js';
import CreateAccount from './pages/CreateAccount/CreateAccount.js';
import EditItem from './pages/EditItem/EditItem.js';
import EditUser from './pages/EditUser/EditUser.js';
import Lists from './pages/Lists/Lists.js';
import Login from './pages/Login/Login.js';
import Admin from './pages/Admin/Admin.js';
import Home from './pages/Home/Home.js';
import Cookies from 'js-cookie';
import './App.css';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const user = Cookies.get('user');
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in when app loads
    const user = Cookies.get('user');
    if (!user && window.location.pathname !== '/login' && window.location.pathname !== '/createaccount') {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div className="App">
      <div className="page-top">
        <h1>Wishlist Api</h1>
      </div>
      <div className="nav-area">
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/createaccount" element={<CreateAccount />} />

          {/* Protected routes */}
          <Route path="/" element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />
          <Route path="/addnewitem" element={
            <ProtectedRoute>
              <AddItem />
            </ProtectedRoute>
          } />
          <Route path="/edititem" element={
            <ProtectedRoute>
              <EditItem />
            </ProtectedRoute>
          } />
          <Route path="/edituser" element={
            <ProtectedRoute>
              <EditUser />
            </ProtectedRoute>
          } />
          <Route path="/lists" element={
            <ProtectedRoute>
              <Lists />
            </ProtectedRoute>
          } />
          <Route path="/admin" element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          } />

          {/* Redirect all unknown routes to home if authenticated, login if not */}
          <Route path="*" element={
            <ProtectedRoute>
              <Navigate to="/" replace />
            </ProtectedRoute>
          } />
        </Routes>
      </div>
    </div>
  );
}

export default App;