import React, { useEffect, useState } from 'react'
import TodoCard from './todoCard';
import {  useNavigate } from 'react-router-dom';
import {handleTodoUpdate,handleTodoRemove,addNewTodo,handleTodosRead} from './todoHandlers'



const TodoPage = ({setIsAuthenticated}) => {

    const navigate = useNavigate();
    const [allTodos,setAllTodos] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const [newTask,setNewTask] = useState('');


    const handleSignOut = () => {
        localStorage.setItem('isAuthenticated','false');
        setIsAuthenticated(false);
        navigate('/auth',{replace: true})
    }

    //load Todos on mount
    useEffect(() => {
        handleTodosRead(setAllTodos);
        setIsLoading(false);
    },[])

    

    //save todos
    useEffect(()=>{
        localStorage.setItem('todos',JSON.stringify(allTodos));
    },[allTodos])

    

  return (
    <div className="todos-container flex flex-col items-center justify-center h-[100vh] p-3">
        
        <div className='todos-wrapper border rounded-2xl flex flex-col items-center p-3 gap-2 min-[720px]:w-[700px] w-full overflow-hidden'>
            <h3 className='text-xl font-semibold'>Todo List App</h3>
            <div className="input-container flex text-sm     border rounded-2xl w-full overflow-hidden relative">
                
                    <input type="text" id="task-input" value={newTask} onChange={e => setNewTask(e.target.value)} className="border rounded-2xl accent-black border-none w-min-0 w-full py-1 px-2" placeholder='write a todo...'/>
                    <select className='absolute right-20 w-20 border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 min-w-0 w-15 w-max-10' placeholder='Priority'>
                        <option value='' selected disabled >Priority</option>
                        <option className='bg-[color:var(--low-priority-color)]' value='3' >low</option>
                        <option className='bg-[color:var(--medium-priority-color)]' value='2'>medium</option>
                        <option className='bg-[color:var(--high-priority-color)]' value='1'>high</option>
                    </select>
                    <button className="rounded-2xl border-2 border-y-0 h-full py-1 px-2 cursor-pointer absolute right-0 w-20" onClick={()=> addNewTodo(newTask,setNewTask,allTodos,setAllTodos)}>Add</button>

            </div>

            <div className="border rounded-xl p-2 w-full h-80 overflow-auto">
                {isLoading ||
                allTodos.length !== 0 &&
                <ul className='flex flex-col divide-y'>
                    {allTodos.filter(todo => !todo.done).map((todo)=>
                        <TodoCard 
                        key={todo.todoid}
                        todo={todo}
                        onUpdate={handleTodoUpdate}
                        onRemove={handleTodoRemove}
                        setAllTodos={setAllTodos}/>
                    )}    
                </ul>}
            </div>
            
            <div className='completed-todos-container border rounded-xl p-2 w-full overflow-auto'>
                <h3 className='text-20 text-center font-semibold'>Completed Todos</h3>
                {isLoading  ||
                allTodos.length !== 0 &&
                <ul>
                    {allTodos.filter(todo => todo.done).map((todo)=>
                        <TodoCard 
                        key={todo.todoid}
                        todo={todo}
                        onUpdate={handleTodoUpdate}
                        onRemove={handleTodoRemove}
                        setAllTodos={setAllTodos}/>
                        
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