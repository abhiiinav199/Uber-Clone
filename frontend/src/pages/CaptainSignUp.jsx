import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CaptainDataContext } from '../context/CaptainContext'
import axios from "axios"

const CaptainSignUp = () => {

  const [data, setdata] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    vehicle: {
      color: "",
      plate: "",
      capacity: "",
      vehicleType: ""
    }
  })

  const { captainData, setcaptainData } = useContext(CaptainDataContext)
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target;




  if (["color", "plate", "capacity", "vehicleType"].includes(name)) {
    setdata((prev) => ({
      ...prev,
      vehicle: {
        ...prev.vehicle,
        [name]: value
      }
    }));
  } else {
    setdata((prev) => ({ ...prev, [name]: value }));
  }


  
  //   setdata((prev) => (
    //     { ...prev, [name]: value }
  //   ))
  }

  const SubmitHandler = async (e) => {
    e.preventDefault();


    const captainUser = {
      fullname: {
        firstname: data.firstname,
        lastname: data.lastname
      },
      email: data.email,
      password: data.password,
      vehicle: {
        color: data.vehicle.color,
        plate: data.vehicle.plate,
        capacity: data.vehicle.capacity,
        vehicleType: data.vehicle.vehicleType
      }
    }
    const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`, captainUser)

    if (res.status === 201) {
      const data = res.data
      setcaptainData(data)
      localStorage.setItem('token', data.token)
      navigate("/captain/home")
    }

    setdata({
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      color :"",
      plate:"",
      capacity:"",
      vehicleType:""
    })
  }
  return (
    <div className='py-5 px-5 h-screen flex flex-col justify-between'>

      <div>
        <img className='w-20 mb-2' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSVCO4w_adxK32rCXFeKq3_NbLcR9b_js14w&s" alt="" />


        <form onSubmit={SubmitHandler}>

          <h3 className='text-lg w-full font-medium mb-2'
          >What's our Captain's Name</h3>

          <div className='flex gap-4 mb-5'>

            <input
              className='bg-[#eeeeee] w-1/2 rounded px-4 py-2 border  text-lg placeholder:text-base '
              type="text"
              required
              placeholder='First name'
              name='firstname' //connected with handleChange
              value={data.firstname}// connected with state
              onChange={handleChange}
            />
            <input
              className='bg-[#eeeeee] w-1/2 rounded px-4 py-2 border text-lg placeholder:text-base '
              type="text"
              required
              placeholder='Last name'//connected with handleChange
              name='lastname'// connected with state
              value={data.lastname}
              onChange={handleChange}
            />
          </div>

          <h3 className='text-lg font-medium mb-2'
          >What's your email</h3>
          <input
            className='bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-lg placeholder:text-base '
            type="email"
            required
            placeholder='email@example.com'
            name='email'//connected with handleChange
            value={data?.email}// connected with state
            onChange={handleChange}
          />

          <h3 className='text-lg font-medium mb-2'>Enter Password</h3>
          <input
            className='bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-lg placeholder:text-base '
            type="password"
            placeholder='password'
            name='password'//connected with handleChange
            value={data.password}// connected with state
            onChange={handleChange}
          />

          <h3 className='text-lg font-medium mb-2'>Vehicle Information</h3>
          <div className='flex flex-wrap  mb-7'>
              <input 
               className='bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-lg placeholder:text-base '
              required
              type="text"
              placeholder='Vehicle Color'
              name="color"
              value={data.color}
              onChange={handleChange}

              />
              <input 
               className='bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-lg placeholder:text-base '
              required
              type="text"
              placeholder='Vehicle Plate'
              name="plate"
              value={data.plate}
              onChange={handleChange}

              />
              <input 
               className='bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-lg placeholder:text-base '
              required
              type="number"
              placeholder='Vehicle Capacity'
              name="capacity"
              value={data.capacity}
              onChange={handleChange}

              />
              <select
              required
               className='bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-lg placeholder:text-base '
               name='vehicleType'// connected with handlechange
               value={data.vehicleType} // connected with state
               onChange={handleChange}
              >
                <option value="" disabled>Select Vehicle Type</option>
                <option value="car"> Car</option>
                <option value="auto"> Auto</option>
                <option value="motorcycle"> Motorbike</option>

              </select>
              
          </div>



          <button className='cursor-pointer bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 w-full text-lg placeholder:text-base ' type='submit'>Create Captain Account</button>

        </form>
        <p className='text-center'>Already Have a Account <Link to="/captain-login" className='text-blue-600'>Login Here</Link></p>
      </div>

      <div>
        <p className='text-[10px] mb-6 mt-2 leading-tight'>
          By proceeding, you concent to get calls, WhatsApp or SMS messages, including by automated means, from Uber and its affiliates to the number provided.
        </p>
      </div>

    </div>

  )
}

export default CaptainSignUp