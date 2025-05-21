import {useEffect, useState} from 'react'

const DarkModeButton = () => {
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
    <button className='text-white bg-black rounded-full w-[50px] h-[50px] cursor-pointer' onClick={() => setDarkMode(prevState => !prevState)}>{darkMode ? 'WHT':'DRK'}</button>
  )
}

export default DarkModeButton