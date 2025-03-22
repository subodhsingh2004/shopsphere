import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Loader from './Loader'

export default function Protected({ children, authentication = true }) {

    const navigate = useNavigate()
    const [loader, setLoader] = useState(true)
    const isLoggedIn = useSelector(state => state.user.isLoggedIn)

    useEffect(() => {
        if (authentication && isLoggedIn !== authentication) {
            navigate("/login")
        } else if (!authentication && isLoggedIn !== authentication) {
            navigate("/")
        }
        setLoader(false)
    }, [isLoggedIn, navigate, authentication])

    return loader ? <Loader /> : <>{children}</>
}
