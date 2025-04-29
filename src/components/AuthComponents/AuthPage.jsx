import React, { useState } from 'react'
import './AuthPage.css'
import { FaUser } from "react-icons/fa6";
import { IoMdLock } from "react-icons/io";

const AuthPage = () => {
    const [isLogin,setIsLogin] = useState(true);
    const [errorMessage,setErrorMessage] = useState(null);
    
  return (
    <div className="auth-container">
        <div className='auth-wrapper'>
            <form action="">
                <h1>{(isLogin) ? 'Login':'Sign Up'}</h1>
                {errorMessage && 
                <div className='error-message'>
                    <p>{errorMessage}</p>
                </div>}
                <div className='input-box'>
                    <input className='input' placeholder='username' type='text' required/>
                    <FaUser className='icon'/>
                </div>
                <div className='input-box'>
                    <input className='input' placeholder='password' type='password' required/>
                    <IoMdLock className='icon'/>
                </div>
                
                {!isLogin && 
                <div className='input-box'>
                    <input className='input' placeholder='confirm password' type='password' required/>
                    <IoMdLock className='icon'/>
                </div>}

                {(isLogin) && 
                <div className='remember'>
                        <label><input type='checkbox'/>remember me</label>
                </div>}
                <div className='sign-Button'>
                    <button type="submit">{(isLogin) ? 'Login':'Sign Up'}</button>
                </div>
                <div className='signUp-link'>
                    <p>{isLogin ? 'Don\'t have an Account?':'already have an account?'} <a href='#' onClick={() => setIsLogin(!isLogin)}>{(isLogin)? 'SignUp':'Sign In'}</a></p>
                </div>
            </form>
        </div>
    </div>
  )
}

export default AuthPage