import React, { useEffect , useState } from 'react'
import { useParams , useHistory , useLocation } from 'react-router-dom'
import { activate } from '../utilities/auth'
import { ToastContainer, toast } from 'react-toastify';



const Activation = () => {
    const [isActivate, setIsActivate] = useState(false)
    // const [valid, setInValid] = useState(true)
    const history = useHistory()
    const location = useLocation()
    function useToken() {
        return new URLSearchParams(location.search);
    }
    useEffect(async () => {
        const token = useToken().get("token")
        console.log(token)
        if(!token){
            history.replace("/");
        }
        // const toke ="fmiflk"
        try {
            const message = await activate(token);
            setIsActivate(true)
            toast.success(message || "Email is Activated . Now you can Login" , {
                onClose : () => history.replace("/login")
            })
            
        } catch (error) {
            // toast.error(error.message)
            toast.error(error?.response?.data?.error || "Something Went Wrong . Please try again")

            // if(error.message == )
        }
      
    }, [location])
    

  return (
    <>
    <ToastContainer
            position="top-center"
            autoClose={4000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
        />
    {isActivate ? <div className=" items-center px-5 py-12 lg:px-20">
        <div className="flex flex-col w-full max-w-md p-10 mx-auto my-6 transition duration-500 ease-in-out transform bg-white rounded-lg md:mt-0">
            <h1 className='text-center text-3xl font-black mb-9'> Yay! Your Account is activated</h1>
                        <div>
                            <button onClick={() => history.replace("/login")} type="submit" className="flex items-center justify-center w-full px-10 py-4 text-base font-medium text-center text-white transition duration-500 ease-in-out transform bg-blue-600 rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                GO to Login page
                            </button>
                        </div>
          </div>
    </div>
    :<div className=" items-center px-5 py-12 lg:px-20">
        <h3 className='text-center text-5xl font-bold'>Link is either invalid or expired </h3>
    <div className="flex flex-col w-full max-w-md p-10 mx-auto my-6 transition duration-500 ease-in-out transform bg-white rounded-lg md:mt-0">
        <h1 className='text-center text-3xl font-black mb-9'> Please Register</h1>
                    <div>
                        <button onClick={() => history.replace("/register")} type="submit" className="flex items-center justify-center w-full px-10 py-4 text-base font-medium text-center text-white transition duration-500 ease-in-out transform bg-blue-600 rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                            GO to register page
                        </button>
                    </div>
            </div>
        </div> 
        }
    </>
  )
}

export default Activation