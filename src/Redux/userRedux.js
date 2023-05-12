import { createSlice } from "@reduxjs/toolkit"

const userSlice = createSlice({
    name: "user",
    initialState: {
        user: null,
        token: null,
        isFetching: false,
        chatID: null,
        recipient:null,
        error: false
    },
    reducers: {
        loginStart: (state) => {
            state.isFetching= true
        },
        loginSuccess: (state, action)=> {
            state.isFetching= false
            state.user= action.payload
            state.token= action.payload["access_token"]
        },
        loginFailure: (state) => {
            state.isFetching= false
            state.error= true
        },
        logOut: (state)=> {
            state.user= null
            state.token= null
        },
        changeChatID: (state, action) => {
            state.chatID= action.payload
        },
        changeRecipient: (state, action) => {
            state.recipient= action.payload
        },
    }
})

export const { loginStart, loginFailure, loginSuccess, logOut, changeChatID, changeRecipient } = userSlice.actions
export default userSlice.reducer