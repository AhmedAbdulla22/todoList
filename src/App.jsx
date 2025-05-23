import {  useEffect, useState } from 'react'
import { Navigate,Router, Route, Routes, useNavigate } from 'react-router-dom'
import AuthPage from './components/AuthComponents/AuthPage'
import TodoPage from './components/todoComponents/TodoPage'

function App() {
    const navigate = useNavigate();
  const [isAuthenticated,setIsAuthenticated] = useState(
    localStorage.getItem('isAuthenticated') === 'true'
  ); 


  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated','true');
  }


  return (
    <div>
        <Routes>
          <Route path='/' element={isAuthenticated ? <Navigate to='/todo' replace/> : <Navigate to='/auth' replace/>}/>
          <Route path='/todo' element={isAuthenticated ? <TodoPage setIsAuthenticated={setIsAuthenticated}/> : <Navigate to='/auth' replace/>} />
          <Route path='/auth' element={isAuthenticated ? <Navigate to='/todo' replace/> : <AuthPage onLogin={handleLogin}/>}  />
        </Routes>
    </div>
  )
}

export default App
