import React, { useState } from 'react'

const ProductCreation = ({ onTaskAdded }) => {
    const [task, setTask] = useState({
        title: '',
        description: ''
    })
    const [error, setError] = useState('')
    const handleChange = (e) => {
        const { name, value } = e.target;
        setTask((prev) => ({
            ...prev,
            [name]: value
        }));
        setError('')
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3000/tasks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title: task.title,
                    description: task.description
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                setError(errorData?.error || 'Failed to create task');
                return;
            }
            if(response.ok){
                alert('Task Is Added')
            }

            setTask({
                title: '',
                description: ''
            })

            setError('')
            onTaskAdded()
        } catch (error) {
            console.error('Error creating task', error)
        }
    }

    return (
        <div className="flex justify-center mt-8">
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-full max-w-6xl">
                <h2 className="text-xl font-bold mb-4 text-center">Add New Task</h2>
                <div className="mb-4">
                    <input
                        type="text"
                        name='title'
                        value={task.title}
                        placeholder="Enter task title"
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 font-bold mb-2">Description</label>
                    <textarea
                        name="description"
                        value={task.description}
                        onChange={handleChange}
                        placeholder="Enter task description"
                        rows={3}
                        className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="flex justify-center">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none"
                    >
                        Add Task
                    </button>
                </div>
                {error && (
                    <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4 text-center">
                        {error}
                    </div>
                )}
            </form>
        </div>
    )
}

export default ProductCreation
