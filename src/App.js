import { useState } from 'react';
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom"
import Chat from './Pages/Chat';
import { useSelector } from 'react-redux';
import { Login } from './Pages/Login';
import { Logout } from './Pages/Logout';
import Home from './Pages/Home';
import { Register } from './Pages/Register';

function App() {
  const user= useSelector((state)=>state.user.user)
  
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element= { user ? <Home /> : <Navigate to="/login" replace/>} />
        <Route path="/chat/:id" element= {<Chat />} />
        <Route path="/login" element= {user ? <Navigate to="/" replace /> :  <Login />} />
        <Route path="/logout" element= {user ? <Logout /> : <Navigate to="/" replace />} />
        <Route path="/register" element= {user ?<Navigate to="/" replace /> :  <Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
