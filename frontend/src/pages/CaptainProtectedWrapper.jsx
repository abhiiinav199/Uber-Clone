


import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CaptainDataContext } from '../context/CaptainContext'
import axios from 'axios'

const CaptainProtectedWrapper = ({children}) => {

    const navigate = useNavigate()
    const token = localStorage.getItem('token')
    const { captainData, setcaptainData } = useContext(CaptainDataContext)
    const [loading, setloading] = useState(true)
    
    useEffect(() => {
        if(!token){
            navigate("/captain-login")
            
        }

        axios.get(`${import.meta.env.VITE_BASE_URL}/captains/profile`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            if (response.status === 200) {
                const data= response.data
                setcaptainData(data.captain)
                setloading(false)
            }
        })
            .catch(err => {
                console.log(err)
                localStorage.removeItem('token')
                navigate('/captain-login')
            })
    }, [token])

    if(loading){
        return( 
            <div>Loading...</div>
        )
    }
    
    return (
        <div>{children}</div>
    )
}

export default CaptainProtectedWrapper
