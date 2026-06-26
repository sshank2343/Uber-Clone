import React, { useEffect, useRef } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'



const UserLogout = () => {
    const token = localStorage.getItem('token')
    const navigate=useNavigate()
    const logoutStartedRef = useRef(false)

  useEffect(()=>{
    if(logoutStartedRef.current){
      return
    }

    if(!token){
      navigate('/login')
      return
    }

    logoutStartedRef.current = true

    const logout = async()=>{
      try{
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/users/logout`,{
          headers:{
            Authorization:`Bearer ${token}`
          }
        })

        if(response.status===200){
          localStorage.removeItem('token')
          navigate('/login')
        }
      }catch(error){
        console.error('Logout failed:', error)
      }
    }

    logout()
  },[navigate, token])
  return (
    <div>
      User Logout
    </div>
  )
}

export default UserLogout
