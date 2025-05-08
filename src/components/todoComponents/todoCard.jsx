import React, { useState } from 'react'


const TodoCard = ({todo: {id,description,date,done},onUpdate,onRemove}) => {  
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
              
              
              <input 
                type="date" 
                value={date} 
                className="border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 min-w-0 w-45 w-max-10"
                readOnly={done}
                onChange={(e)=>{
                  handleChange('date',e.target.value)  
                  }}
              />
              <button className='text-red-700 text-xl cursor-pointer h-6' onClick={() => onRemove(id)}>X</button>
          </li>
        
  )
}

export default TodoCard