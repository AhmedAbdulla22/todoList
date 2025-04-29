import React from 'react'

const TodoCard = ({todo: {id,description,date,done}}) => {
  return (
    <div className='todo-card-container'>
        <div>
            <input 
            type="text"
            defaultValue={description}
            /> 
        </div>
    </div>
  )
}

export default TodoCard