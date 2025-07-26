import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ProductCreation from './components/ProductCreation'
import ProductListing from './components/ProductListing'

function App() {
  const [tasks, setTasks] = useState({
    total: '',
    completed: '',
    taskList: []
  })
  const [page, setPage] = useState(1)
  const pageSize = 5
    const fetchTasks = async () => {
    try {
      const fetchTask = await fetch(`http://localhost:3000/tasks?page=${page}&pageSize=${pageSize}`);
      const res = await fetchTask.json();      
      setTasks({
        total: res.total,
        completed: res.completed,
        taskList: res.tasks
      })
    } catch (error) {
      throw new Error('Products Not Found', error)
    }
  }
console.log('Page No: ', page);

  
  useEffect(()=>{
    fetchTasks()
  },[page])
  return (
    <>
      <div className='bg-gray-100'>
        <ProductCreation onTaskAdded = {fetchTasks}/>
        <ProductListing tasks={tasks} onTaskChange={fetchTasks} page={page} pageSize={pageSize} setPage={setPage}/>
      </div>
    </>
  )
}

export default App
