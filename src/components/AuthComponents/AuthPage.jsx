import React from 'react'
import './AuthPage.css'
import { FaUser } from "react-icons/fa6";
import { IoMdLock } from "react-icons/io";

const AuthPage = () => {
  return (
    <div className='wrapper'>
        <form action="">
            <h1>Login</h1>
            <div className='input-box'>
                <input className='input' placeholder='username' type='text'/>
                <FaUser className='icon'/>
            </div>
            <div className='input-box'>
                <input className='input' placeholder='password' type='password'/>
                <IoMdLock className='icon'/>
            </div>
            <div className='input-box'>
                <input className='input' placeholder='confirm password' type='password'/>
                <IoMdLock className='icon'/>
            </div>

            <div className='remember'>
                    <label><input type='checkbox'/>remember me</label>
            </div>
            <div className='sign-Button'>
                <button type="submit">Sign In</button>
            </div>
            <div className='signUp-link'>
                <p>Don't have an Account? <a href='#'>SignUp</a></p>
            </div>
        </form>
    </div>
  )
}

export default AuthPage