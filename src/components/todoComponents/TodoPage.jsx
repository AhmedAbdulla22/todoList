import React, { useEffect, useState } from 'react'
import './TodoPage.css'
import todos from '../../todos.json'; 
import TodoCard from './todoCard';

const TodoPage = () => {

    const [todoList,setTodoList] = useState([]);
    const [completedTodoList,setCompletedTodoList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    //load Todos
    useEffect(() => {
        const ongoingTodos = [];
        const completedTodos = [];
        todos.forEach((item) => {
            (item.done === false) ? ongoingTodos.push(item) : completedTodos.push(item);     
        })

        setTodoList(ongoingTodos);
        setCompletedTodoList(completedTodos);
        setIsLoading(false);
    },[])





  return (
    <div className="todos-container ">
        <div className='todos-wrapper'>
            <h3>Todo List App</h3>
            <div className="input-container">
                <input type="text" className="todo-input" placeholder='write a todo...'/>
                <input type="date" className="date-input" />
                <button className="add-todo-button">Add</button>
            </div>

            <div className="ongoing-todos-container">
                {isLoading && <div>is Loading</div> ||
                todoList.length !== 0 &&
                <ul>
                    {todoList.map((todo)=>
                        <TodoCard key={todo.id} todo={todo}/>
                    )}    
                </ul>}
            </div>
            
            <div className='completed-todos-container'>
                <h3>Completed Todos</h3>
                {isLoading && <div>is Loading</div> ||
                completedTodoList.length !== 0 &&
                <ul>
                    {completedTodoList.map((todo)=>
                        <li key={todo.id}>{todo.description}</li>
                    )}    
                </ul> || <div><p>Empty</p></div>}
            </div>
        </div>
    </div>
  )
}

export default TodoPage
