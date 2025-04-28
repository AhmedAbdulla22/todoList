import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import LoginPage from './loginPage'
import TodoPage from './TodoPage'

function App() {
  return (
    <div>
      <Routes>
        <Route path='/login' element={<LoginPage/>} />
        <Route path='/todo' element={<TodoPage/>} />
      </Routes>
    </div>
  )
}

export default App
