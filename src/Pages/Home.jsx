import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useLocation } from "react-router-dom";
import Sidepanel from '../Components/Sidepanel';
import Chats from '../Components/Chats';
import Chatbox from '../Components/Chatbox';

const Home = () => {
    const token= useSelector((state)=>state.user.token)
    console.log(token)

    
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
                        display: "flex"
                    }}
                    >   
                        <h1>
                            This is a chat app..
                        </h1>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home