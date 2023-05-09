import { publicRequest } from "../API/requestMethods"
import { loginFailure, loginStart, loginSuccess } from "./userRedux"

export const login = async (dispatch, user) => {
    dispatch(loginStart())

    try{
        const res= await publicRequest.post("/api/auth/login/", user)
        console.log(res.data)
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