import { userSignup } from "../services/authApi.js"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import Loader from "../components/Loader.jsx"
import OtpInput from "../components/OtpInput.jsx"
import { login } from "../slices/userSlice.js"

function Signup() {

    const dispatch = useDispatch()

    const navigate = useNavigate()
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [loadingStatus, setLoadingStatus] = useState(false)
    const [otpFormStatus, setOtpFormStatus] = useState(false)


    const handleNavigate = () => {
        navigate("/login")
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoadingStatus(true)

        try {

            const response = await userSignup(username, email, password)

            if (response.data) {
                setLoadingStatus(false)
                setUsername("")
                setEmail("")
                setPassword("")
                toast.success("User registerd successfully")
                setLoadingStatus(false)

                dispatch(login(response.data.user))

            }
        } catch (error) {
            setLoadingStatus(false)
            toast.error(error.response.data.error)
        }

    }

    // const handleOTPSubmit = async (otp) => {
    //     try {
    //         setLoadingStatus(true)

    //         const response = await userSignupVerification(email, otp)

    //         if (response) {
    //             setLoadingStatus(false)

    //             toast.success("Registered successfully")
    //             navigate('/')
    //         }
    //     } catch (error) {
    //         toast.error(error.response.data.error)
    //         setLoadingStatus(false)
    //     }
    // }

    return (
        <div className="w-full h-screen bg-[#111] flex justify-center items-center font-[poppins]">

            <div className="w-full h-full flex flex-col items-center justify-center py-5 space-y-5 font-[poppins]">

                {/* Logo */}
                <div className="flex flex-col items-center sm:items-start absolute top-4 left-0 sm:left-4 right-0 sm:right-full leading-none">
                    <h1 className='font-[cookie] text-[40px] lg:text-[60px] text-[#3772ff]'>Shop<span className='text-[#f8d525]'>Sphere</span></h1>
                    {/* <p className="text-xs lg:text-sm text-gray-300">Explore, Discover, Shop ~ All in the Sphere</p> */}
                </div>



                <div className="w-[300px] sm:w-[350px] h-auto shadow-2xl bg-[#191919] border border-[#292929] rounded-2xl flex flex-col items-center py-10 px-6">

                    <div className="space-y-3 flex flex-col items-center">
                        <h1 className="text-[20px] font-bold text-white">Get started</h1>

                        <h2 className="text-sm text-gray-500">Already have an account? <button onClick={handleNavigate} className="text-[#3772ff] font-medium cursor-pointer">Login</button></h2>
                    </div>

                    <div className="w-full mt-10">
                        <form onSubmit={handleSubmit} className="flex flex-col space-y-6">

                            <div className="transition-all duration-300 w-full h-[50px] bg-[#303030] py-1 rounded-md group focus-within:bg-[#292929]">
                                <label className="text-sm font-medium pl-2 absolute select-none text-gray-400 group-focus-within:text-gray-300">Username</label>
                                <input required value={username} onChange={(e) => setUsername(e.target.value)} type="text" className="w-full h-full px-2 mt-2 outline-none text-sm text-white" />
                            </div>

                            <div className="transition-all duration-300 w-full h-[50px] bg-[#303030] py-1 rounded-md group focus-within:bg-[#292929]">
                                <label className="text-sm font-medium pl-2 absolute select-none text-gray-400 group-focus-within:text-gray-300">Email</label>
                                <input required value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="w-full h-full px-2 mt-2 outline-none text-sm text-white" />
                            </div>

                            <div className="transition-all duration-300 w-full h-[50px] bg-[#303030] py-1 rounded-md group focus-within:bg-[#292929]">
                                <label className="text-sm font-medium pl-2 absolute select-none text-gray-400 group-focus-within:text-gray-300">Password</label>
                                <input required value={password} min={8} onChange={(e) => setPassword(e.target.value)} type="password" className="w-full h-full px-2 mt-2 outline-none text-sm text-white" />
                            </div>

                            <button className="bg-[#3772ff] py-2 rounded-md text-white font-bold cursor-pointer hover:bg-[#2361d1]">Create account</button>

                        </form>
                    </div>

                </div>


            </div>
            <Loader isActive={loadingStatus} />

        </div>
    )
}

export default Signup