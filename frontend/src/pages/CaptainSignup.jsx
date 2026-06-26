import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { CaptainDataContext } from '../context/CaptainContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const CaptainSignup = () => {
        const navigate= useNavigate()
        const [email, setEmail] = useState('')
        const [password, setPassword] = useState('')
        const [firstname, setFirstname] = useState('')
        const [lastname, setLastname] = useState('')
        const [userData, setUserData] = useState({})
        
        const [ vehicleColor, setVehicleColor ] = useState('')
        const [ vehiclePlate, setVehiclePlate ] = useState('')
        const [ vehicleCapacity, setVehicleCapacity ] = useState('')
        const [ vehicleType, setVehicleType ] = useState('')


        const { captain , setCaptain } = useContext(CaptainDataContext)


       const submitHandler = async (e) => {
        e.preventDefault()
        const captainData = {
          fullname: {
            firstname: firstname,
            lastname: lastname
          },
          email: email,
          password: password,
          vehicle: {
            color: vehicleColor,
            plate: vehiclePlate,
            capacity: vehicleCapacity,
            vehicleType: vehicleType
          }
        }
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`, captainData)
        if(response.status===201){
          const data = response.data
          setCaptain(data.captain)
          localStorage.setItem('token', data.token)
          navigate('/captain-home')
        }

        setEmail('')
        setFirstname('')
        setLastname('')
        setPassword('')
        setVehicleColor('')
        setVehiclePlate('')
        setVehicleCapacity('')
        setVehicleType('')

      }
  return (
    <div className='p-7 flex flex-col justify-between h-screen'>
      <div>
        <img className='w-16 mb-2' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ235OAQzJpBUmRN76bp3FV2oLymKktq8WNvO1pLga-uztm27uEICPS-GsR&s=10" alt="" />
        <form onSubmit={(e)=>{submitHandler(e)}}>
        <h3 className='text-lg font-medium mb-2'>What's our Captain's name</h3>
        <div className='flex gap-3 mb-2'>
          <input 
        required
        className='bg-[#eeeeee]  rounded px-4 py-1 border w-1/2 text-base placeholder:text-base'
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
        <h3 className='text-lg font-medium mb-2'>What's our Captain's email </h3>
        <input 
        required
        className='bg-[#eeeeee] mb-2 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
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
        className='bg-[#eeeeee] mb-2 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
        type="password" 
        placeholder="Enter Password" 
        value={password}
        onChange={(e)=>{
          setPassword(e.target.value)
        }}
         />
        <h3 className='text-lg font-medium mb-2'>Vehicle Information</h3>
          <div className='flex gap-4 mb-3'>
            <input
              required
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
              type="text"
              placeholder='Vehicle Color'
              value={vehicleColor}
              onChange={(e) => {
                setVehicleColor(e.target.value)
              }}
            />
            <input
              required
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
              type="text"
              placeholder='Vehicle Plate'
              value={vehiclePlate}
              onChange={(e) => {
                setVehiclePlate(e.target.value)
              }}
            />
          </div>
          <div className='flex gap-4 mb-3'>
            <input
              required
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
              type="number"
              placeholder='Vehicle Capacity'
              value={vehicleCapacity}
              onChange={(e) => {
                setVehicleCapacity(e.target.value)
              }}
            />
            <select
              required
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
              value={vehicleType}
              onChange={(e) => {
                setVehicleType(e.target.value)
              }}
            >
              <option value="" disabled>Select Vehicle Type</option>
              <option value="car">Car</option>
              <option value="auto">Auto</option>
              <option value="moto">Moto</option>
            </select>
          </div>
        <button
        className='bg-[#111] text-white font-semibold mb-2 rounded-lg px-4 py-2 border w-full text-lg '
        >Signup</button>
        <p className='text-center '>Already have a account? <Link className='text-blue-600' to='/captain-login'>Login here</Link></p>
      </form>
      </div>
      <div>
        <p className='text-[10px] mt-6 leading-tight'>This site is protected by reCAPTCHA and the <span className='underline'>Google Privacy
          Policy</span> and <span className='underline'>Terms of Service apply</span>.</p>
      </div>
    </div>
  )
}

export default CaptainSignup
