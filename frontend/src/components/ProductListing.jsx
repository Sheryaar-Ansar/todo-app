import React, { useEffect, useState } from 'react'

const ProductListing = () => {
    const [tasks, setTasks] = useState([])
    const fetchProducts = async () => {
        try {
            const products = await fetch('http://localhost:3000/tasks');
            const res = await products.json()
            setTasks(res.tasks)
        } catch (error) {
            throw new error('Products Not Found', error)
        }
    }
    useEffect(()=>{
        fetchProducts()
    },[tasks])
  return (
<div className="p-6 min-h-screen">
  <div className="max-w-3xl mx-auto">
    <div className="space-y-4">
      {tasks.map((task, idx) => {
        return (
          <div
            key={idx}
            className="bg-white shadow-md rounded-lg p-4 flex justify-between items-start"
          >
            {/* Task Content */}
            <div>
              <h1 className="text-lg font-semibold text-gray-800">{task.title}</h1>
              <p className="text-gray-600 mt-1">{task.description}</p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-2 ml-4">
              <button className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded text-sm">
                Edit
              </button>
              <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm">
                Delete
              </button>
              <button className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm">
                Completed
              </button>
            </div>
          </div>
        );
      })}
    </div>
  </div>
</div>

  )
}

export default ProductListing
