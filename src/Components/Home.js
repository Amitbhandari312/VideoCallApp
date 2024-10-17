import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './Home.css';

const Home = () => {
  const [value, setValue] = useState('');
  const navigate = useNavigate();

  const handleJoin = useCallback(() => {
    // Navigate to the room with the entered Room ID
    if (value) {
      navigate(`/room/${value}`);
    } else {
      alert('Please enter a Room ID');
    }
  }, [value, navigate]);

  return (
    <div className='home-container'>
      <div className='home-box'>
        <h1>Join a Room</h1>
        <input
          type="text"
          placeholder="Enter Room ID"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className='room-input'
        />
        <button className='join-btn' onClick={handleJoin}>Join</button>
      </div>
    </div>
  );
}

export default Home;
