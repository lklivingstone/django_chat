import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useLocation } from "react-router-dom";
import Sidepanel from '../Components/Sidepanel';
import Chats from '../Components/Chats';
import Chatbox from '../Components/Chatbox';

const Home = () => {
    const username= useSelector((state)=>state.user.user.username)
    console.log(username)

    
    // const location= useLocation();
    // const room= location.pathname.split("/")[2];
    // console.log(room)
    const [roomName, setRoomName]= useState("")

    let navigate= useNavigate()

    const redirectRoom= () => {
        navigate(`/room/${roomName}`)
    }


    return (
        <div className="Chat">
            <Sidepanel />
            <Chats />
            <div className='join'>
                <div style={{
                    height: "100vh", 
                    width: "100%",
                    display: "flex",
                    flexDirection: "column"
                    }}>
                    <div
                        style={{
                        paddingTop: "70px",
                        padding: "20px",
                        flex: 1, 
                        width: "100%",
                        background: '#5cdb95',
                        color: "#031d3b",
                        display: "flex",
                        flexDirection: "column",
                        gap: "40px",
                    }}
                    >   
                        <h1>
                            Hi {username}! This is a chat app..
                        </h1>
                        <h4>Try clicking on the + button on the left</h4>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home