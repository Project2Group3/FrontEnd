import { GoogleLogin } from '@react-oauth/google';  
import {jwtDecode} from 'jwt-decode';  
import Cookies from 'js-cookie'; 
import { useNavigate, Link } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();  

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
                    onSuccess={credentialResponse => {
                        const decoded = jwtDecode(credentialResponse.credential);
                        
                        console.log(decoded);

                        Cookies.set('user', JSON.stringify(decoded), { expires: 7 });  
                        console.log(Cookies.get('user'))

                        navigate('/');
                    }}
                    onError={() => {
                        console.log('Login Failed');
                    }}
                />
            </div>
        </div>
    );
}

export default Login;
