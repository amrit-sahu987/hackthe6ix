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
        setIpAddress(data.ip); // Store the IP address
      })
      .catch((error) => console.error("Error fetching IP address:", error));
  }, []); // This effect runs once on component mount

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    fetch("http://127.0.0.1:8080/api/echo", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
    .then((response) => response.json())
    // Handle response...
  };

  return (
    <div>
      <h1>{message}</h1>
      <p>User Agent: {userAgent}</p>
      <p>Your IP Address: {ipAddress}</p> {/* Display the IP address here */}
      {/* Rest of your component */}
    </div>
  );
}

export default index;