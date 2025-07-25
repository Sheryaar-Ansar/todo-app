import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ProductCreation from './components/productCreation'
import ProductListing from './components/ProductListing'

function App() {
  return (
    <>
      <div className='bg-gray-100'>
        <ProductCreation />
        <ProductListing />
      </div>
    </>
  )
}

export default App
