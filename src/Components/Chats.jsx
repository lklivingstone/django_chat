import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import './Components.css'

const Chats = () => {
    const token= useSelector((state)=>state.user.user)
    // console.log(token)

    const [chats, useChats]= useState([123, 123, 'ghi', 'abc', 'def', 'ghi', 'abc', 'def', 'ghi', 'abc', 'def', 'ghi', ])


    const renderChats = (chats) => {
        return (
            <ul>
                {chats.map(chat => (
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
                        <div className='each-chat-div'>
                            <h2>im</h2>
                            <p
                                style={{paddingLeft: "10px"}}
                            >
                                {chat}
                            </p>
                        </div>
                        <div className="divider"></div>
                </li>
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