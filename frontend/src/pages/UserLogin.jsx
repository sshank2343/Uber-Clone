import React, { useState ,useContext  } from 'react'
import { Link } from 'react-router-dom'
import { UserDataContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

// import React, { useState ,useContext } from 'react'
// import { Link ,useNavigate} from 'react-router-dom'
// import {UserDataContext} from '../context/UserContext'
// import axios from 'axios'


const UserLogin = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [userData, setUserData] = useState({})
    const {user, setUser} = useContext(UserDataContext)
    const navigate = useNavigate()

    const submitHandler = async(e)=>{
        e.preventDefault()
        const userData = {
            email:email,
            password:password
        }

        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`,userData)

        if(response.status===200){
          const data = response.data
          setUser(data.user)
          localStorage.setItem('token', data.token)
          navigate('/home')
        }


        setEmail('')
        setPassword('')
        // Handle login logic here
    }
  return (
    <div className='p-7 flex flex-col justify-between h-screen'>
      <div>
        <img className='w-16 mb-5' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
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
        <p className='text-center '>New here? <Link className='text-blue-600' to='/signup'>Create new Account</Link></p>
      </form>
      </div>
      <div>
        <Link className='bg-[#10b461] flex items-center justify-center text-white font-semibold mb-2 rounded-lg px-4 py-2 border w-full text-lg ' to='/captain-login'>Sign in as Captain</Link>
      </div>
    </div>
  )
}

export default UserLogin
