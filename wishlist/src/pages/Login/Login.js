import { GoogleLogin } from '@react-oauth/google';  
import {jwtDecode} from 'jwt-decode';  
import Cookies from 'js-cookie'; 
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

function Login() {
    const navigate = useNavigate();  

    const handleGoogleLoginSuccess = async (credentialResponse) => {
        const decoded = jwtDecode(credentialResponse.credential);

        // Log the user info pulled from Google OAuth
        console.log('Decoded user info:', decoded);

        const userData = {
            name: decoded.name,
            email: decoded.email,
            username: decoded.given_name,
            image: decoded.picture,
        };

        try {
            // Check if user exists and log user data to console
            console.log('User data to send to backend:', userData);

            const response = await axios.post('https://publish-0341c21de65c.herokuapp.com/users/login/', userData);
            console.log('Response from backend:', response.data);

            Cookies.set('user', JSON.stringify(response.data), { expires: 7 });
            navigate('/');
        } catch (error) {
            console.error('Login error:', error);
            alert('An error occurred during login.');
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-indigo-600">
            <div className="header">
                <Link to="/">Home</Link>
                <Link to="/AddNewItem">Add Item</Link>
                <Link to="/EditItem">Edit List</Link>
                <Link to="/Lists">Preview List</Link>
                <Link to="/EditUser">User Settings</Link>
                <Link to="/Admin">Admin</Link>
            </div>
            <div className="w-96 p-6 shadow-lg bg-white rounded-md">
                <h1 className="text-3xl block text-center font-semibold">
                    <i className="fa-solid fa-user"></i> Login using Google
                </h1>
                <hr className="mt-3" />
                <GoogleLogin
                    onSuccess={handleGoogleLoginSuccess}
                    onError={() => {
                        console.log('Login Failed');
                    }}
                />
            </div>
        </div>
    );
}

export default Login;
