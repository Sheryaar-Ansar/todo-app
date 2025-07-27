import React, { useEffect, useState } from 'react'
import { FaRegEdit } from 'react-icons/fa';
import { MdDelete } from "react-icons/md";
import { IoIosDoneAll } from "react-icons/io";

const ProductListing = ({ tasks, onTaskChange, page, setPage, pageSize }) => {
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editValues, setEditValues] = useState({ title: '', description: '' });
  const tasklists = tasks.taskList

  const handleUpdate = async (id) => {
    try {
      const res = await fetch(`http://localhost:3000/tasks/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(editValues)
      });

      if (!res.ok) throw new Error('Update failed');

      setEditingTaskId(null);
      setEditValues({ title: '', description: '' });
      onTaskChange();
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };
  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:3000/tasks/${id}`, {
        method: 'DELETE'
      });

      if (!res.ok) throw new Error('Delete failed');

      onTaskChange()
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };
  const handleComplete = async (id) => {
    try {
      const res = await fetch(`http://localhost:3000/tasks/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ isCompleted: true })
      });

      if (!res.ok) throw new Error('Failed to mark as complete');

      onTaskChange()
    } catch (error) {
      console.error('Error completing task:', error);
    }
  };
  const totalPages = Math.ceil(tasks.total / pageSize)


  useEffect(() => {
    console.log('Received tasks in ProductListing:', tasks);
  }, [tasks]);
  return (
    <div className="p-6 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Quanity Of Task */}
        <div className='grid grid-cols-2'>
          <h1 className='text-xl border rounded-l mx-3 px-2 py-3 bg-white border-gray-200 shadow-md shadow-gray-400 cursor-pointer font-bold font-mono'>Total: <span className='text-gray-600'>{tasks.total}</span></h1>
          <h1 className='text-xl border rounded-l mx-3 px-2 py-3 bg-white border-gray-200 shadow-md shadow-gray-400 cursor-pointer font-bold font-mono'>Completed: <span className='text-gray-600'>{tasks.completed}</span></h1>
        </div>
        <div className="space-y-4 mt-7">
          {tasklists.map((task, idx) => {
            return (
              <div
                key={idx}
                className="bg-white shadow-md rounded-lg p-4 flex justify-between items-start"
              >
                {/* Task Content */}
                <div className='text-left'>
                  <h1 className={`text-lg font-semibold text-gray-800 ${task.isCompleted ? 'text-green-400 line-through' : 'text-gray-800'}`}>{task.title}</h1>
                  <p className={`text-gray-600 mt-1 ${task.isCompleted ? 'text-green-400 line-through' : 'text-gray-800'}`}>{task.description}</p>
                </div>
                {editingTaskId === task._id && (
                  <div className="mt-2">
                    <input
                      type="text"
                      name="title"
                      value={editValues.title}
                      onChange={(e) => setEditValues({ ...editValues, title: e.target.value })}
                      className="border px-2 py-1 rounded w-full mb-2"
                    />
                    <textarea
                      name="description"
                      value={editValues.description}
                      onChange={(e) => setEditValues({ ...editValues, description: e.target.value })}
                      className="border px-2 py-1 rounded w-full mb-2"
                    />
                    <button
                      onClick={() => handleUpdate(task._id)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm mr-2"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingTaskId(null)}
                      className="bg-gray-300 hover:bg-gray-400 text-black px-3 py-1 rounded text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                )}

                {/* Buttons */}
                <div className="flex gap-2 ml-4">
                  {!task.isCompleted && (
                    <button
                      onClick={() => {
                        setEditingTaskId(task._id);
                        setEditValues({ title: task.title, description: task.description });
                      }}
                      className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded text-sm cursor-pointer"
                    >
                      <FaRegEdit />
                    </button>

                  )}
                  <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm cursor-pointer" onClick={() => handleDelete(task._id)}>
                    <MdDelete />
                  </button>
                  {!task.isCompleted && (
                    <button className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm cursor-pointer" onClick={() => handleComplete(task._id)}>
                      <IoIosDoneAll />
                    </button>
                  )}

                </div>
              </div>
            );
          })}
        </div>
        {/* Pagination */}
        <div className="flex justify-center mt-6 gap-4">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-400 rounded disabled:opacity-50 text-white cursor-pointer"
          >
            Previous
          </button>
          <span className="font-semibold">Page {page} of {totalPages}</span>
          <button
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-400 rounded disabled:opacity-50 text-white cursor-pointer"
          >
            Next
          </button>
        </div>
      </div>
    </div>

  )
}

export default ProductListing