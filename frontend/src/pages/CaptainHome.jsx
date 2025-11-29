import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {useGSAP} from "@gsap/react"
import gsap from "gsap"
import CaptainDetails from '../components/CaptainDetails'
import RidePopUp from '../components/RidePopUp'
import ConfirmRidePopUp from '../components/ConfirmRidePopUp'


const CaptainHome = () => {
  const [ridePopupPannel, setridePopupPannel] = useState(true)
  const [confirmRidePopUpPannel, setconfirmRidePopUpPannel] = useState(false)
  const ridePopupPanelRef = useRef()
  const confirmRidePopUpPannelRef = useRef()


  useGSAP(() => {
    if (ridePopupPannel) {

      gsap.to(ridePopupPanelRef.current, {
        transform: "translateY(0)"
      })

    } else {
      gsap.to(ridePopupPanelRef.current, {
        transform: "translateY(100%)"
      })
    }
  }, [ridePopupPannel])

  useGSAP(() => {
    if (confirmRidePopUpPannel) {

      gsap.to(confirmRidePopUpPannelRef.current, {
        transform: "translateY(0)"
      })

    } else {
      gsap.to(confirmRidePopUpPannelRef.current, {
        transform: "translateY(100%)"
      })
    }
  }, [confirmRidePopUpPannel])

  return (
    <div className='h-screen'>
      <div className='fixed p-6 top-0 flex items-center justify-between w-screen'>
        <img className='w-16' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
        <Link to='/captain-home' className=' h-10 w-10 bg-white flex items-center justify-center rounded-full'>
          <i className="text-lg font-medium ri-logout-box-r-line"></i>
        </Link>
      </div>
      <div className='h-3/5'>
        <img className='h-full w-full object-cover' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="" />

      </div>
      <div className='h-2/5 p-6'>
        <CaptainDetails/>
      </div>

      <div ref={ridePopupPanelRef}  className='fixed w-full translate-y-full z-10 bottom-0  bg-white px-3 py-10 pt-12'>
        <RidePopUp setridePopupPannel={setridePopupPannel} setconfirmRidePopUpPannel={setconfirmRidePopUpPannel} />
      </div>

      <div ref={confirmRidePopUpPannelRef} className='fixed w-full h-screen z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12'>
        <ConfirmRidePopUp setconfirmRidePopUpPannel={setconfirmRidePopUpPannel} setridePopupPannel={setridePopupPannel} />
      </div>
      
    </div>
  )
}

export default CaptainHome