import React, { useEffect } from 'react';

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