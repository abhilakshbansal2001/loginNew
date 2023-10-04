import React, { useEffect , useState , useRef } from 'react'
import { useHistory , useLocation } from 'react-router-dom'
import {  resetPassword } from '../utilities/auth'
import { ToastContainer, toast } from 'react-toastify';
import { useFormik } from 'formik'

const validate = values => {
    const errors = {};
     
  
    if (!values.password) {
        errors.password = 'Required';
      } else if (values.password.length < 5) {
        errors.password = 'Must be 5 characters or more';
      }
      if (!values.confirmPassword) {
        errors.confirmPassword = 'Required';
      } else if (values.password != values.confirmPassword) {
        errors.confirmPassword = 'Passwords do not match';
      }
  
    return errors;
};


const ResetPassword = () => {
    const [token, setToken] = useState("")
    const history = useHistory()
    const location = useLocation()
    function useToken() {
        return new URLSearchParams(location.search);
    }


    const submitBtnRef = useRef(); 

    const formik = useFormik({
        initialValues: {
            confirmPassword: '',
            password: '',
        },
        validate,
        onSubmit: async ({ password} , {setFieldValue,setFieldTouched,  ...others}) => {
            submitBtnRef.current.disabled = true;
            submitBtnRef.current.style.backgroundColor = "gray"

            try {
                const message = await resetPassword({password , token})
                toast.success(message , {
                    onClose : () => {
                        history.push("/login")
                    }
                })
                
            } catch (error) {
                console.log(error)
                toast.error(error?.response?.data?.error || "Something Went Wrong . Please try again")

            }finally{
                submitBtnRef.current.disabled = false;
                submitBtnRef.current.style.backgroundColor = "rgb(59, 130, 246)"
                setFieldValue("password" , "")
                setFieldValue("confirmPassword" , "")
                // setError("")
                setFieldTouched("password" , false)
                setFieldTouched("confirmPassword" , false)
            }

        },
      });


    // useEffect(async () => {
    //     const token = useToken().get("token")
    //     if(!token){
    //         history.replace("/");
    //     }else
    //         setToken(token)
        
      
    // }, [location])
    

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

<section className="">
    <div className="items-center px-5 py-12 lg:px-20">
        <div className="flex flex-col w-full max-w-md p-10 mx-auto my-6 transition duration-500 ease-in-out transform bg-white rounded-lg md:mt-0">
            <div className="mt-8">
                <div className="mt-6">
                <form  method="POST" onSubmit={formik.handleSubmit} className="space-y-6">
                            
                            

                            <div className="space-y-1">
                                <label htmlFor="password" className="block text-sm font-medium text-neutral-600"> Password </label>
                                <div className="mt-1">
                                    <input id="password" required onBlur={formik.handleBlur} name="password" value={formik.values.password} onChange={formik.handleChange} type="password"   placeholder="Your Password" className="block w-full px-5 py-3 text-base placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg text-neutral-600 bg-gray-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300" /> 
                                    {formik.touched.password && formik.errors.password && <div className='text-xs text-red-600 pt-2'>{formik.errors.password}</div>}
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label htmlFor="confirmPassword" className="block text-sm font-medium text-neutral-600">Confirm Password </label>
                                <div className="mt-1">
                                    <input id="confirmPassword" required onBlur={formik.handleBlur} name="confirmPassword" value={formik.values.confirmPassword} onChange={formik.handleChange} type="password"   placeholder="Your Password" className="block w-full px-5 py-3 text-base placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg text-neutral-600 bg-gray-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300" /> 
                                    {formik.touched.confirmPassword && formik.errors.confirmPassword && <div className='text-xs text-red-600 pt-2'>{formik.errors.confirmPassword}</div>}
                                </div>
                            </div>

                            
                            <div>
                                <button type="submit" ref={submitBtnRef} className="flex items-center justify-center w-full px-10 py-4 text-base font-medium text-center text-white transition duration-500 ease-in-out transform bg-blue-600 rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                    Reset Password
                                </button>
                            </div>
                        </form>
                    
                    
                </div>
            </div>
        </div>
    </div>
</section>

    </>
  )
}

export default ResetPassword