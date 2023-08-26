import { Button, CssBaseline } from "@mui/material"
import { styled } from "@mui/system"
import { register } from "../Redux/apiCalls";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";


import { Link } from "react-router-dom";

import "./Pages.css"

const Wrapper = styled("div")({
    width: "100%",
    height: "100vh",
    backgroundImage: "linear-gradient(to top, rgb(200, 207, 227, 0.5), rgba(200, 207, 227, 1))",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
})

const Container = styled("div")(({theme})=>({
    width: "50%",
    [theme.breakpoints.down("sm")]:{
        width: "65%",
    },
    padding: "20px",
    backgroundColor: "white",
    // display: "flex",
    // flexDirection: "column",
}))

const Form = styled("form")(({theme})=>({
    display: "flex",
    [theme.breakpoints.up("md")]:{
        flexWrap: "wrap",
    },
    [theme.breakpoints.down("md")]:{
        flexDirection: "column"
    },
}))

const Title = styled("h1")({
    margin: "10px 10px",
    fontWeight: "200",
})

const Input = styled("input")({
    flex: "1",
    minWidth: "40%",
    margin: "10px 10px",
    padding: "10px",

})

const TermsandCondition = styled("span")({
    fontSize: "12px",
    margin: "10px 10px",
})

const SubmitButton = styled(Button)({
    padding: "10px 65px",
    border: "none",
    cursor: "pointer",
    backgroundColor: "#e1e6f5"
})

const ButtonDiv = styled("div")({
    display:"flex",
    alignItems: "center",
    justifyContent: "center"
})


export const Register = () => {

    const [username, setUsername]= useState("")
    const [password, setPassword]= useState("")
    const [confirmPassword, setConfirmPassword]= useState("")
    const [firstname, setFirstname]= useState("")
    const [lastname, setLastname]= useState("")
    const [email, setEmail]= useState("")
    const [passwordMismatch, setPasswordMismatch] = useState(false);
    const [warning, setWarning]= useState("")

    const navigate= useNavigate()

    
    const dispatch= useDispatch()
    const { isFetching, error }= useSelector(state=>state.user)

    // const { isFetching, error }= useSelector(state=>state.user)

    const handleClick = async (e) => {
        e.preventDefault()
        // console.log(firstname, lastname, email, username, password)

        if (password!==confirmPassword) {
            setPasswordMismatch(true)
        }
        else {
            const response= await register({ firstname, lastname, username, email, password })
            
            if (response.status===200) {
                navigate("/login")
            }
            else {
                const { username, email } = response['message'];
                console.log(username, email)
                if (username && email){
                    setWarning("Username and Email already in use!")
                    alert("Username and Email already in use!")
                }
                else if (email) {
                    setWarning("Email already in use!")
                    alert("Email already in use!")
                }
                else if (username){
                    setWarning("Username already in use!")
                    alert("Username already in use!")
                }
                else {
                    setWarning("Invalid Credentials!")
                    alert("Invalid Credentials!")
                }
                
            }
        }
    }
    const handleKeyDown = (e) => {
        if (e.code === "Enter") {
            handleClick(e)
        }
    };
    return (
        <div style={{
            width: "100%",
            height: "100vh",
            backgroundColor: "#8ee4af",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#edf5e1"}}>
                    <div style={{
                        width: "50%",
                        padding: "20px",
                        borderRadius: "7px",
                        backgroundColor: "#379683",}}>
                        <h1 style={{
                            margin: "10px 10px",
                            fontWeight: "200",}}>
                            CREATE AN ACCOUNT
                        </h1>
                        <form className="register-container">
                        <input style={{
                                flex: "1",
                                minWidth: "40%",
                                margin: "10px 10px",
                                padding: "10px"}} placeholder="First Name" onChange={(e)=>setFirstname(e.target.value)}/>
                            <input style={{
                                flex: "1",
                                minWidth: "40%",
                                margin: "10px 10px",
                                padding: "10px"}} placeholder="Last Name" onChange={(e)=>setLastname(e.target.value)}/>
                            <input style={{
                                flex: "1",
                                minWidth: "40%",
                                margin: "10px 10px",
                                padding: "10px"}} placeholder="Username" onChange={(e)=>setUsername(e.target.value)}/>
                            <input style={{
                                flex: "1",
                                minWidth: "40%",
                                margin: "10px 10px",
                                padding: "10px"}} placeholder="E-Mail" onChange={(e)=>setEmail(e.target.value)}/>
                            <input 
                            type="password" 
                            className={passwordMismatch ? 'mismatch' : ''}
                            style={{
                                flex: "1",
                                minWidth: "40%",
                                margin: "10px 10px",
                                padding: "10px"}} placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
                            <input 
                            type="password" 
                            className={passwordMismatch ? 'mismatch' : ''}
                            style={{
                                flex: "1",
                                minWidth: "40%",
                                margin: "10px 10px",
                                padding: "10px"}} placeholder="Confirm Password" onChange={(e)=>setConfirmPassword(e.target.value)} onKeyDown={handleKeyDown}/>
                            <span style={{
                            fontSize: "12px",
                            margin: "10px 10px"}}>
                                By creating an account <b>PRIVACY POLICY</b>
                            </span>
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
                                        REGISTER
                                </button>
                            </div>
                            
                        </div>
                    </div>
                </div>

    )
}