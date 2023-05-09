import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logOut } from "../Redux/userRedux";

// const Wrapper = styled("div")({
//     width: "100%",
//     height: "100vh",
//     backgroundImage: "linear-gradient(to top, rgb(200, 207, 227, 0.5), rgba(200, 207, 227, 1))",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
// })

// const Container = styled("div")(({theme})=>({
//     width: "50%",
//     [theme.breakpoints.down("sm")] : {
//         width: "70%"
//     },
//     padding: "20px",
//     backgroundColor: "white",
//     // display: "flex",
//     // flexDirection: "column",
// }))

// const Form = styled("form")({
//     display: "flex",
//     // flexWrap: "wrap",
//     flexDirection: "column"
// })

// const Title = styled("h1")({
//     margin: "10px 10px",
//     fontWeight: "200",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center"
// })

// const Input = styled("input")({
//     flex: "1",
//     minWidth: "40%",
//     margin: "10px 10px",
//     padding: "10px",

// })

// const TermsandCondition = styled("span")({
//     fontSize: "12px",
//     margin: "10px 10px",
// })

// // export const productAddToCart = styled(Button)(({show, theme}) => ({
// //     width: "120px",
// //     fontSize: "12px",
// //     [theme.breakpoints.up("md")]: {
// //         position: "absolute",
// //         bottom: "2%",
// //         width: "300px",
// //         padding: "10px 5px",
// //         animation:
// //             show && `${slideTop} 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both`,
// //     },
// //     backgroundColor: Colors.secondary,
// //     opacity: 0.9,
// // }));

// const SubmitButton = styled(Button)(({disabled}) => ({
//     padding: "10px 65px",
//     border: "none",
//     cursor: "pointer",
//     backgroundColor: "#e1e6f5",
//     // "&:hover": {
//     //     opacity: 1,
//     //     backgroundColor: Colors.light_gray
//     // }
//     "&:disabled" : {
//         color: "#e1e6f5",
//         cursor: "not-allowed"
//     }
// }))

// const ButtonDiv = styled("div")({
//     display:"flex",
//     alignItems: "center",
//     justifyContent: "center",
//     margin: "10px 0px 0px 0px"
// })

// const Link = styled("a")({
//     margin: "5px 10px",
//     fontSize: "12px",
//     textDecoration: "underline"
// })

// const Error = styled("span")({
//     color: "red"
// })


export const Logout = () => {
    const user= useSelector(state=> state.user.user)
    const dispatch= useDispatch()

    const navigate= useNavigate()

    const handleClick = (e) => {
        dispatch(logOut())

        navigate("/")
    }

    return (
                <div>
                    <div>
                        <h1>
                            Hi {user.username}, do you want to logout?
                        </h1>
                            <div>
                                <button variant="filled" onClick={handleClick}>Logout</button>
                            </div>
                    </div>
                </div>
    )
}