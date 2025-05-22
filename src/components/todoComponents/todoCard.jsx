import React, { useState } from 'react'
import {useDebounce} from 'react-use'
import deleteIconUrl from '../../assets/deleteIcon.svg?url'
import { FaFlag } from "react-icons/fa";




const TodoCard = ({todo: {todoid,description,date,done,priority},onUpdate,onRemove,setAllTodos}) => {  
  let timerId = undefined;

  const handleChange = (field,value) => {
    const updatedTodo = {
        todoid:todoid,
        description: (field === 'description') ? value:description,
        date: (field === 'date') ? value:date,
        done: (field === 'done') ? value:done,
        priority: (field === 'priority') ? value:priority,
    } 

    if(field === 'description') {

      //Using setTimeout to optimize fetching on Update!

        if(timerId) {
          clearTimeout(timerId)
        }
        timerId = setTimeout(() => {onUpdate(todoid,updatedTodo,setAllTodos)},2000);
        
    }
    else{
      onUpdate(todoid,updatedTodo,setAllTodos)
    }
    
    
  }


  return (
          <li className={`flex flex-row items-center text-sm gap-1 py-1 px-1 full rounded-[5px] m bg-[color:var(--${priority == 3 ? 'low':(priority == 2) ? 'medium' : 'high'}-priority-color)]`}>
              <input type='checkbox' className='accent-black' checked={done} onChange={(e) => {
                handleChange('done',e.target.checked)  
              }}/>
              
               <input 
                type="text"
                className={`accent-black w-min-[0px] w-full  ${done ? 'line-through focus:outline-none focus:ring-0':''}`}
                defaultValue={description}
                readOnly={done}
                onChange={(e)=>{
                handleChange('description',e.target.value)  
                }}
                /> 

                <input 
                type="date" 
                value={date} 
                className="border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 min-w-0 w-45 w-max-10"
                readOnly={done}
                onChange={(e)=>{
                  handleChange('date',e.target.value)  
                  }}
              />

              <div className='relative'>
                  <select 
                  name='priority'
                  value={priority}

                  className={`custom-select flex items-center bg-[color:var(--${priority == 3 ? 'low':(priority == 2) ? 'medium' : 'high'}-priority-color)] justify-center w-6 max-w-6 h-6 border rounded-full focus:outline-none cursor-pointer`} 
                  onChange={(e) => {handleChange('priority',e.target.value) }}>
                      <option className='bg-[color:var(--low-priority-color)]' value='3' >low</option>
                      <option className='bg-[color:var(--medium-priority-color)]' value='2'>medium</option>
                      <option className='bg-[color:var(--high-priority-color)]' value='1'>high</option>
                  </select>

                  <div className="absolute top-1/2 right-1/2 transform -translate-y-1/2 translate-x-1/2 pointer-events-none">
                      <FaFlag className='flex text-xs'/>
                  </div>
              </div>
              
              <button className='text-red-700 text-xl cursor-pointer h-6' onClick={() => onRemove(todoid,setAllTodos)}><img src={deleteIconUrl}  alt="Delete" /></button>
          </li>
        
  )
}

export default TodoCard