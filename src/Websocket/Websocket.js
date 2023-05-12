class WebSocketService {

    static instance= null;
    callbacks= {};


    static getInstance() {
        if (!WebSocketService.instance) {
            WebSocketService.instance= new WebSocketService();
        }
        return WebSocketService.instance;
    }

    constructor() {
        this.socketRef= null;
    }

    connect(chatID) {
        const path= `ws://127.0.0.1:8000/ws/chat/${chatID}/`
        console.log(path)
        this.socketRef= new WebSocket(path)
        this.socketRef.onopen= () => {
            console.log("WebSocket open");
        }
        this.socketNewMessage(JSON.stringify({
            command: 'fetch_messages'
        }))
        this.socketRef.onmessage= e => {
            // console.log(e.data)
            this.socketNewMessage(e.data)
        }
        this.socketRef.onerror= e => {
            console.log(e);
        }
        this.socketRef.onclose= () => {
            console.log("WebSocket is closed");
            this.connect(chatID);
        }
    }

    socketNewMessage(data) {
        const parseData= JSON.parse(data);
        const command= parseData.command;
        // console.log(command)

        if (Object.keys(this.callbacks).length===0) {
            // console.log("return")
            return;
        }

        if (command === 'messages') {
            // console.log("fetch")
            this.callbacks[command](parseData.messages)
        }

        if (command === 'new_message') {
            // console.log("new")

            this.callbacks[command](parseData.message)
        }
    }

    fetchMessages(username, chatID) {
        // console.log("FETCH")
        this.sendMessage({ command: 'fetch_messages', username: username, chatID: chatID});
    }

    newChatMessage(message) {
        // console.log("NEW")
        this.sendMessage({ command: 'new_message', 
            from: message.from, 
            message: message.content,
            chatID: message.chatID
        });
    }

    addCallbacks(messagesCallback, newMessageCallback) {
        this.callbacks['messages']= messagesCallback;
        this.callbacks['new_message']= newMessageCallback;
    }

    sendMessage(data) {
        try{
            // console.log({...data})
            this.socketRef.send(JSON.stringify({...data}));
        } catch (err) {
            console.log(err.message);
        }
    }

    waitForSocketConnection(callback) {
        const socket= this.socketRef;
        const recursion= this.waitForSocketConnection;
        setTimeout(
            () => {
                if (socket.readyState === 1) {
                    console.log("Connection is secure")
                    if (callback != null) {
                        callback();
                    }
                    return; 
                }
                else {
                    console.log("Waiting for connection...")
                    recursion(callback)
                }
            }, 1
        )
    }

    state() {
        return this.socketRef.readyState
    }

}


const WebSocketInstance= WebSocketService.getInstance();

export default WebSocketInstance;