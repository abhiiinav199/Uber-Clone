import React, { useRef, useState } from 'react'
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import 'remixicon/fonts/remixicon.css'
import LocationSearchPannel from '../components/LocationSearchPannel'
import ConfirmRide from '../components/ConfirmRide'
import VehiclePannel from '../components/VehiclePannel'
import LookingForDriver from '../components/LookingForDriver'
import WaitingForDriver from '../components/WaitingForDriver'

const Home = () => {

  const [data, setdata] = useState({
    pickup: "",
    destination: ""
  })
  const [confirmRidePannel, setConfirmRidePannel] = useState(false)
  const [vehiclePannelOpen, setVehiclePannelOpen] = useState(false)
  const [vehicleFound, setVehicleFound] = useState(false)
  const [waitingForDriver, setwaitingForDriver] = useState(false)


  const [pannelOpen, setpannelOpen] = useState(false)
  const pannelRef = useRef(null)
  const pannelCloseRef = useRef(null)
  const vehiclePannelRef = useRef(null)
  const confirmRidePannelRef = useRef(null)
  const vehicleFoundRef = useRef(null)
  const waitingForDriverRef = useRef(null)




  const handleChange = (e) => {
    const { name, value } = e.target
    setdata((prev) => (
      {
        ...prev,
        [name]: value
      }
    ))
  }

  const submitHandler = (e) => {
    e.preventDefault()
    console.log(data)
  }

  useGSAP(function () {
    if (pannelOpen) {
      gsap.to(pannelRef.current, {
        height: "70%",
        opacity: "1",
        padding: 24
      })
      gsap.to(pannelCloseRef.current, {
        opacity: "1"
      })
    } else {
      gsap.to(pannelRef.current, {
        height: "0%",
        opacity: "0",
        padding: 0

      })
      gsap.to(pannelCloseRef.current, {
        opacity: "0"
      })
    }
  }, [pannelOpen])

  useGSAP(() => {
    if (vehiclePannelOpen) {

      gsap.to(vehiclePannelRef.current, {
        transform: "translateY(0)"
      })

    } else {
      gsap.to(vehiclePannelRef.current, {
        transform: "translateY(100%)"
      })
    }
  }, [vehiclePannelOpen])


  useGSAP(() => {
    if (confirmRidePannel) {

      gsap.to(confirmRidePannelRef.current, {
        transform: "translateY(0)"
      })

    } else {
      gsap.to(confirmRidePannelRef.current, {
        transform: "translateY(100%)"
      })
    }
  }, [confirmRidePannel])


  useGSAP(() => {
    if (vehicleFound) {

      gsap.to(vehicleFoundRef.current, {
        transform: "translateY(0)"
      })

    } else {
      gsap.to(vehicleFoundRef.current, {
        transform: "translateY(100%)"
      })
    }
  }, [vehicleFound])

    useGSAP(() => {
    if (waitingForDriver) {

      gsap.to(waitingForDriverRef.current, {
        transform: "translateY(0)"
      })

    } else {
      gsap.to(waitingForDriverRef.current, {
        transform: "translateY(100%)"
      })
    }
  }, [waitingForDriver])

  return (
    <div className='relative h-screen overflow-hidden'>
      <img className='w-20 absolute left-5 top-5' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />


      <div className='h-screen w-screen'>
        {/* temporary use image */}
        <img className='h-full w-full' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="" />
      </div>



      <div className='absolute h-screen flex flex-col justify-end top-0 w-full'>

        <div className='h-[30%] p-6 bg-white relative'>

          <h5 ref={pannelCloseRef} onClick={() => setpannelOpen(false)} className='absolute cursor-pointer opacity-0 top-6 right-6 text-2xl'>
            <i className="ri-arrow-down-wide-line"></i>
          </h5>

          <h4 className='text-3xl font-semibold'>Find a trip</h4>

          <form  className='relative py-3' onSubmit={submitHandler}>

            <div className="line absolute h-16 w-1 top-[50%] -translate-y-1/2 left-5 bg-gray-900 rounded-full"></div>

            <input
              name='pickup' //connected with handleChange Function
              value={data.pickup} // connected with state
              onClick={() => setpannelOpen(true)}
              onChange={handleChange}
              className='bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-5'
              type="text"
              placeholder='Add a pick-up location' />
            <input
              name='destination' // connected with handleChange function
              value={data.destination}//connected with state
              onClick={() => setpannelOpen(true)}
              onChange={handleChange}
              className='bg-[#eee] px-12
                 py-2 text-lg rounded-lg w-full mt-3'
              type="text"
              placeholder='Enter Your Destination' />

          </form>

        </div>
        <div ref={pannelRef} className='h-0 opacity-0 bg-white '>
          <LocationSearchPannel
            setpannelOpen={setpannelOpen}
            setVehiclePannelOpen={setVehiclePannelOpen} />
        </div>
      </div>


      <div ref={vehiclePannelRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12'>
        <VehiclePannel setConfirmRidePannel={setConfirmRidePannel} setVehiclePannelOpen={setVehiclePannelOpen} />
      </div>

      <div ref={confirmRidePannelRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-12'>
        <ConfirmRide setConfirmRidePannel={setConfirmRidePannel} setVehicleFound={setVehicleFound} />
      </div>


      <div ref={vehicleFoundRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-12'>
        <LookingForDriver setVehicleFound={setVehicleFound} />
      </div>

      <div ref={waitingForDriverRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-12'>
        <WaitingForDriver setwaitingForDriver={setwaitingForDriver} />
      </div>

    </div>
  )
}

export default Home