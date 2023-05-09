import './Pages.css';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import WebSocketInstance from '../Websocket/Websocket';
import { useSelector } from 'react-redux';
import SendButton from '../Components/SendButton';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import DirectionsIcon from '@mui/icons-material/Directions';
import { Paper, InputBase  } from '@mui/material';

const { reverse } = Array;



const Chatbox = () => {

      // console.log(messages.length)
      const location= useLocation();
      const roomName= location.pathname.split("/")[2];
  
      const [chatLog, setChatLog] = useState('');
      const [messageInput, setMessageInput] = useState('');
      const [messageValue, setMessageValue]= useState('');
    
    const user = useSelector((state) => state.user.user.username);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const waitForSocketConnection = (callback) => {
        setTimeout(() => {
            if (WebSocketInstance.state() === 1) {
            console.log("Connection is secure");
            if (callback != null) {
                callback();
            }
            return;
            } else {
            console.log("Waiting for connection...");
            waitForSocketConnection(callback);
            }
        }, 100);
        };

    WebSocketInstance.addCallbacks(setMessagesCallback, addMessageCallback);
    waitForSocketConnection(() => {
      WebSocketInstance.fetchMessages(user);
    //   console.log(29, user);
    });
  }, [user]);

  const setMessagesCallback = (newMessages) => {
    setMessages((prevMessages) => [...newMessages.reverse(), ...prevMessages]);
  };

  const addMessageCallback = (message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  };

    // console.log(messages.length)

    const renderMessages = (messages) => {
        return (
          <ul style={{width: "100%"}}>
            {messages.map(message => (
              <li 
              style={{display: "flex",
                width: "100%",
                listStyleType: "none"}}
                key={message.id}>
                    <div className={message.author === user ? 'right' : 'left'}>
                        {message.content}
                    </div>
              </li>
            ))}
          </ul>
        );
      };

    



   
  
  
    const handleSendMessageClick = (event) => {
        if (messageInput.length==0) {
            return;
        }
        event.preventDefault()
        const messageObject= {
            content: messageInput,
            command: 'new_message',
            from: user 
        };
        // console.log(messageObject)
        setMessageValue('')
        setMessageInput('');
        WebSocketInstance.newChatMessage(messageObject)
    };

    const handleKeyDown = (e) => {
        if (e.code === "Enter") {
            handleSendMessageClick(e)
        }
      };
  

    const hangleMessageInput= (data) => {
      setMessageValue(data)
      setMessageInput(data)
      // console.log(messageValue, messageInput)
    }
  
    const messageInputField = (
        <input
            id="chat-message-input"
            type="text"
            size="100px"
            placeholder="Type..."
            value={messageValue}
            onChange={(e)=>hangleMessageInput(e.target.value)}
            onKeyDown={handleKeyDown}

        />
    );
  
    const sendMessageButton = (
        <input
            id="chat-message-submit"
            type="button"
            value="Send"
            onClick={(e)=>handleSendMessageClick(e)}
        />
    );

    const messagingField= (
      <Paper
          elevation={0} 
          variant="outlined" square
          component="form"
        sx={{borderColor: 'green', border: "1", backgroundColor: "transparent", borderRadius: "0",  display: 'flex', alignItems: 'center', width: "100%" }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1, variant:"outlined", }}
          placeholder="Search..."
          value={messageValue}
          onChange={(e)=>hangleMessageInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <IconButton type="button" sx={{ color: "green" }} aria-label="search">
          <SendOutlinedIcon onClick={(e)=>handleSendMessageClick(e)}/>
        </IconButton>
        
      </Paper>

  )
    
    return (
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
                    background: 'grey',
                    display: "flex",
                    // border: "1px solid black"
                }}
            >
                {renderMessages(messages)}
            </div>
            {/* <br /> */}
            {/* <br /> */}
            {/* <br /> */}
            <div style={{
              height: "60px",
              // position: "fixed",
              // bottom: '0',
              display:"flex",
              alignItems: "center",
              backgroundColor: "white"
            }}>
              {/* {messageInputField}
              {sendMessageButton} */}
              {messagingField}
            </div>
        </div>
    );
  }

export default Chatbox