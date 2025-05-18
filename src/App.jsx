import { createContext, useContext, useState } from 'react'
import { Navigate,Router, Route, Routes } from 'react-router-dom'
import AuthPage from './components/AuthComponents/AuthPage'
import TodoPage from './components/todoComponents/TodoPage'

function App() {
  const [isAuthenticated,setIsAuthenticated] = useState(
    localStorage.getItem('isAuthenticated') === 'true'
  ); 

  //create context
  const item = createContext('hello')

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated','true');
  }

  return (
    <div>
        <Routes>
          <Route path='/' element={isAuthenticated ? <Navigate to='/todo' replace/> : <Navigate to='/auth' replace/>}/>
          <Route path='/todo' element={isAuthenticated ? <TodoPage/> : <Navigate to='/auth' replace/>} />
          <Route path='/auth' element={isAuthenticated ? <Navigate to='/todo' replace/> : <AuthPage onLogin={handleLogin}/>}  />
        </Routes>
    </div>
  )
}

export default App
