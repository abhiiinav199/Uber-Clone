import axios from 'axios'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const CaptainLogout = () => {
    const navigate = useNavigate()

    useEffect(()=>{

        const logoutCaptain = async ()=>{
            const token = localStorage.getItem("token") 
            try {
                const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/captains/logout`,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if(res.status === 200){
                localStorage.removeItem("token")
                navigate("/captain-login")
            }
            } catch (error) {
                console.log("Logout Failed", error)
            }
        }
        logoutCaptain()
    },[navigate])
  return (
    <div>CaptainLogout</div>
  )
}

export default CaptainLogout