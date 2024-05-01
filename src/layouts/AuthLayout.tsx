import Logo from "@/components/Logo"
import { useEffect } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import { ToastContainer } from "react-toastify"


const AuthLayout = () => {

  const navigate = useNavigate();


  useEffect(() => {
    const token = localStorage.getItem('AUTH_TOKEN')?.includes('') ? true : false
    if (token) {
      navigate('/')
    }
  }, [])

  return (
    <div className="bg-gray-800 min-h-screen">
        <div className="py- lg:py-20 mx-auto w-[450px]">
            <Logo />
            <div className="mt-10">
                <Outlet />
            </div>
        </div>
        <ToastContainer />
    </div>
  )
}

export default AuthLayout
