import React, { useState } from 'react'


const TodoCard = ({todo: {id,description,done},onUpdate,onRemove}) => {  
  const handleChange = (field,value) => {
    onUpdate(id,{[field]:value})
  }


  return (
          <li className='flex flex-row items-center text-sm gap-1 py-1 full'>
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
              
              <button className='text-red-700 text-xl cursor-pointer h-6' onClick={() => onRemove(id)}><img src='delete.svg' /></button>
          </li>
        
  )
}

export default TodoCard