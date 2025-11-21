import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const UserLogin = () => {
  const [data, setdata] = useState({
    email: "",
    password:""
  })
const [captainData, setcaptainData] = useState({})


  const handleChange = (e) => {
    const {name, value} = e.target;
    setdata((prev) =>(
      {...prev, [name]: value}
    ))
  }

  const SubmitHandler = (e) => {
    e.preventDefault();
    setcaptainData(data)
    // console.log(userData)

    setdata({
      email:"", 
      password: ""})
  }

  return (
    <div className='p-7 h-screen flex flex-col justify-between'>

      <div>
         <img className='w-16 mb-10' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />

      <form onSubmit={SubmitHandler}>

      <h3 className='text-lg font-medium mb-2'
      >What's your email</h3>
        <input 
        className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base '
        type="email" 
        required 
        placeholder='email@example.com' 
        name='email'
        value={data?.email}
        onChange={handleChange}
        />

        <h3 className='text-lg font-medium mb-2'>Enter Password</h3>
        <input 
        className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base ' 
        type="password" 
        placeholder='password' 
        name='password'
        value={data.password}
        onChange={handleChange}
        />

        <button className='cursor-pointer bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 w-full text-lg placeholder:text-base ' type='submit'>Login</button>

      </form>
        <p className='text-center'>New Here? <Link to="/signup" className='text-blue-600'>Create a new Account</Link></p>
      </div>

      <div>
        <Link 
        to="/captain-login"
        className='cursor-pointer flex items-center justify-center bg-[#10b461] text-white font-semibold mb-5 rounded px-4 py-2 w-full text-lg placeholder:text-base '>Sign in as Captain </Link>
      </div>
    
    </div>
  )
}

export default UserLogin
