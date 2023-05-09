import { useState } from 'react';
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom"
import Chat from './Pages/Chat';
import Room from './Pages/Chatbox';
import { useSelector } from 'react-redux';
import { Login } from './Pages/Login';
import { Logout } from './Pages/Logout';

function App() {
  const user= useSelector((state)=>state.user.user)
  
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element= {<Chat />}  />
        <Route path="/room/:id" element= {<Room />} />
        <Route path="/login" element= {user ? <Navigate to="/" replace /> :  <Login />} />
        <Route path="/logout" element= {user ? <Logout /> : <Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
