import React, { useState } from 'react';
import axios from 'axios';

function Createtasks() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === 'title') {
            setTitle(value);
        } else if (name === 'description') {
            setDescription(value);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); // Prevent form default submission behavior

        if (!user || !user._id) {
            alert("User not found. Please log in again.");
            return;
        }

        try {
            const response = await axios.post(
                'http://localhost:8080/api/v1/tasks/add',
                {
                    title,
                    description,
                    user: user._id, // Ensure _id is correct in your backend
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            alert(response.data.message || 'Task created successfully!');
            window.location.href = '/'; // Redirect after successful task creation
        } catch (err: any) {
            console.error('Error during task creation:', err);
            alert(err.response?.data?.message || 'An error occurred while creating the task.');
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-blue-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                <div className="flex justify-between">
                    <h1 className="text-2xl font-bold text-left mb-6">Create Task</h1>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="title" className="sr-only">
                            Title
                        </label>
                        <input
                            type="text"
                            value={title}
                            name="title"
                            onChange={handleChange}
                            placeholder="Enter task Title"
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="description" className="sr-only">
                            Description
                        </label>
                        <input
                            type="text"
                            value={description}
                            name="description"
                            onChange={handleChange}
                            placeholder="Enter task description"
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="w-full p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Add
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Createtasks;
