import { useState } from "react";
import { Link } from "react-router-dom";

const CaptainLogin = () => {
    const [data, setdata] = useState({
      email: "",
      password:""
    })
    const [userData, setuserData] = useState({})
  
    const handleChange = (e) => {
      const {name, value} = e.target;
      setdata((prev) =>(
        {...prev, [name]: value}
      ))
    }
  
    const SubmitHandler = (e) => {
      e.preventDefault();
      setuserData(data)
      // console.log(userData)
  
      setdata({
        email:"", 
        password: ""})
    }
  return (
  <div className='p-7 h-screen flex flex-col justify-between'>

      <div>
         <img className='w-20 mb-2' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSVCO4w_adxK32rCXFeKq3_NbLcR9b_js14w&s" alt="" />

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
        <p className='text-center'>Join a fleet? <Link to="/captain-signup" className='text-blue-600'>Register as a Captain </Link></p>
      </div>

      <div>
        <Link 
        to="/login"
        className='bg-[#d5622d] cursor-pointer flex items-center justify-center text-white font-semibold mb-5 rounded px-4 py-2 w-full text-lg placeholder:text-base '>Sign in as User </Link>
      </div>
    
    </div>
  )
}

export default CaptainLogin