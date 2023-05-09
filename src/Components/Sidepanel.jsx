import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './Components.css'

const Sidepanel = () => {
    const token= useSelector((state)=>state.user.user)
    // console.log(token)
    
    return (
        <div className="sidepanel">
            <div className='top'>
                <h1>1</h1>
                <h1>2</h1>
                <h1>3</h1>
            </div>
            <div className='bottom'>
                <h1>4</h1>
                <h1>5</h1>
            </div>
        </div>
    )
}

export default Sidepanel