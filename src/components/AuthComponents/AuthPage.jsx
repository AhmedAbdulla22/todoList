import React, { useEffect, useState } from 'react'
import { FaUser } from "react-icons/fa6";
import { Navigate } from 'react-router-dom';
import { IoMdLock } from "react-icons/io";
import ToggleDarkMode from '../ToggleDarkMode';

const backendURL = import.meta.env.VITE_BACKEND_URL;

const AuthPage = ({onLogin}) => {
    const [isLogin,setIsLogin] = useState(true);
    const [credentials,setCredentials] = useState({username:'',password:'',confirmPassword:''});
    const [errorMessage,setErrorMessage] = useState(null);

    const handleChange = (propName,value) => {
        //...prev using spread op to get the properties and [propName] to get the prop we want to updatee
        setCredentials(prev => (
            {
            ...prev,
            [propName]:value
            }
        ))
    }

    const handleCredentials = async (e) => {
        e.preventDefault();
        if (isLogin) {
            try {
                    //send login credentials
                    const res = await fetch(backendURL+'auth/login',{
                        method:"POST",
                        credentials:'include',
                        headers:{
                            'Content-Type':'application/json'
                        },
                        body:JSON.stringify({
                            username:credentials.username,
                            password:credentials.password
                        })
                    })
        
                    if(res.ok)
                    {
                        const data = await res.json();

                        onLogin();//Set Auth to true
                    }
                    else{
                        const data = await res.json();
        
                        if (!data.userFound) {
                            alert("This User Does not Exist!");
                        }
                        else if(data.userFound && res.status === 401){
                            alert("your password is incorrect!");
                        }
                    }
            } catch (error) {
                console.log("Error: ",error);
            }
        }
        else{
            if(credentials.password !== credentials.confirmPassword) {
                alert('your password and confirm password are not similar!')
                return;
            }


            //Register
            try {



                //send req
                const res = await fetch(backendURL+'auth/register',{
                    method:'POST',
                    headers:{
                        'content-type':'application/json'
                    },
                    body:JSON.stringify({
                        username: credentials.username,
                        password: credentials.password,
                        confirmPassword: credentials.confirmPassword
                    })
                })

                if(res.ok) {
                    alert("Registered Succesfully.")
                } 
                else {
                    const data = await res.json();
                    //username exist
                    if(data.status === 400) {
                        alert("this username is already exist!")
                    }
                    else {
                        alert("failed to Register!")
                    }
                }
            } catch (error) {
                console.log("Error: ",error);
            }
        }
    }

  return (
    <div className="flex flex-col items-center" >
        <div className='flex flex-col justify-center h-[100vh]'>
            <form onSubmit={handleCredentials} className='flex flex-col items-center  border-2 rounded-2xl px-8 [box-shadow:0_5px_15px_0_rgb(0,0,0,0.5)]'>
                <h1 className="font-semibold text-2xl my-10">{(isLogin) ? 'Login':'Sign Up'}</h1>
                {errorMessage && 
                <div className='text-xs max-h-20 w-84 p-2 mb-1 border rounded-xl border-red-900 bg-red-100 overflow-scroll'>
                    <p className='text-red-800 text-center'>{errorMessage}</p>
                </div>}
                <div className='inputs-class flex flex-col gap-1 mb-4'>
                    <div className='flex relative'>
                        <input placeholder='username' onChange={e => handleChange('username',e.target.value)} className='required border accent-black rounded-2xl border-gray-600 p-3 py-1 pr-7' type='text' required/>
                        <FaUser className='absolute top-1/2 right-2 transform -translate-y-1/2'/>
                    </div>
                    <div className='flex relative'>
                        <input placeholder='password' onChange={e => handleChange('password',e.target.value)} className='required border accent-black rounded-2xl border-gray-600 pl-3 py-1 pr-7'  type='password' required/>
                        <IoMdLock className='absolute top-1/2 right-2 transform -translate-y-1/2'/>
                    </div>
                    
                    {!isLogin && 
                    <div className='flex relative'>
                        <input placeholder='confirm password' onChange={e => handleChange('confirmPassword',e.target.value)} className='required border accent-black rounded-2xl border-gray-600 pl-3 py-1 pr-7'  type='password' required/>
                        <IoMdLock className='absolute top-1/2 right-2 transform -translate-y-1/2'/>
                    </div>}
                </div>

                {(isLogin) && 
                <div className='flex w-full mb-4'>
                        <label className='ml-2 text-sm flex flex-row items-center'><input className='mr-2' type='checkbox'/>remember me</label>
                </div>}
                <div className='flex w-full justify-center mb-4'>
                    <button type="submit" className='w-full font-semibold border rounded-2xl border-gray-600 px-3 py-1 cursor-pointer' >{(isLogin) ? 'Login':'Sign Up'}</button>
                </div>
                <div className='mb-4'>
                    <p className='text-xs'>{isLogin ? 'Don\'t have an Account?':'already have an account?'} <a className='font-bold' href='#' onClick={() => setIsLogin(!isLogin)}>{(isLogin)? 'SignUp':'Sign In'}</a></p>
                </div>
            </form>
        </div>
        
        <ToggleDarkMode location='absolute right-2 top-2'/>
        
    </div>
  )
}

export default AuthPage