import React, { useEffect, useState } from 'react'
import todos from '../../todos.json'; 
import TodoCard from './todoCard';
import LoadingSpinner from '../Spinner';

const TodoPage = () => {

    const [allTodos,setAllTodos] = useState([])
    const [isLoading, setIsLoading] = useState(true);

    //load Todos
    useEffect(() => {
        setAllTodos(todos);
        setIsLoading(false);
    },[])

    const handleTodoUpdate = (id , updates) => {
        console.log(updates)
        setAllTodos(prevTodos => prevTodos.map(todo =>
            todo.id === id ? {...todo,...updates}:todo ))
    }

    const handleTodoRemove = (id) => {
        setAllTodos(prev => prev.filter(todo => todo.id !== id));
    }



  return (
    <div className="todos-container flex flex-col items-center justify-center h-[100vh] p-3">
        {/* <LoadingSpinner/> */}
        <div className='todos-wrapper border rounded-2xl flex flex-col items-center p-3 gap-2 min-[720px]:w-[700px] w-full overflow-hidden'>
            <h3 className='text-xl font-semibold'>Todo List App</h3>
            <div className="input-container flex text-sm gap-1 border rounded-xl p-2 w-full overflow-hidden">
                <input type="text" className="border rounded-2xl accent-black border-gray-600 w-min-0 w-full py-1 px-2" placeholder='write a todo...'/>
                <input type="date" className="border rounded-2xl accent-black border-gray-600 w-8 py-1 px-1  cursor-pointer" />
                <button className="border rounded-2xl border-gray-600 py-1 px-2 cursor-pointer">Add</button>
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
    </div>
  )
}

export default TodoPage
