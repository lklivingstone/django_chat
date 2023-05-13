import './Chatbox.css';
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



const Chatbox = ({name}) => {
    const ID= useSelector((state)=>state.user.chatID)
    const recipient= useSelector((state)=>state.user.recipient)
    const [messageInput, setMessageInput] = useState('');
    const [messageValue, setMessageValue]= useState('');
    
    const username = useSelector((state) => state.user.user.username);
    const [messages, setMessages] = useState([]);
    const messagesEndRef = useRef(null)

    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView()
    }

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
            WebSocketInstance.fetchMessages(username, ID);
        });
        WebSocketInstance.connect(ID)
    }, [ID]);

    useEffect(() => {
        scrollToBottom()
    }, [messages]);

    const setMessagesCallback = (newMessages) => {
        setMessages((prevMessages) => [...newMessages.reverse()]);
    };

    const addMessageCallback = (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
    };


    const renderMessages = (messages) => {
        return (
          <ul style={{width: "100%"}}>
            {messages.map(message => (
                <li
                className={message.author === username ? 'right' : 'left'} 
                style={{display: "flex",
                marginBottom: "15px",
                listStyleType: "none",
                justifyContent: message.author === username ? "flex-end" : 'flex-start'
                }}
                key={message.id}>
                        
                    <Paper variant="outlined" 
                    style={{padding: "5px 30px", fontWeight: "600"}}
                    sx={{backgroundColor: "transparent", border: "1px solid #edf5e1" }}
                    >
                            {message.content}

                    </Paper>
                        {/* </p>
                    </div> */}
              </li>
            ))}
            <div ref={messagesEndRef} />
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
            from: username,
            chatID: ID
        };
        
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
        sx={{border: "0", backgroundColor: "#031d3b", borderRadius: "250px",  display: 'flex', alignItems: 'center', justifyContent: "center", width: "98%" }}
        // sx={{borderColor: 'green', border: "1", backgroundColor: "transparent", borderRadius: "250px",  display: 'flex', alignItems: 'center', width: "100%" }}
      
      >
        <InputBase
          sx={{ ml: 1, flex: 1, variant:"outlined", color: "#edf5e1", paddingLeft: "10px"}}
          placeholder="type..."
          value={messageValue}
          onChange={(e)=>hangleMessageInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <IconButton type="button" sx={{ color: "#2c527d" }} aria-label="search">
          <SendOutlinedIcon onClick={(e)=>handleSendMessageClick(e)}/>
        </IconButton>
        
      </Paper>

  )
    
    return (
        <div style={{
          height: "100vh", 
          width: "100%",
          paddingTop: "70px",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#5cdb95"
        }}>
            <div style={{
                height: "70px",
                padding: "0px",
                position: "fixed",
                top: 0,
                backgroundColor: "#5cdb95",
                color: "#031d3b",
                borderBottom: "3px solid  #05386b",
                width: "100%",
                display: "flex",
                alignItems: "center",
                paddingLeft: "30px"
            }}>
                <h1>{recipient}</h1>
            </div>
            <div
                style={{
                    padding: "20px",
                    flex: 1, 
                    width: "100%",
                    display: "flex",
                    overflowY: "auto"
                }}
            >
                {renderMessages(messages)}
            </div>
            <div style={{
              height: "60px",
              // position: "fixed",
              // bottom: '0',
              display:"flex",
              alignItems: "center",
              backgroundColor: "#5cdb95"
            }}>
              {/* {messageInputField}
              {sendMessageButton} */}
              {messagingField}
            </div>
        </div>
    );
  }

export default Chatbox