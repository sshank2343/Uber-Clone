import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const UserLogin = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [userData, setUserData] = useState({})
    const submitHandler = (e)=>{
        e.preventDefault()
        setUserData({
            email:email,
            password:password
        })
        setEmail('')
        setPassword('')
        // Handle login logic here
    }
  return (
    <div className='p-7 flex flex-col justify-between h-screen'>
      <div>
        <form onSubmit={(e)=>{submitHandler(e)}}>
        <img className='w-16 mb-10' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
        <h3 className='text-lg font-medium mb-2'>What's your email</h3>
        <input 
        required
        value={email}
        onChange={(e)=>{
            setEmail(e.target.value)
        }}
        className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
        type="email" 
        placeholder="email@example.com"
         />

        <h3 className='text-lg font-medium mb-2'>Enter Password</h3>
        
        <input 
        required 
        value={password}
        onChange={(e)=>{
            setPassword(e.target.value)
        }}
        className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
        type="password" 
        placeholder="Enter Password" 
        />
        <button
        className='bg-[#111] text-white font-semibold mb-2 rounded px-4 py-2 border w-full text-lg '
        >Login</button>
        <p className='text-center '>New here? <Link className='text-blue-600' to='/signup'>Create new Account</Link></p>
      </form>
      </div>
      <div>
        <Link className='bg-[#10b461] flex items-center justify-center text-white font-semibold mb-2 rounded px-4 py-2 border w-full text-lg ' to='/captain-login'>Sign in as Captain</Link>
      </div>
    </div>
  )
}

export default UserLogin
