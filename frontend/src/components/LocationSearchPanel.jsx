import React from 'react'

const LocationSearchPanel = (props) => {
    
    
    const locations = [
        "24B, Near Kapoor's cafe, Shreyians Coding School, Bhopal",
        "24C, Near Malhotra's cafe, Briyani Hall, Bhopal",
        "24B, Near Singhania's cafe, Animal Zoo, Bhopal",
        "24B, Near Sharma's cafe, CMS School, Bhopal",
    ]
    
    return (
    <div>

        {
            locations.map(function(elem,idx){
                return <div key={idx} onClick={()=>{
                    props.setVehiclePanel(true)
                    props.setPanelOpen(false)
                }} className='flex gap-4 border-3 p-3 border-gray-50 active:border-black rounded-xl  items-center my-2 justify-start'>
                <h2 className='bg-[#eee] h-8 flex items-center justify-center w-12 rounded-full '> <i className='ri-map-pin-fill'> </i> </h2>
                <h4 className='font-bold'>{elem}</h4>
            </div>
            })
        }

    </div>
  )
}

export default LocationSearchPanel
