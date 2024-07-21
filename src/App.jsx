import React, { useEffect, useRef } from 'react';
import io from 'socket.io-client';
import './App.css';

const App = () => {
  const videoRef = useRef(null);
  let socket;

  useEffect(() => {
    socket = io('http://localhost:5000');

    socket.on('frame', (frame) => {
      if (videoRef.current) {
        videoRef.current.src = `data:image/jpeg;base64,${frame}`;
      }
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const startVirtualMouse = async () => {
    try {
      const response = await fetch('http://localhost:5000/start-virtual-mouse');
      const data = await response.json();
      alert(data.message);
    } catch (error) {
      console.error('Error starting virtual mouse:', error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">Mouse Hand Gesture Control</h1>
        <button className="App-button" onClick={startVirtualMouse}>Start Virtual Mouse</button>
        <img ref={videoRef} alt="Gesture Control Feed" className="App-video"/>
      </header>
    </div>
  );
};

export default App;
