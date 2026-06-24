import React, { useState ,useContext } from 'react'
import { Link ,useNavigate} from 'react-router-dom'
import {UserDataContext} from '../context/UserContext'
import axios from 'axios'

const UserSignup = () => {
      const [email, setEmail] = useState('')
      const [password, setPassword] = useState('')
      const [firstname, setFirstname] = useState('')
      const [lastname, setLastname] = useState('')
      const navigate = useNavigate()
      const {user, setUser} = useContext(UserDataContext)
      
      const submitHandler = async (e)=>{
          e.preventDefault()
          const newUser={
            fullname:{
              firstname:firstname,
              lastname:lastname
            },
              email:email,
              password:password,
          }

          try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`,newUser)
            if(response.status === 201){
              const data = response.data
              setUser(data.user)
              navigate('/home')
            }
            setEmail('')
            setPassword('')
            setFirstname('')
            setLastname('')
          } catch (error) {
            console.log('Signup error:', error.response?.data || error.message)
          }
      }
  return (
    <div className='p-7 flex flex-col justify-between h-screen'>
      <div>

        <img className='w-16 mb-5' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />


        <form onSubmit={(e)=>{submitHandler(e)}}>
        <h3 className='text-lg font-medium mb-2'>What's your name</h3>
        <div className='flex gap-3 mb-5'>
          <input 
        required
        className='bg-[#eeeeee]  rounded px-4 py-2 border w-1/2 text-lg placeholder:text-base'
        type="text" 
        placeholder="First name"
        value={firstname}
        onChange={(e)=>{
          setFirstname(e.target.value)
        }}
         />
         <input 
        required
        className='bg-[#eeeeee]  rounded px-4 py-2 border w-1/2 text-lg placeholder:text-base'
        type="text" 
        placeholder="Last name"
        value={lastname}
        onChange={(e)=>{
          setLastname(e.target.value)
        }}
         />
        </div>
        <h3 className='text-lg font-medium mb-2'>What's your email</h3>
        <input 
        required
        className='bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
        type="email" 
        placeholder="email@example.com"
        value={email}
        onChange={(e)=>{
          setEmail(e.target.value)
        }}
         />

        <h3 className='text-lg font-medium mb-2'>Enter Password</h3>
        
        <input 
        required
        className='bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
        type="password" 
        placeholder="Enter Password" 
        value={password}
        onChange={(e)=>{
          setPassword(e.target.value)
        }}
         />
        <button
        className='bg-[#111] text-white font-semibold mb-2 rounded-lg px-4 py-2 border w-full text-lg '
        >Create account</button>
        <p className='text-center '>Already have a account? <Link className='text-blue-600' to='/login'>Login here</Link></p>
      </form>


      </div>


      <div>
        <p className='text-[12px] text-gray-500'>By proceeding, you consent to get calls, WhatsApp or SMS messages, including by automated means, from Uber and its affiliates to the number provided.</p>
      </div>
    </div>
  )
}

export default UserSignup
