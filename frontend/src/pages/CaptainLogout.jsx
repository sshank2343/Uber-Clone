import axios from 'axios'
import React, { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

const CaptainLogout = () => {

    const token = localStorage.getItem('token')
    const navigate=useNavigate()
    const logoutStartedRef = useRef(false)

    useEffect(()=>{
        if(logoutStartedRef.current){
            return
        }

        if(!token){
            navigate('/captain-login')
            return
        }

        logoutStartedRef.current = true

        axios.post(`${import.meta.env.VITE_BASE_URL}/captains/logout`, {}, {
            headers:{
                Authorization:`Bearer ${token}`
            }
        }).then(response=>{
            if(response.status===200){
                localStorage.removeItem('token')
                navigate('/captain-login')
            }
        }).catch(err=>{
            console.error('In CaptainLogout file-----Error occurred while logging out:', err)
            localStorage.removeItem('token')
            navigate('/captain-login')
        })
    },[navigate, token])



  return (
    <div>
      Captain Logout
    </div>
  )
}

export default CaptainLogout
