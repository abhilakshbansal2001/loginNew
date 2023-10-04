import React , {useRef , useEffect} from 'react'
import { useFormik } from 'formik'
import { Link , useHistory } from "react-router-dom"
import { registerAuth, sendGoogleToken } from '../utilities/auth';
import { ToastContainer, toast } from 'react-toastify';

const validate = values => {
    const errors = {};
    if (!values.name) {
      errors.name = 'Required';
    } 
  
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
  
    if (!values.email) {
      errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Invalid email address';
    }
  
    return errors;
};

const Register = (props) => {

    const submitBtnRef = useRef(); 
    const history = useHistory()

    useEffect(() => {
        if(google){
            google.accounts.id.initialize({
                client_id: process.env.REACT_APP_GOOGLE_CLIENT,
                callback: responseGoogle
            });
            google.accounts.id.renderButton(
                document.getElementById("buttonDiv"),
                { theme: "outline", size: "large" }  // customization attributes
            );
        }
      
    }, [])


    const responseGoogle = async(response) => {
        console.log(response , "Hello wrol");
        try {
            const message = await sendGoogleToken(response.credential);
            toast.success((message || "Logged in Successfully") ,{
                onClose : () => {
                    history.replace("/")
                } 
            })
        } catch (error) {
            toast.error(error?.response?.data?.error || "Something Went Wrong . Please try again")
            
        }
      };

    const formik = useFormik({
        initialValues: {
          email: '',
          name: '',
          password: '',
          confirmPassword: '',
        },
        validate,
        onSubmit: async ({email , name, password} , {setFieldValue,setFieldTouched,  ...others}) => {
            submitBtnRef.current.disabled = true;
            submitBtnRef.current.style.backgroundColor = "gray"
            // console.log("first " , email , password , name)
            try {
                const message = await registerAuth({email , name, password})
                toast.success(message || "Email sent to your registered" , {
                    onClose : () => history.replace("/login")
                })
                
            } catch (error) {
                // setError("Password or Email is incorrect. Please try again.")
                toast.error(error?.response?.data?.error || "Something Went Wrong . Please try again")
            }finally{
                submitBtnRef.current.disabled = false;
                submitBtnRef.current.style.backgroundColor = "rgb(59, 130, 246)"
                setFieldValue("password" , "")
                setFieldValue("confirmPassword" , "")
                setFieldTouched("password" , false)
                setFieldTouched("confirmPassword" , false)
            }

        },
      });

  

  return (
    <section className="px-4 sm:px-0">
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
    <div className="flex min-h-screen overflow-hidden" >
        <div className="flex flex-col justify-center flex-1 px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
            <div className="w-full max-w-xl mx-auto lg:w-96">
                <div>
                    <a href="./index.html" className="text-blue-600 text-medium">Movie.</a>
                    <h2 className="mt-6 text-3xl font-extrabold text-neutral-600">Register</h2>
                </div>

                <div className="mt-8">
                    <div className="mt-6">
                        <form  method="POST" onSubmit={formik.handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-neutral-600"> Name </label>
                                <div className="mt-1">
                                    <input required onBlur={formik.handleBlur} id="name" name="name" value={formik.values.name} onChange={formik.handleChange} type="text"   placeholder="Your name" className="block w-full px-5 py-3 text-base placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg text-neutral-600 bg-gray-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300" /> 
                                    {formik.touched.name && formik.errors.name && <div className='text-xs text-red-600 pt-2'>{formik.errors.name}</div>}
                                </div>
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-neutral-600"> Email address </label>
                                <div className="mt-1">
                                    <input required onBlur={formik.handleBlur} id="email" name="email" value={formik.values.email} onChange={formik.handleChange} type="email"   placeholder="Your Email" className="block w-full px-5 py-3 text-base placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg text-neutral-600 bg-gray-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300" /> 
                                    {formik.touched.email && formik.errors.email && <div className='text-xs text-red-600 pt-2'>{formik.errors.email}</div>}
                                </div>
                            </div>

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

                            <div className="flex items-center justify-between">
                                {/* <div className="flex items-center">
                                    <input id="remember-me" name="remember-me" type="checkbox" placeholder="Your password" className="w-4 h-4 text-blue-600 border-gray-200 rounded focus:ring-blue-500" /> 
                                    <label htmlFor="remember-me" className="block ml-2 text-sm text-neutral-600"> Remember me </label>
                                </div> */}

                                <div className="text-sm">
                                    <a href="#" className="font-medium text-blue-600 hover:text-blue-500"> Forgot your password? </a>
                                </div>
                            </div>
                            <div>
                                <button type="submit" ref={submitBtnRef} className="flex items-center justify-center w-full px-10 py-4 text-base font-medium text-center text-white transition duration-500 ease-in-out transform bg-blue-600 rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Register</button>
                            </div>
                        </form>
                        <div className="relative my-4">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-neutral-600"> Or continue with </span>
                            </div>
                        </div>
                        <div id="buttonDiv"></div>

                    </div>
                </div>
                <div className='font-medium text-xs  mt-8'>Already have an account ?<Link to="/login" className='btn ml-1 text-blue-700 hover:text-blue-500'>Sign in</Link></div>

            </div>
        </div>
        <div className="relative flex-1 hidden w-0 overflow-hidden lg:block">
            <img className="absolute inset-0 object-cover w-full h-full" src="https://images.unsplash.com/photo-1491933382434-500287f9b54b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=1000&amp;q=80" alt="" />
        </div>
    </div>
</section>
  )
}

export default Register