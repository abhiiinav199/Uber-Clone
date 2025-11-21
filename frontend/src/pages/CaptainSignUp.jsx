import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const CaptainSignUp = () => {

  const [data, setdata] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: ""
  })
  const [captainSignUpData, setcaptainSignUpData] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target;
    setdata((prev) => (
      { ...prev, [name]: value }
    ))
  }

  const SubmitHandler = (e) => {
    e.preventDefault();
    setcaptainSignUpData({
      fullname: {
        first: data.firstname,
        last: data.lastname
      },
      email: data.email,
      password: data.password
    })
    // console.log(userSignupData)

    setdata({
      firstname: "",
      lastname: "",
      email: "",
      password: ""
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

            <button className='cursor-pointer bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 w-full text-lg placeholder:text-base ' type='submit'>Login</button>

          </form>
          <p className='text-center'>Already Have a Account <Link to="/captain-login" className='text-blue-600'>Login Here</Link></p>
        </div>

        <div>
          <p className='text-[10px] leading-tight'>
            By proceeding, you concent to get calls, WhatsApp or SMS messages, including by automated means, from Uber and its affiliates to the number provided.
          </p>
        </div>

      </div>
    
  )
}

export default CaptainSignUp