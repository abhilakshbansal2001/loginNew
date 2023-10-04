import React, {  useRef } from 'react'
import {  forgotPassword } from '../utilities/auth'
import { ToastContainer, toast } from 'react-toastify';
import { useFormik } from 'formik'
import { Link } from 'react-router-dom';

const validate = values => {
    const errors = {};
     
  
    if (!values.email) {
        errors.email = 'Required';
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
      }
  
    return errors;
};


const ForgotPassword = () => {

    const submitBtnRef = useRef();

    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validate,
        onSubmit: async ({email} , {setFieldValue,setFieldTouched,  ...others}) => {
            submitBtnRef.current.disabled = true;
            submitBtnRef.current.style.backgroundColor = "gray"

            try {
                const response = await forgotPassword({email })
                toast.success(response)
                
            } catch (error) {
                console.log(error)
                toast.error(error?.response?.data?.error || "Something Went Wrong . Please try again")

            }finally{
                submitBtnRef.current.disabled = false;
                submitBtnRef.current.style.backgroundColor = "rgb(59, 130, 246)"
                setFieldValue("email" , "")
                setFieldTouched("email" , false)
            }

        },
      });




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
        <div className='shadow-2xl'>
            <Link to={"/link"} className="shadow-sm p-9 rounded-lg">
                <button className=''>
                    Go back
                </button>
            </Link>

        </div>
        <div className="flex flex-col w-full max-w-md p-10 mx-auto my-6 transition duration-500 ease-in-out transform bg-white rounded-lg md:mt-0">
            <div className="mt-8">
                <div className="mt-6">
                <form  method="POST" onSubmit={formik.handleSubmit} className="space-y-6">
                            
                            

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-neutral-600"> Email address </label>
                                <div className="mt-1">
                                    <input required onBlur={formik.handleBlur} id="email" name="email" value={formik.values.email} onChange={formik.handleChange} type="email"   placeholder="Your Email" className="block w-full px-5 py-3 text-base placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg text-neutral-600 bg-gray-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300" /> 
                                    {formik.touched.email && formik.errors.email && <div className='text-xs text-red-600 pt-2'>{formik.errors.email}</div>}
                                </div>
                            </div>

                            
                            <div>
                                <button type="submit" ref={submitBtnRef} className="flex items-center justify-center w-full px-10 py-4 text-base font-medium text-center text-white transition duration-500 ease-in-out transform bg-blue-600 rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                    Send password reset email
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

export default ForgotPassword