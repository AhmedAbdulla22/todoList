import React, { useEffect, useState } from 'react'
import TodoCard from './todoCard';
import {  useNavigate } from 'react-router-dom';
import {handleTodoUpdate,handleTodoRemove,addNewTodo,handleTodosRead,sortTodos} from './todoHandlers'
import { FaFlag } from "react-icons/fa";
import { MdDateRange } from "react-icons/md";



const TodoPage = ({setIsAuthenticated}) => {

    const navigate = useNavigate();
    const [allTodos,setAllTodos] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const [newTask,setNewTask] = useState({
        description:'',
        date:'',
        priority:3,//3 by default is low
    });

    const handleChange = (e) => {
            const {name,value} = e.target;
            setNewTask(prev => ({...prev, [name]:value}));
    }


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
        
        <div className='todos-wrapper border rounded-2xl flex flex-col items-center p-3 gap-2 min-[720px]:w-[700px] w-full overflow-hidden [box-shadow:0_5px_15px_0_rgb(0,0,0,0.5)]'>
            <h3 className='text-xl font-semibold'>Todo List App</h3>
            <div className="input-container flex text-sm border rounded-xl w-full overflow-hidden relative items-center gap-1 [box-shadow:inset_0_0px_5px_0_rgb(0,0,0,0.3)]">
                
                         <input type="text"
                         id="task-input"
                         name='description'
                         value={newTask.description}
                         onChange={handleChange}
                         className=" accent-black border-none w-min-0 py-1 px-2 w-full focus:outline-none "
                         placeholder='write a todo...'/>

                        <input 
                            type="date" 
                            name='date'
                            value={newTask.date}
                            className="date-input flex items-center justify-center w-6 max-w-6 h-6 border rounded-full focus:outline-none  cursor-pointer"
                            onChange={handleChange} 
                        />

                        <div className='relative'>
                            <select 
                            name='priority'
                            value={newTask.priority}

                            className={`custom-select flex items-center bg-[color:var(--${newTask.priority == 3 ? 'low':(newTask.priority == 2) ? 'medium' : 'high'}-priority-color)] justify-center w-6 max-w-6 h-6 border rounded-full focus:outline-none cursor-pointer`} 
                            onChange={handleChange}>
                                <option className='bg-[color:var(--low-priority-color)]' value='3' >low</option>
                                <option className='bg-[color:var(--medium-priority-color)]' value='2'>medium</option>
                                <option className='bg-[color:var(--high-priority-color)]' value='1'>high</option>
                            </select>

                            <div className="absolute top-1/2 right-1/2 transform -translate-y-1/2 translate-x-1/2 pointer-events-none">
                                <FaFlag className='flex text-xs'/>
                            </div>
                        </div>

                        <button className="flex items-center justify-center w-6 h-6 border bg-green-400 rounded-full px-2 mr-1 focus:outline-none cursor-pointer" onClick={()=> addNewTodo(newTask,setNewTask,allTodos,setAllTodos)}>+</button>

            </div>

            <div className="border rounded-xl p-2 w-full h-80 overflow-auto [box-shadow:inset_0_0px_10px_0_rgb(0,0,0,0.5)]">
                {isLoading ||
                allTodos.length !== 0 &&
                <ul className='flex flex-col  gap-0.5'>
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
            
            <div className='completed-todos-container border rounded-xl p-2 w-full overflow-auto [box-shadow:inset_0_0px_10px_0_rgb(0,0,0,0.5)]'>
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