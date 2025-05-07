import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom'

export const PrivateRoute = ({children}) => {

    const { token } = useSelector((state) => state.auth)
    const navigate = useNavigate()
  
    if (token !== null) {
        return children
    }
    
    navigate('/login')
    

}
