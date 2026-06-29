import React from 'react'

const CaptainDetails = () => {
  return (
    <div>
      <div className="flex items-center justify-between" >
          <div className="flex items-center justify-start gap-4">
            <img className="h-10 w-10 rounded-full object-cover" src="https://www.investopedia.com/thmb/H_n5_g-yayKPIZGFZ7GV3B0Pbi0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Uber-f9292bc715574731b056150244df9d41.jpg" alt="" />
            <h4 className="text-lg font-medium">Harsh Patel</h4>
          </div>
          <div>
            <h4 className="text-lg font-semibold">₹295.20</h4>
            <p className="text-sm text-gray-600" >Earned</p>
          </div>
        </div>
        <div className="flex p-3 mt-8 bg-gray-100 rounded-2xl  justify-center gap-5 items-start">
          <div className="text-center">
            <i className="text-3xl mb-2 font-thin ri-timer-2-line"></i>
            <h5 className="text-lg font-medium">10.2</h5>
            <p className="text-sm text-gray-600" >Hours Online</p>
          </div>
          <div className="text-center">
            <i className="text-3xl mb-2 font-thin ri-speed-up-line"></i>
            <h5 className="text-lg font-medium">45 km/h</h5>
            <p className="text-sm text-gray-600" >Average Speed</p>
          </div>
          <div className="text-center">
            <i className="text-3xl mb-2 font-thin ri-booklet-line"></i>
            <h5 className="text-lg font-medium">15</h5>
            <p className="text-sm text-gray-600" >Rides Completed</p>
          </div>
        </div>
    </div>
  )
}

export default CaptainDetails
