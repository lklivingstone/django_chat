
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

    const handleKeyDown = (e) => {
        if (e.code === "Enter") {
            handleClick(e)
        }
    };

    return (
                <div style={{width: "100%",
                    height: "100vh",
                    backgroundColor: "#8ee4af",
                    color: "#edf5e1",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"}}>
                    <div style={{
                        width: "50%",
                        padding: "20px",
                        borderRadius: "7px",
                        backgroundColor: "#379683",}}>
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
                                padding: "10px",}} placeholder="Password" type="password" onChange={(e)=>setPassword(e.target.value)} 
                                onKeyDown={handleKeyDown}/>
                            <a style={{
                                margin: "5px 10px",
                                fontSize: "12px",
                                textDecoration: "underline",
                                "&:hover": {
                                    textDecoration: "none",
                                    cursor: "pointer"
                                    // backgroundColor: Colors.light_gray
                                }}}>Forgot Password</a>
                            <a href="/register" style={{
                                margin: "5px 10px",
                                fontSize: "12px",
                                textDecoration: "underline",
                                color: "#edf5e1",
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
                                    backgroundColor: "#031d3b",
                                    color: "#edf5e1",
                                    "&:disabled" : {
                                        color: "#e1e6f5",
                                        cursor: "not-allowed"
                                    }}} variant="filled" onClick={handleClick} disabled={isFetching}>
                                        LOGIN
                                </button>
                            </div>
                            <div style={{
                                display:"flex",
                                alignItems: "center",
                                justifyContent: "center",
                                margin: "10px 0px 0px 0px"}}>
                                <Link to="/register" style={{margin: "5px 10px",
                                    fontSize: "17px",
                                    textDecoration: "underline",
                                    "&:hover": {
                                        textDecoration: "none",
                                        cursor: "pointer"
                                        // backgroundColor: Colors.light_gray
                                    }, 
                                    textDecoration: "none", 
                                    color: "#edf5e1",}} >
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