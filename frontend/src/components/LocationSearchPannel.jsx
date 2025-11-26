import React from 'react'

const LocationSearchPannel = (props ) => {

    // sample array for location 
    const locations =[
        "24B Near Kapoor's Cafe, Sheriyans Coding Bhopal",
                "26B Near Nagar Bhawan",
        "247 Hosptil, South",
        "24/t4r east Fire Brigade",
    ]
  return (
    <div>
        {/* this is sample data  */}

        {locations.map((elem, id) =>(
             <div
             key={id}
             onClick={() => {
                props.setVehiclePannelOpen(true)
                props.setpannelOpen(false)
             }}
             className='flex items-center rounded-xl border-transparent hover:border-2 hover:border-black transition-all duration-75 p-3 my-4 justify-star2 gap-2'>
            <h2 className='bg-[#eee] h-8 w-12 grid place-items-center rounded-full'>
                <i className="ri-map-pin-fill"></i>
            </h2>
            <h4 className='font-medium'>{elem}</h4>
        </div>
        ))}
      
    </div>
  )
}

export default LocationSearchPannel