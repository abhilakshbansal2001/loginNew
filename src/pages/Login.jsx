import React , {useRef , useEffect} from 'react'
import { useFormik } from 'formik'
import { Link } from "react-router-dom"
import { loginAuth } from '../utilities/auth';
import { ToastContainer, toast } from 'react-toastify';
import { useHistory } from 'react-router-dom'
import { sendGoogleToken } from '../utilities/auth';

const validate = values => {
    const errors = {};
     
  
    if (!values.password) {
      errors.password = 'Required';
    } 
  
    if (!values.email) {
      errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Invalid email address';
    }
  
    return errors;
};









const Login = () => {

    const submitBtnRef = useRef(); 
    const history = useHistory()
    useEffect(() => {
        google.accounts.id.initialize({
            client_id: process.env.REACT_APP_GOOGLE_CLIENT,
            callback: responseGoogle
          });
          google.accounts.id.renderButton(
            document.getElementById("buttonDiv"),
            { theme: "outline", size: "large" }  // customization attributes
          );
    
      
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
          password: '',
        },
        validate,
        onSubmit: async ({email , password} , {setFieldValue,setFieldTouched,  ...others}) => {
            submitBtnRef.current.disabled = true;
            submitBtnRef.current.style.backgroundColor = "gray"

            try {
                await loginAuth(email , password)
                toast.success("Logged in!")
                
            } catch (error) {
                console.log(error)
                toast.error(error?.response?.data?.error || "Something Went Wrong . Please try again")

            }finally{
                submitBtnRef.current.disabled = false;
                submitBtnRef.current.style.backgroundColor = "rgb(59, 130, 246)"
                setFieldValue("password" , "")
                // setError("")
                setFieldTouched("password" , false)
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
                    <h2 className="mt-6 text-3xl font-extrabold text-neutral-600">Login</h2>
                </div>

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

                            <div className="space-y-1">
                                <label htmlFor="password" className="block text-sm font-medium text-neutral-600"> Password </label>
                                <div className="mt-1">
                                    <input id="password" required onBlur={formik.handleBlur} name="password" value={formik.values.password} onChange={formik.handleChange} type="password"   placeholder="Your Password" className="block w-full px-5 py-3 text-base placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg text-neutral-600 bg-gray-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300" /> 
                                    {formik.touched.password && formik.errors.password && <div className='text-xs text-red-600 pt-2'>{formik.errors.password}</div>}
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                

                                <div className="text-sm">
                                    <Link to={"/forgotPassword"} className="font-medium text-blue-600 hover:text-blue-500"> Forgot your password? </Link>
                                </div>
                            </div>
                            <div>
                                <button type="submit" ref={submitBtnRef} className="flex items-center justify-center w-full px-10 py-4 text-base font-medium text-center text-white transition duration-500 ease-in-out transform bg-blue-600 rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Login</button>
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


                        {/* <GoogleLogin
                            clientId={`${process.env.REACT_APP_GOOGLE_CLIENT}`}
                            onSuccess={responseGoogle}
                            onFailure={errorGoogle}
                            cookiePolicy={'single_host_origin'}
                            render={renderProps => (
                    
                                <button type="submit" 
                                    onClick={renderProps.onClick}
                                    disabled={renderProps.disabled} 
                                    className="w-full items-center block px-10 py-3.5 text-base font-medium text-center text-blue-600 transition duration-500 ease-in-out transform border-2 border-white shadow-md rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                                        <div className="flex items-center justify-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" className="w-6 h-6" viewBox="0 0 48 48">
                                                <defs>
                                                    <path id="a" d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"></path>
                                                </defs>
                                                <clipPath id="b">
                                                    <use xlinkHref="#a" overflow="visible"></use>
                                                </clipPath>
                                                <path clipPath="url(#b)" fill="#FBBC05" d="M0 37V11l17 13z"></path>
                                                <path clipPath="url(#b)" fill="#EA4335" d="M0 11l17 13 7-6.1L48 14V0H0z"></path>
                                                <path clipPath="url(#b)" fill="#34A853" d="M0 37l30-23 7.9 1L48 0v48H0z"></path>
                                                <path clipPath="url(#b)" fill="#4285F4" d="M48 48L17 24l-4-3 35-10z"></path>
                                            </svg>
                                            <span className="ml-4"> Login with Google</span>
                                        </div>
                                </button>
                            )}
                            ></GoogleLogin> */}
                            {/* <div id="g_id_onload"
                                data-client_id="1069477211927-4407t8bjepsaqfoc73i1lkdqg0qpmpn7.apps.googleusercontent.com"
                                data-context="signin"
                                data-ux_mode="popup"
                                data-callback="responseGoogle"
                                data-auto_prompt="false">
                            </div>

                            <div class="g_id_signin"
                                data-type="standard"
                                data-shape="pill"
                                data-theme="outline"
                                data-text="signin_with"
                                data-size="large"
                                data-logo_alignment="left">
                            </div> */}
                            <div id="buttonDiv"></div>
                        
                    </div>
                </div>
                    <div className='font-medium text-xs  mt-8'>Not registered yet ?<Link to="/register" className='btn ml-1 text-blue-700 hover:text-blue-500'>Create a new account</Link></div>
            </div>
        </div>
        <div className="relative flex-1 hidden w-0 overflow-hidden lg:block">
            <img className="absolute inset-0 object-cover w-full h-full" src="https://images.unsplash.com/photo-1491933382434-500287f9b54b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=1000&amp;q=80" alt="" />
        </div>
    </div>
</section>
  )
}

export default Login