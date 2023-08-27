import { publicRequest } from "../API/requestMethods"
import { loginFailure, loginStart, loginSuccess } from "./userRedux"
import axios from "axios"

export const login = async (dispatch, user) => {
    dispatch(loginStart())

    try{
        const res= await publicRequest.post("/api/auth/login/", user)
        dispatch(loginSuccess(res.data))
    }catch(err) {
        dispatch(loginFailure())
    }
}

export const register = async (user) => {
    try{
        user= {
            username: user['username'],
            email: user['email'],
            password: user['password'],
            first_name: user['firstname'],
            last_name: user['lastname'],
        }
        
        const response= await publicRequest.post("/api/auth/register/", user)

        return {
            status: 200,
            message: response.data
        }
    }catch(err) {

        return {
            status: 400,
            message: err['response']['data']
        }
    }
}

export const fetchChats= async(token, username) => {
    try {
        const response = await axios.get(`https://127.0.0.1:8000/api/chat?username=${username}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data
    }
    catch(err) {
        console.error(err)
        return {
            status: 400,
            message: err
        }
    }
}

export const createChat= async(username, friend, token) => {
    try {
        console.log(username, friend, token)
        const response = await axios.post(`https://127.0.0.1:8000/api/chat/create/`, 
        {
            messages: [],
            participants: [username, friend]
        },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return {
            status: 200,
            data: response.data
        }
    }
    catch(err) {
        // console.log(err)
        return {
            status: 400,
            data: err['response']['data']['error']
        }
    }
}