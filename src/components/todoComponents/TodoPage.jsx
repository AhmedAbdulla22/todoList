import React, { useEffect, useState } from 'react'
import TodoCard from './todoCard';
import LoadingSpinner from '../Spinner';
import tasks from '../../todos.json'
import { Navigate, redirect, useNavigate } from 'react-router-dom';

const TodoPage = () => {

    const [allTodos,setAllTodos] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const [newTask,setNewTask] = useState('');

    const navigate = useNavigate();

    const handleSignOut = () => {
        localStorage.setItem('isAuthenticated','false');
        navigate('/auth',{replace: true})
    }
    //load Todos on mount
    useEffect(() => {
        const todos = JSON.parse(localStorage.getItem('todos'))
        console.log(todos)
        setAllTodos(todos);
        setIsLoading(false);
    },[])

    //handle updates
    const handleTodoUpdate = (id , updates) => {
        console.log(updates)
        setAllTodos(prevTodos => prevTodos.map(todo =>
            todo.id === id ? {...todo,...updates}:todo ))
    }

    //handle removing
    const handleTodoRemove = (id) => {
        setAllTodos(prev => prev.filter(todo => todo.id !== id));
    }

    //save todos
    useEffect(()=>{
        localStorage.setItem('todos',JSON.stringify(allTodos));
    },[allTodos])

    const addTodo = async () => {
        if(newTask.trim())
        {
            const todo = {
                "id": (allTodos.length) ? allTodos[allTodos.length - 1].id + 1:0,
                "description":newTask,
                "done":false
            }
            setAllTodos(prev => [...prev,todo])
            setNewTask('');//refresh input

            const res = await fetch('https://to-do-list-spa-express-94di.vercel.app');
            console.log(res)
        }
    }

  return (
    <div className="todos-container flex flex-col items-center justify-center h-[100vh] p-3">
        {/* <LoadingSpinner/> */}
        <div className='todos-wrapper border rounded-2xl flex flex-col items-center p-3 gap-2 min-[720px]:w-[700px] w-full overflow-hidden'>
            <h3 className='text-xl font-semibold'>Todo List App</h3>
            <div className="input-container flex text-sm     border rounded-2xl w-full overflow-hidden relative">
                
                    <input type="text" id="task-input" value={newTask} onChange={e => setNewTask(e.target.value)} className="border rounded-2xl accent-black border-none w-min-0 w-full py-1 px-2" placeholder='write a todo...'/>
                    <button className="rounded-2xl border-2 border-y-0 h-full py-1 px-2 cursor-pointer absolute right-0 w-20" onClick={addTodo}>Add</button>

            </div>

            <div className="border rounded-xl p-2 w-full h-80 overflow-auto">
                {isLoading && <LoadingSpinner/> ||
                allTodos.length !== 0 &&
                <ul className='flex flex-col divide-y'>
                    {allTodos.filter(todo => !todo.done).map((todo)=>
                        <TodoCard 
                        key={todo.id}
                        todo={todo}
                        onUpdate={handleTodoUpdate}
                        onRemove={handleTodoRemove}/>
                    )}    
                </ul>}
            </div>
            
            <div className='completed-todos-container border rounded-xl p-2 w-full overflow-auto'>
                <h3 className='text-20 text-center font-semibold'>Completed Todos</h3>
                {isLoading && <LoadingSpinner/> ||
                allTodos.length !== 0 &&
                <ul>
                    {allTodos.filter(todo => todo.done).map((todo)=>
                        <TodoCard 
                        key={todo.id}
                        todo={todo}
                        onUpdate={handleTodoUpdate}
                        onRemove={handleTodoRemove}/>
                    )}    
                </ul> || <div><p>Empty</p></div>}
            </div>
        </div>
            <div className="signOut-container  w-20 border border-black rounded-xl text-center absolute top-2 right-2">
                    <button className='signOut-button cursor-pointer' onClick={handleSignOut}>Sign Out</button>
            </div>  
    </div>
  )
}

export default TodoPage