import React, { useState } from 'react';
import axios from 'axios';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.name === 'email') {
            setEmail(e.target.value);
        }else if(e.target.name ==='username'){
            setUsername(e.target.value);
        }
         else {
            setPassword(e.target.value);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();  // Prevent the default form submission behavior
        try {
            const response = await axios.post('http://localhost:8080/api/v1/register', {
                email,
                password,
                username
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data = response.data;
            alert(data.message);  // Display the message from the server
            window.location.href = '/login';  
        } catch (err) {
            console.error('Error during login:', err);
            alert('Registration failed, please try again!');
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-blue-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96">
               <div className='flex justify-between'>
               <h1 className="text-2xl font-bold text-left mb-6 text-gray-500"><a href="/login">Login</a></h1>
               <h1 className="text-2xl font-bold text-left mb-6 "><a href="/register">Register</a></h1>
               </div>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label htmlFor="email" className="sr-only">
                            Email
                        </label>
                        <input
                            type="text"
                            value={email}
                            name="email"
                            onChange={handleChange}
                            placeholder="Enter your email"
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                         <input
                            type="text"
                            value={username}
                            name="username"
                            onChange={handleChange}
                            placeholder="Enter your username"
                            className="w-full p-3 border border-gray-300 rounded-md mt-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            value={password}
                            name="password"
                            onChange={handleChange}
                            placeholder="Enter your password"
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="w-full p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Register
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
