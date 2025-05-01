import React, { useState } from 'react'
import { FaUser } from "react-icons/fa6";
import { IoMdLock } from "react-icons/io";

const AuthPage = () => {
    const [isLogin,setIsLogin] = useState(true);
    const [errorMessage,setErrorMessage] = useState(null);
    
  return (
    <div className="flex flex-col items-center " >
        <div className='flex flex-col justify-center w-[50vh] h-[100vh]'>
            <form action="" className='flex flex-col items-center h-80 border-2 rounded-2xl'>
                <h1 className="font-semibold text-2xl my-10">{(isLogin) ? 'Login':'Sign Up'}</h1>
                {errorMessage && 
                <div className=''>
                    <p>{errorMessage}</p>
                </div>}
                <div className='inputs-class flex flex-col gap-1 mb-10'>
                    <div className='flex relative'>
                        <input placeholder='username' className='required border rounded-2xl border-gray-600 pl-3 py-1 pr-6' type='text' required/>
                        <FaUser className='absolute top-1/2 right-1 transform -translate-y-1/2'/>
                    </div>
                    <div className='flex relative'>
                        <input placeholder='password' className='required border rounded-2xl border-gray-600 pl-3 py-1 pr-6'  type='password' required/>
                        <IoMdLock className='absolute top-1/2 right-1 transform -translate-y-1/2'/>
                    </div>
                    
                    {!isLogin && 
                    <div className='flex relative'>
                        <input placeholder='confirm password' className='required border rounded-2xl border-gray-600 pl-3 py-1 pr-6'  type='password' required/>
                        <IoMdLock className='absolute top-1/2 right-1 transform -translate-y-1/2'/>
                    </div>}
                </div>

                {(isLogin) && 
                <div className=''>
                        <label><input type='checkbox'/>remember me</label>
                </div>}
                <div className=''>
                    <button type="submit">{(isLogin) ? 'Login':'Sign Up'}</button>
                </div>
                <div className=''>
                    <p>{isLogin ? 'Don\'t have an Account?':'already have an account?'} <a href='#' onClick={() => setIsLogin(!isLogin)}>{(isLogin)? 'SignUp':'Sign In'}</a></p>
                </div>
            </form>
        </div>
    </div>
  )
}

export default AuthPage