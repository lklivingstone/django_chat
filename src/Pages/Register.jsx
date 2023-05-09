import { Button, CssBaseline } from "@mui/material"
import { styled } from "@mui/system"
import { ThemeProvider } from '@material-ui/core'; 
import theme from '../styles/theme/theme';
import { register } from "../Redux/apiCalls";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
    const [firstname, setFirstname]= useState("")
    const [lastname, setLastname]= useState("")
    const [email, setEmail]= useState("")

    const navigate= useNavigate()

    // const dispatch= useDispatch()
    // const { isFetching, error }= useSelector(state=>state.user)

    const handleClick = (e) => {
        e.preventDefault()
        register({ firstname, lastname, username, email, password })
        navigate("/login")
    }
    return (
        <>
            <CssBaseline />
            <ThemeProvider theme={theme}>
                <Wrapper>
                    <Container>
                        <Title>
                            CREATE AN ACCOUNT
                        </Title>
                        <Form>
                            <Input placeholder="First Name" onChange={(e)=>setFirstname(e.target.value)}/>
                            <Input placeholder="Last Name" onChange={(e)=>setLastname(e.target.value)}/>
                            <Input placeholder="Username" onChange={(e)=>setUsername(e.target.value)}/>
                            <Input placeholder="E-Mail" onChange={(e)=>setEmail(e.target.value)}/>
                            <Input placeholder="Password"/>
                            <Input placeholder="Confirm Password" onChange={(e)=>setPassword(e.target.value)} />
                            <TermsandCondition>
                                By creating an account <b>PRIVACY POLICY</b>
                            </TermsandCondition>
                        </Form>
                        <ButtonDiv>
                            <SubmitButton variant="filled" onClick={handleClick} >REGISTER</SubmitButton>
                        </ButtonDiv>
                    </Container>
                </Wrapper>
            </ThemeProvider>
        </>
    )
}