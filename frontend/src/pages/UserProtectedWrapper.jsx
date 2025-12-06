import {useContext, useEffect, useState} from 'react'
import { UserDataContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const UserProtectedWrapper = ({children}) => {

    const token = localStorage.getItem('token')
    const navigate = useNavigate()
    const {user, setUser } =useContext(UserDataContext)
    const [isLoading, setisLoading] = useState(true)
    useEffect(() =>{
      
    if(!token){
      navigate("/login")
    }

    axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`,{
      headers:{
        Authorization : `Bearer ${token}`
      }
    }).then((res) =>{``
      if(res.status === 200){
        const data = res.data
        setUser(data)
        setisLoading(false)
      }
    }).catch(error =>{
      console.log(error)
      localStorage.removeItem("token")
      navigate("/login")
    })


    },[token])

    if(isLoading){
      <div>
        <p>Loading...</p>
      </div>
    }
  return (
    <div>{children}</div>
  )
}

export default UserProtectedWrapper