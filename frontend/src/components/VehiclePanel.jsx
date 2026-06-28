import React from 'react'

const VehiclePanel = (props) => {
  return (
    <div>
      <h5 className='p-1 text-center w-[90%] absolute top-0 ' onClick={()=>{
        props.setVehiclePanel(false)
      }}><i className='text-3xl text-gray-700 ri-arrow-down-wide-line'></i></h5>
        
      <h3 className='text-2xl font-semibold mb-5'>Choose a Vehicle</h3>
        
        {/* Car */}
        <div onClick={()=>{
          props.setConfirmRidePanel(true)
        }} className='flex border-4 border-gray-400 active:border-black mb-2 rounded-2xl w-full p-3 items-center justify-between'>
          <img className='h-10' src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg" alt="" />
          <div className='mi-2, w-1/2'>
            <h4 className='font-medium text-base'>UberGo <span><i className='ri-user-3-fill'>4</i></span> </h4>
            <h5 className='font-medium text-sm'> 2 min away</h5>
            <p className='font-normal text-xs text-gray-600'>Affordable, compact rides</p>
          </div>
          <h2 className='text-lg font-semibold'>₹193.20</h2>
        </div>



        {/* Motor Cycle */}
        <div onClick={()=>{
          props.setConfirmRidePanel(true)
        }} className='flex border-4 border-gray-400 active:border-black mb-2 rounded-2xl w-full p-3 items-center justify-between'>
          <img className='h-10' src="https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=552/height=368/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy85NTM4NTEyZC1mZGUxLTRmNzMtYmQ1MS05Y2VmZjRlMjU0ZjEucG5n" alt="" />
          <div className='mi-2, w-1/2'>
            <h4 className='font-medium text-base'>Moto <span><i className='ri-user-3-fill'>1</i></span> </h4>
            <h5 className='font-medium text-sm'> 3 min away</h5>
            <p className='font-normal text-xs text-gray-600'>Affordable motorcycle rides</p>
          </div>
          <h2 className='text-lg font-semibold'>₹65</h2>
        </div>



          {/* Auto */}
        <div onClick={()=>{
          props.setConfirmRidePanel(true)
        }} className='flex border-4 border-gray-400 active:border-black mb-2 rounded-2xl w-full p-3 items-center justify-between'>
          <img className='h-10' src="https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=552/height=552/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy9mYzEwMWZmOC04MWExLTQ2YzMtOTk1YS02N2I0YmJkMmYyYmYuanBn" alt="" />
          <div className='mi-2, w-1/2'>
            <h4 className='font-medium text-base'>UberAuto <span><i className='ri-user-3-fill'>3</i></span> </h4>
            <h5 className='font-medium text-sm'> 3 min away</h5>
            <p className='font-normal text-xs text-gray-600'>Affordable auto rides</p>
          </div>
          <h2 className='text-lg font-semibold'>₹118.21</h2>
        </div>


    </div>
  )
}

export default VehiclePanel
