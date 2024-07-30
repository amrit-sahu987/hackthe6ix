import React, { useEffect, useState } from 'react';
import axios from 'axios';

const IndexPage: React.FC = () => {
  const [ipAddress, setIpAddress] = useState('');
  const [userAgent, setUserAgent] = useState('');
  const [message, setMessage] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const fetchIpAddress = async () => {
      try {
        const response = await axios.post('/api/ipAddress');
        console.log('IP Address response:', response.data);
        setIpAddress(response.data.ip_address);
      } catch (error) {
        console.error('Error fetching IP address:', error);
      }
    };

    const fetchUserAgent = () => {
      setUserAgent(navigator.userAgent);
    };

    fetchIpAddress();
    fetchUserAgent();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div>
      <header className="App-header">
        <h1>Heading</h1>
      </header>

      <div>
        <p className="Text">User Agent: {userAgent}<br /></p>
        <p className="Text">Ip Address: {ipAddress}<br /></p>
        <p className="Text">{message}</p>
        <form onSubmit={handleSubmit} className="Text">
          <div>
            <input 
              type="text" 
              value={username} 
              onChange={e => setUsername(e.target.value)} 
              placeholder="Username" 
              className="App-input"/>
          </div>

          <div>
            <input 
              type="password" 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              placeholder="Password" 
              className="App-input" />
          </div>
          <div>  
            <button type="submit" disabled={!username || !password}>Sign In</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default IndexPage;