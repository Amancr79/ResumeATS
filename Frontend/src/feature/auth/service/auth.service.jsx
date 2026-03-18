import axios from "axios"

const api = axios.create({
    baseURL : "http://localhost:3000/api/auth/",
    withcredentials:true
})

/**
 * @descr function to register user
 */

export async function registerUser({username,email,password}){
    try{
       const response = await api.post('register',{
        username , email, password
    });
    return response.data;
    }
    catch(err){
        console.log(err);
    }
}

/**
 * @descr function to login user
 */
export async function loginUser({email,password}){
    try{
       const response = await api.post('login',{
       email, password
    });
    return response.data;
    }
    catch(err){
        console.log(err);
    }
}

/**
 * @descr function to logout user
 */
export async function logoutUser(){
    try{
       const response = await api.get('logout');
    return response.data;
    }
    catch(err){
        console.log(err);
    }
}

/**
 * @descr function to retrieve user profile
 */
export async function getUserProfile(){
    try{
       const response = await api.get('profile');
    return response.data;
    }
    catch(err){
        console.log(err);
    }
}

export default api;