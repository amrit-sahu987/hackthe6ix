import React, { useEffect, useState } from "react";

function index() {
  const [message, setMessage] = useState("Loading");
  const [userAgent, setUserAgent] = useState(""); 
  const [ipAddress, setIpAddress] = useState(""); // Add state for IP address

  useEffect(() => {
    fetch("http://127.0.0.1:8080/api/home")
    .then((response) => response.json())
    .then((data) => {
      setMessage(data.message);
    });
  }, []);

  useEffect(() => {
    const userAgent = navigator.userAgent;
    setUserAgent(userAgent); 
  }, []);

  useEffect(() => {
    // Fetch the user's IP address
    fetch("https://api.ipify.org?format=json")
      .then((response) => response.json())
      .then((data) => {
        setIpAddress(data.ip);
      })
      .catch((error) => console.error("Error fetching IP address:", error));
  }, []); 

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    fetch("http://127.0.0.1:8080/api/echo", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
        ipAddress, 
        userAgent
      }),
    })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  };

return (
  <div className="App">
    <header className="App-header">
      <h1>Cloaked Website</h1>
    </header>

    <div>
      <h1>{message}</h1>
      <p>User Agent: {userAgent}</p>
      <p>Your IP Address: {ipAddress}</p>
    </div>

    <div>
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
}

export default index;