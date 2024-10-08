import React, { useEffect } from 'react';
import './Login.css';

const App = () => {
  useEffect(() => {
    
    window.google.accounts.id.initialize({
      client_id: '122135476318-du3spi1mi6rh5hu6b00ugqpl678kngg3.apps.googleusercontent.com',
      callback: handleCredentialResponse,
    });

    
    window.google.accounts.id.renderButton(
      document.getElementById('googleSignInDiv'),
      { theme: 'outline', size: 'large' } 
    );
  }, []);

  const handleCredentialResponse = (response) => {
    console.log('Encoded JWT ID token: ' + response.credential);
    
  };

  return (
    <div>
      <h1>Web App</h1>
      <div id="googleSignInDiv"></div> {}
    </div>
  );
};

function Login() {
  return (
    <h1>Login</h1>
  );
}

export default Login;