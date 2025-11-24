import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserDataContext } from '../context/UserContext';

const UserSignup = () => {
  const [data, setdata] = useState({
    firstname: "",
    lastname:"",
    email: "",
    password: "",
  })
  const {user, setUser} = useContext(UserDataContext)


  const navigate=useNavigate()
  
   const handleChange = (e) => {
    const {name, value} = e.target;
    setdata((prev) =>(
      {...prev, [name]: value}
    ))
  }

   const SubmitHandler = async (e) => {
    e.preventDefault();
    const newUser= {
       fullname:{
        firstname: data.firstname,
        lastname: data.lastname
      },
      email: data.email,
      password: data.password
    }
    
    const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser)

    if(res.status === 201){
      
      const data = res.data

      setUser(data.user)
      localStorage.setItem('token', data.token)
      navigate("/home")


    }
    setdata({
      firstname: "",
      lastname:"",
      email:"", 
      password: ""})
  }
  return (
    <div>
      <div className='p-7 h-screen flex flex-col justify-between'>

        <div>
          <img className='w-16 mb-10' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />

          <form onSubmit={SubmitHandler}>

            <h3 className='text-lg font-medium mb-2'
            >What's Your Name</h3>

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

            <button className='cursor-pointer bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 w-full text-lg placeholder:text-base ' type='submit'>Create Account</button>

          </form>
          <p className='text-center'>Already Have a Account <Link to="/login" className='text-blue-600'>Login Here</Link></p>
        </div>

        <div>
       <p className='text-[10px] leading-tight'>
        By proceeding, you concent to get calls, WhatsApp or SMS messages, including by automated means, from Uber and its affiliates to the number provided.
       </p>
        </div>

      </div>
    </div>
  )
}

export default UserSignup
