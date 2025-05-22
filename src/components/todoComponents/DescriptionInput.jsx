const DescriptionInput = ({description,handleChange,onEnter}) => {

  const handleEnterPress = (e) => {
    if(e.key === 'Enter')
    {
        onEnter?.();
    }
  }  

  return (
    <>
        <input type="text"
                         id="task-input"
                         name='description'
                         value={description}
                         onChange={handleChange}
                         className=" accent-black border-none w-min-0 py-1 px-2 w-full focus:outline-none "
                         placeholder='write a todo...'
                         onKeyDown={handleEnterPress}
        /> 
    </>
  )
}

export default DescriptionInput