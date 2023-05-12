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
        const res= await publicRequest.post("/api/auth/register/", user)
    }catch(err) {
        
    }
}

export const fetchChats= async(token, username) => {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/api/chat?username=${username}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data
    }
    catch(err) {
        console.error(err)
    }
}

export const createChat= async(username, friend, token) => {
    try {
        const response = await axios.post(`http://127.0.0.1:8000/api/chat/create/`, 
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