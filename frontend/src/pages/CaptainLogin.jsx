import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { CaptainDataContext } from '../context/CaptainContext'

const CaptainLogin = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
        const [password, setPassword] = useState('')
        const {captain , steCaptain} = useContext(CaptainDataContext)
        const submitHandler = async (e)=>{
            e.preventDefault()
            const captainData={
                email:email,
                password:password
            }
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/login`,captainData)
            if(response.status===200){
                const data = response.data
                localStorage.setItem('token', data.token)
                navigate('/captain-home')
            }
            setEmail('')
            setPassword('')
            // Handle login logic here
        }
  return (
    <div className='p-7 flex flex-col justify-between h-screen'>
      <div>
        <img className='w-16 mb-3' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ235OAQzJpBUmRN76bp3FV2oLymKktq8WNvO1pLga-uztm27uEICPS-GsR&s=10" alt="" />
        <form onSubmit={(e)=>{submitHandler(e)}}>
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
        className='bg-[#111] text-white font-semibold mb-2 rounded-lg px-4 py-2 border w-full text-lg '
        >Login</button>
        <p className='text-center '>Join a fleet? <Link className='text-blue-600' to='/captain-signup'>Register as a Captain</Link></p>
      </form>
      </div>
      <div>
        <Link className='bg-[#d5622d] flex items-center justify-center text-white font-semibold mb-2 rounded-lg px-4 py-2 border w-full text-lg ' to='/login'>Sign in as User</Link>
      </div>
    </div>
  )
}

export default CaptainLogin
