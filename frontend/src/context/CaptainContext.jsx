import React, { createContext, useState } from 'react'

export const CaptainDataContext= createContext() 


const CaptainContext = ({children}) => {
    const [captainData, setcaptainData] = useState({
         fullname:{
            fistname:"",
            lastname:""
        },
        email:"",
        password:"",
        vehicle:{
            color:"",
            plate:"",
            capacity:"",
            vehicleType:""
        }
    })
   
  return (
    <CaptainDataContext.Provider value={{captainData, setcaptainData}}>{children}</CaptainDataContext.Provider>
  )
}

export default CaptainContext