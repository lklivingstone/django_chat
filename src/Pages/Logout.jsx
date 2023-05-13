import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logOut } from "../Redux/userRedux";

import { useState } from "react";
import { login } from "../Redux/apiCalls";

import { Link } from "react-router-dom";




export const Logout = () => {
    const username= useSelector(state=> state.user.user.username)
    const dispatch= useDispatch()
    
    // const [username, setUsername]= useState("")
    const [password, setPassword]= useState("")
    const { isFetching, error }= useSelector(state=>state.user)


    const navigate= useNavigate()

    const handleClick = (e) => {
        dispatch(logOut())

        navigate("/")
    }

    return (
                    <div style={{width: "100%",
                    height: "100vh",
                    backgroundColor: "#8ee4af",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color:"white"}}>
                    <div style={{
                        width: "50%",
                        padding: "20px",
                        borderRadius: "7px",
                        backgroundColor: "#379683",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "column"}}>
                        <h1 style={{
                            margin: "10px 10px",
                            fontWeight: "200",}}>
                            Do you want to logout {username}?
                        </h1>
                        <div style={{display: "flex", alignItems: "center", flexDirection: "column"}} >
                            <div style={{
                                display:"flex",
                                alignItems: "center",
                                justifyContent: "center",
                                margin: "10px 0px 0px 0px"}}>
                                <button style={{
                                    padding: "10px 65px",
                                    color: "#edf5e1",
                                    border: "none",
                                    cursor: "pointer",
                                    backgroundColor: "#031d3b",
                                    "&:disabled" : {
                                        color: "#e1e6f5",
                                        cursor: "not-allowed"
                                    }}} variant="filled" onClick={handleClick} disabled={isFetching}>
                                        Logout
                                </button>
                            </div>
                           
                        </div>
                    </div>
                </div>
                    
    )
}