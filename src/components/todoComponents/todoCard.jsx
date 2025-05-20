import React, { useState } from 'react'


const TodoCard = ({todo: {todoid,description,date,done},onUpdate,onRemove,setAllTodos}) => {  
  const [_description,setDescription] = useState(description);
  const [_done,setDone] = useState(done);
  const [_date,setDate] = useState(date);
  const handleChange = (field,value) => {
    const updatedTodo = {
        todoid:todoid,
        description: (field === 'description') ? value:_description,
        date: (field === 'date') ? value:_date,
        done: (field === 'done') ? value:_done,
    } 

    //if update was succesfull
    if(onUpdate(todoid,updatedTodo,setAllTodos))
    {
      // (field === 'description') ? setDescription(value):setDone(value);
    }
    
  }


  return (
          <li className='flex flex-row items-center text-sm gap-1 py-1 full'>
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
              
              <button className='text-red-700 text-xl cursor-pointer h-6' onClick={() => onRemove(todoid,setAllTodos)}><img src='delete.svg' /></button>
          </li>
        
  )
}

export default TodoCard