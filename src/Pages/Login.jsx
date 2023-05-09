
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../Redux/apiCalls";

import { Link } from "react-router-dom";


export const Login = () => {

    const [username, setUsername]= useState("")
    const [password, setPassword]= useState("")
    const dispatch= useDispatch()
    const { isFetching, error }= useSelector(state=>state.user)

    const handleClick = (e) => {
        e.preventDefault()
        login(dispatch, { username, password })
    }

    return (
                <div style={{width: "100%",
                    height: "100vh",
                    backgroundImage: "linear-gradient(to top, rgb(200, 207, 227, 0.5), rgba(200, 207, 227, 1))",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"}}>
                    <div style={{
                        width: "50%",
                        padding: "20px",
                        backgroundColor: "white"}}>
                        <h1 style={{
                            margin: "10px 10px",
                            fontWeight: "200",}}>
                            LOGIN
                        </h1>
                        <form style={{
                            display: "flex",
                            // flexWrap: "wrap",
                            flexDirection: "column"}}>
                            <input style={{
                                flex: "1",
                                minWidth: "40%",
                                margin: "10px 10px",
                                padding: "10px",}} placeholder="Username" onChange={(e)=>setUsername(e.target.value)}/>
                            <input style={{
                                flex: "1",
                                minWidth: "40%",
                                margin: "10px 10px",
                                padding: "10px",}} placeholder="Password" type="password" onChange={(e)=>setPassword(e.target.value)}/>
                            <a style={{
                                margin: "5px 10px",
                                fontSize: "12px",
                                textDecoration: "underline",
                                "&:hover": {
                                    textDecoration: "none",
                                    cursor: "pointer"
                                    // backgroundColor: Colors.light_gray
                                }}}>Forgot Password</a>
                            <a style={{
                                margin: "5px 10px",
                                fontSize: "12px",
                                textDecoration: "underline",
                                "&:hover": {
                                    textDecoration: "none",
                                    cursor: "pointer"
                                    // backgroundColor: Colors.light_gray
                                }}}>Create new account</a>
                        </form>
                        <div style={{display: "flex", alignItems: "center", flexDirection: "column"}} >
                            <div style={{
                                display:"flex",
                                alignItems: "center",
                                justifyContent: "center",
                                margin: "10px 0px 0px 0px"}}>
                                <button style={{
                                    padding: "10px 65px",
                                    border: "none",
                                    cursor: "pointer",
                                    backgroundColor: "#e1e6f5",
                                    "&:disabled" : {
                                        color: "#e1e6f5",
                                        cursor: "not-allowed"
                                    }}} variant="filled" onClick={handleClick} disabled={isFetching}>
                                        Login
                                </button>
                            </div>
                            <div style={{
                                display:"flex",
                                alignItems: "center",
                                justifyContent: "center",
                                margin: "10px 0px 0px 0px"}}>
                                <Link to="/register" style={{margin: "5px 10px",
                                    fontSize: "12px",
                                    textDecoration: "underline",
                                    "&:hover": {
                                        textDecoration: "none",
                                        cursor: "pointer"
                                        // backgroundColor: Colors.light_gray
                                    }, 
                                    textDecoration: "none", color: "black"}} >
                                    
                                        Register
                                </Link>
                            </div>
                            {/* {error && <span style={{
                                color: "red"}}>
                                    Something went wrong!
                                </span>} */}
                        </div>
                    </div>
                </div>
            )
        }