import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Dashboard() {
    const [tasks, setTasks] = useState<any[]>([]); // State to hold tasks
    const [loading, setLoading] = useState<boolean>(false); // State to manage loading state
    const [error, setError] = useState<string>(''); // State to manage errors
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = localStorage.getItem('token'); // Store token in a variable

    // Check if the user is logged in
    if (!user || Object.keys(user).length === 0) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <h2 className="text-xl font-semibold text-gray-800">User not logged in. Please log in first.</h2>
            </div>
        );
    }

    // Logout function to clear local storage and redirect to login
    const Logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
    };

    const handleDelete = async (id: string) => {
        setLoading(true);
        setError('');
        try {
            const response = await axios.delete(
                `http://localhost:8080/api/v1/tasks/delete-task/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
    
            if (response.data.message) {
                alert(response.data.message);
                setTasks((prevTasks) => prevTasks.filter(task => task._id !== id)); // Remove only the deleted task
            } else {
                setError('Invalid data format received from API');
                console.error('Invalid data format:', response.data);
            }
        } catch (err) {
            setError('Error deleting task');
            console.error('Error during deleting task:', err);
        } finally {
            setLoading(false);
        }
    };
    const handleUpdate = async (id: string) => {
        setLoading(true);
        setError('');
    
        try {
            const response = await axios.put(
                `http://localhost:8080/api/v1/tasks/update-task/${id}`,
                {
                    title: "Updated Title",  // Modify with actual updated values
                    description: "Updated Description"
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
    
            if (response.data.message) {
                alert(response.data.message);
                // Update tasks state with the new updated task
                setTasks((prevTasks) =>
                    prevTasks.map(task => task._id === id ? { ...task, ...response.data.updatedTask } : task)
                );
            } else {
                setError('Invalid data format received from API');
                console.error('Invalid data format:', response.data);
            }
        } catch (err) {
            setError('Error updating task');
            console.error('Error during updating task:', err);
        } finally {
            setLoading(false);
            // Redirect after update
            window.location.href = `/createtasks/${id}`;
        }
    };
    
    
    const getTasks = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await axios.get('http://localhost:8080/api/v1/tasks/all', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            if (Array.isArray(response.data.tasks)) {
                setTasks(response.data.tasks);
            } else {
                setError('Invalid data format received from API');
                console.error('Invalid data format:', response.data);
            }
        } catch (err) {
            setError('Error fetching tasks');
            console.error('Error during fetching tasks:', err);
        } finally {
            setLoading(false);
        }
    };
    

    return (
        <div className="min-h-screen   p-6">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-semibold text-blue-700">Dashboard</h1>
                <nav>
                    <ul className="flex space-x-6 items-center">
                        <li className="text-lg font-medium text-blue-600 cursor-pointer hover:underline">Dashboard</li>
                        <li className="text-lg font-medium text-blue-600 cursor-pointer hover:underline">Profile</li>
                        <li className="text-lg font-medium text-blue-600 cursor-pointer hover:underline">Tasks</li>
                        <li
                            className="text-lg font-medium text-blue-600 cursor-pointer rounded-lg p-3 border-2 border-blue-500 hover:bg-blue-500 hover:text-white transition-all duration-300"
                            onClick={Logout}
                        >
                            Logout
                        </li>
                    </ul>
                </nav>
            </div>

            <hr className="border-gray-300 mb-6" />

            <div className="bg-white rounded-lg p-6 shadow-lg">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Welcome back, {user?.username || 'Guest'}!</h2>
                <p className="text-gray-600 text-lg">
                    You're logged in, and your dashboard is ready to explore. You can manage your profile, tasks, and more from here.
                </p>
            </div>

            {/* Display tasks section */}
            {loading ? (
                <div className="bg-white rounded-lg p-6 shadow-lg mt-6 text-center">
                    <p>Loading tasks...</p>
                </div>
            ) : error ? (
                <div className="bg-white rounded-lg p-6 shadow-lg mt-6 text-center text-red-500">
                    <p>{error}</p>
                </div>
            ) : (
                <div className="bg-white rounded-lg p-6 shadow-lg mt-6">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your Tasks</h2>
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold text-gray-700">Tasks List</h3>
                        <button
                            className="text-blue-600 font-medium hover:underline"
                            onClick={getTasks} // Refresh tasks on click
                        >
                            Refresh
                        </button>
                        <button
                            className="text-blue-600 font-medium hover:underline"
                            onClick={getTasks} // Refresh tasks on click
                        >
                         <a href='/createtasks'>Create Task</a>
                        </button>
                    </div>
                    <div className="space-y-4">
                        {tasks.length === 0 ? (
                            <p className='w-[100%] h-[100%]'>No tasks available.
                             <button type='submit' className='block w-[20%] h-[100%] bg-blue-200 p-4 rounded-xl justify-center items-center'><a href="/createtasks">Create Tasks</a></button>
                            </p>
                            
                        ) : (
                            tasks.map((task: any) => (
                                <div key={task.id} className="bg-gray-100 p-4 rounded-lg">
                                    <h4 className="text-lg font-semibold text-gray-800">{task.title}</h4>
                                    <p className="text-gray-600">{task.description}</p>
                                    <div className='flex justify-between'>
                                    <button type='submit' className='bg-red-500 text-white p-2 rounded-xl mt-4'>Delete</button>
                                    <button type='submit' className='bg-blue-500 text-white p-2 rounded-xl mt-4'>Edit</button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Dashboard;
