import { useState } from 'react'
import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import AuthPage from './components/AuthComponents/AuthPage'
import TodoPage from './components/todoComponents/TodoPage'

function App() {
  const [isLoggedIn,setIsLoggedIn] = useState(false); 
  return (
    <div>
      <Routes>
        <Route path='/' element={isLoggedIn ? <Navigate to='/todo'/> : <Navigate to='/auth'/>} />
        <Route path='/auth' element={<AuthPage/>} />
        <Route path='/todo' element={<TodoPage/>} />
      </Routes>
    </div>
  )
}

export default App
