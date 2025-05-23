import {useState,useEffect} from 'react'
import { FaSun } from "react-icons/fa";
import { FaMoon } from "react-icons/fa";

const ToggleDarkMode = () => {
    const [darkMode,setDarkMode] = useState(false);

     const loadTheme = () => {
            const theme = localStorage.getItem('theme');
            setDarkMode(theme === 'dark'); 
        }
    
        const saveTheme = () => {
            localStorage.setItem('theme',darkMode ? 'dark':'light');
        }
        
        const toggleDarkMode = () => {
            (darkMode) ? setLightThem() : setDarkThem();
            saveTheme();
        }
    
        useEffect(toggleDarkMode,[darkMode]);
        useEffect(loadTheme,[]);
    
    
        const setDarkThem = () => {
            document.querySelector('body').setAttribute('data-theme','dark')
            
        }
        const setLightThem = () => {
            document.querySelector('body').setAttribute('data-theme','light')
        }

  return (
    <div className="signOut-container border p-1 border-none  rounded-xl text-center absolute right-25 -bottom-10 text-sm hover:shadow-md hover:border">
        <div className="flex relative gap-1 items-center">
            <button className='signOut-button cursor-pointer w-full pr-5' onClick={() => setDarkMode(prev => !prev)}>{darkMode ? 'Dark Mode':'Light Mode'}</button>
            {darkMode ? <FaMoon className="absolute right-0 pointer-events-none"/>:<FaSun className="absolute right-0 pointer-events-none"/>}

        </div>
    </div> 
  )
}

export default ToggleDarkMode

