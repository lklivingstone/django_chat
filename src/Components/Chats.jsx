import { useState, useEffect } from 'react';
import { redirect, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import axios from 'axios';
import { fetchChats } from "../Redux/apiCalls";
import { useDispatch } from "react-redux";
import { changeChatID, changeRecipient } from "../Redux/userRedux"
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import './Components.css'

const Chats = () => {
    const user= useSelector((state)=>state.user)
    const username= user.user.username
    const token= user.token
    // 123, 123, 'ghi', 'abc', 'def', 'ghi', 'abc', 'def', 'ghi', 'abc', 'def', 'ghi', 
    const [chats, setChats]= useState([])
    const dispatch= useDispatch()
    const navigate= useNavigate()

    const handleClick = (e) => {
        // console.log(e)
        dispatch(changeChatID(e.id))
        const recipient= e.participants[0] === username ? e.participants[1] : e.participants[0] 
        dispatch(changeRecipient(recipient))
        navigate(`/chat/${e.id}`)
    }


    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetchChats(token, username)
            setChats(response)
            // console.log(response)
          } catch (error) {
            console.error(error);
          }
        };
    
        fetchData();
    }, []);
    

    const renderChats = (chats) => {
        return (
            <ul>
                {chats.length>0 && chats?.map(chat => (
                    // <Link to={`/chat/${chat.id}`}
                    // onClick={handleClick(chat.id)}
                    //         style={{
                    //         textDecoration: 'none',
                    //         color: 'black'
                    //     }}
                    // >
                        <li
                            className='each-chat-li'
                            style={{display: "flex",
                            flexDirection: "column",
                            justifyContent: "flex-end",
                            alignItems: "flex-end",
                            width: "100%",
                            listStyleType: "none"}}
                            key={chat.id}
                            >
                                <div
                                onClick={(e)=>handleClick(chat)}
                                className='each-chat-div'>
                                    <h1>
                                        <SentimentDissatisfiedIcon sx={{color: "#031d3b"}}/>
                                    </h1>
                                    <p
                                        style={{paddingLeft: "10px",
                                    color: "#031d3b"}}
                                    >
                                        {chat.participants[0]==username? chat.participants[1] : chat.participants[0]} and you
                                    </p>
                                </div>
                                <div className="divider"></div>
                        </li>
                    // </Link>
                ))}
            </ul>
        );
    };

    return (
        <div className="chats">
            {
                renderChats(chats)
            }
        </div>
    )
}

export default Chats