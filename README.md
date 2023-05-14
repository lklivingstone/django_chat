### THE APPLICATION IS NOT YET DEPLOYED DUE TO THE ISSUES WITH AZURE SERVING ASGI REQUESTS. 

# Chat App

This is a Full Stack Chat Application. It is built with the aim of learning django for complex use cases, understanding and implementing websockets.

It is built with Django, Redis and DRF, and the client is built with React. 


## Table of content

* [Why](#why)
* [Project Description](#project-description)
* [Links](#links)


## Why

I wanted to build an app which implements websockets for real time communication between two clients, I have experience of building complex APIs using Node.js, but I wanted to build a more complex project using Django.

For this project, I have used the ReactJS for frontend.

For backend I have used Django for the previously sais reason. Other technology used are Django-channels and channel-redis.

Django-channels: I used it to allow me to handle real-time communication and background task processing. It lets the application have asynchronous messaging that facilitate communication between different parts of the application.

channel-redis: It is a library that provides a channel layer implementation using Redis as the backing store. Redis is an in-memory data structure store that can be used as a database, cache, and message broker. By using Redis as the channel layer backend, channel-redis enables reliable and scalable communication between different instances of your Django Channels application.

I took the help from many YouTube videos to learn the technologies, including many blogposts.

## Project Description

Django Channels is used to implementi real-time functionality using WebSockets which enables bidirectional communication between clients and the server, allowing for instant updates and interactive features in applications such as chat systems, real-time notifications, and collaborative tools. 

The app has an implementation of a ChatConsumer class, which serves as a WebSocket consumer in Django Channels. It enables real-time communication between clients and the server using WebSocket connections. The ChatConsumer class defines various methods to handle different WebSocket events, such as connecting, disconnecting, receiving messages, and sending messages to clients.

Upon establishing a WebSocket connection, the connect method is invoked. It retrieves the room name from the URL and adds the consumer to a specific group associated with that room. This allows the consumer to receive messages and interact with other clients in the same room. The accept method is then called to accept the WebSocket connection.

When a WebSocket connection is closed, the disconnect method is triggered. It removes the consumer from the group associated with the room, ensuring that the consumer no longer receives messages related to that room. This helps maintain the integrity of the communication.

Incoming messages from clients are processed in the receive method. The received JSON data is parsed to extract the command type. Based on the command, the corresponding method (e.g., fetch_messages or new_message) is invoked to handle the message appropriately. For example, the fetch_messages method retrieves the last 15 messages for a specific chat identified by the given chat ID. It converts the messages to JSON format and sends them back to the client.

The new_message method handles the creation of a new message. It receives the message content, identifies the user's contact, and creates a new Message object in the database. The message is then associated with the relevant chat by adding it to the chat's messages field. The method also sends the newly created message details to all connected clients, allowing them to receive the message in real-time.

The send_chat_message and send_message methods facilitate sending messages to clients. The former broadcasts the message to all clients in the specific group associated with the chat room, while the latter sends the message to the individual client who triggered the event. These methods utilize the async_to_sync function to ensure synchronous execution of the Channel layer's group send and individual send operations, respectively.


## Links

Link to the website: [link](https://textyyy.netlify.app/))

