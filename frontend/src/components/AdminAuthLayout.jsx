import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { useSelector } from "react-redux"
import Loader from "./Loader"

export default function Protected({ children, authentication = true }) {

    const navigate = useNavigate()
    const [loader, setLoader] = useState(true)
    const isLoggedIn = useSelector(state => state.user.isLoggedIn)
    const userRole = useSelector(state => state.user.userDetails.role)
    const hasToastFired = useRef(false);

    useEffect(() => {

        if (hasToastFired.current) return;
        // if user is not admin then redirect to home page
        if (authentication && isLoggedIn !== authentication) {
            navigate("/login")
        } else if (authentication && isLoggedIn == authentication) {
            if (userRole !== 'admin') {
                navigate('/')
                toast.error('You are not authorized to view this page')
                hasToastFired.current = true;
            }
        }
        setLoader(false)
    }, [isLoggedIn, navigate, authentication, userRole])

    return loader ? <Loader /> : <>{children}</>
}
