import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

function Login() {
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleGoogleLoginSuccess = async (credentialResponse) => {
        try {
            const decoded = jwtDecode(credentialResponse.credential);
            console.log('Decoded user info:', decoded);
            
            const userData = {
                name: decoded.name,
                email: decoded.email,
                username: decoded.given_name,
                image: decoded.picture,
            };
            
            console.log('User data to send to backend:', userData);
            
            const response = await axios.post(
                'https://publish-0341c21de65c.herokuapp.com/users/login/',
                userData
            );
            
            console.log('Response from backend:', response.data);
            
            Cookies.set('user', JSON.stringify(response.data), { expires: 7 });
            navigate('/');
            
        } catch (error) {
            console.error('Login error:', error);
            setError('An error occurred during login. Please try again.');
        }
    };

    return (
        <div className="login-container">
            <div className="login-content">
                <div className="login-card">
                    <div className="brand">
                        <h1>Wishlist</h1>
                        <div className="brand-subtitle">Your dreams, organized</div>
                    </div>

                    <div className="login-header">
                        <h2>Welcome Back</h2>
                        <p>Sign in to continue to your wishlist</p>
                    </div>

                    <div className="google-login-wrapper">
                        <GoogleLogin
                            onSuccess={handleGoogleLoginSuccess}
                            onError={() => {
                                setError('Login failed. Please try again.');
                                console.log('Login Failed');
                            }}
                        />
                    </div>

                    {error && <div className="error-message">{error}</div>}

                    <div className="terms-section">
                        <p>By signing in, you agree to our</p>
                        <div className="terms-links">
                            <a href="#" className="terms-link">Terms of Service</a>
                            <span>and</span>
                            <a href="#" className="terms-link">Privacy Policy</a>
                        </div>
                    </div>
                </div>

                <div className="decorative-pattern"></div>
            </div>
        </div>
    );
}

export default Login;