import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom'
import Error from '../../../pages/Error'

export const PrivateRoute = ({children}) => {

    const { token } = useSelector((state) => state.auth)
    const navigate = useNavigate()
  
    if (token !== null) {
        return children
    }
    else {
        return <Error/>
    }
    
    
    

}
