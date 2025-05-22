import React, { useState } from 'react'
import {useDebounce} from 'react-use'
import deleteIconUrl from '../../assets/deleteIcon.svg?url'




const TodoCard = ({todo: {todoid,description,date,done,priority},onUpdate,onRemove,setAllTodos}) => {  
  const [_description,setDescription] = useState(description);
  const [_done,setDone] = useState(done);
  const [_date,setDate] = useState(date);
  const [_priority,setPriority] = useState(priority);
  let timerId = undefined;

  
 
  const handleChange = (field,value) => {
    const updatedTodo = {
        todoid:todoid,
        description: (field === 'description') ? value:_description,
        date: (field === 'date') ? value:_date,
        done: (field === 'done') ? value:_done,
        priority: (field === 'priority') ? value:_priority,
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
          <li className={`flex flex-row items-center text-sm gap-1 py-1 px-1 full rounded-[5px] m bg-[color:var(--${_priority == 3 ? 'low':(_priority == 2) ? 'medium' : 'high'}-priority-color)]`}>
              <input type='checkbox' className='accent-black' checked={_done} onChange={(e) => {
                handleChange('done',e.target.checked)  
              }}/>
              
               <input 
                type="text"
                className={`accent-black w-min-[0px] w-full  ${_done ? 'line-through focus:outline-none focus:ring-0':''}`}
                defaultValue={_description}
                readOnly={_done}
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
              
              <button className='text-red-700 text-xl cursor-pointer h-6' onClick={() => onRemove(todoid,setAllTodos)}><img src={deleteIconUrl}  alt="Delete" /></button>
          </li>
        
  )
}

export default TodoCard