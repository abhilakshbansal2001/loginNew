import { authenticate } from "./helper";
import axios from '../../axios.config'

export const loginAuth = async (email , password) => {
    const response = await axios.post('/api/auth/login' , {
        email,password
    });

    authenticate(response , () => console.log("success"))

}


export const registerAuth = async ({name , email , password}) => {
    const response = await axios.post('/api/auth/register' , {
        email,password,name
    });
    return response?.data?.message
    // authenticate(response , () => console.log("success"))

}


export const activate = async (token) => {
    const response = await axios.put('/api/auth/activation' , {
       token
    });
    return response?.data?.message
    
    // return response?.data?.message
    // authenticate(response , () => console.log("success"))
    // authenticate(response , () => console.log("success"))

}

export const resetPassword = async ({confirmPassword, password , token}) => {
    const response = await axios.put('api/auth/passwordreset' , {
        password , confirmPassword , token
    })
    return response?.data?.message
}

export const forgotPassword = async ({ email }) => {
    const response = await axios.post('api/auth/forgotpassword' , {
        email
    })
    return response?.data?.message
}

export const sendGoogleToken = async (tokenId) => {
    const response = await axios
      .post(`api/auth/googlelogin`, {
        idToken: tokenId
      })
      console.log(response , " res")
    return response?.data?.message
    
      
  };