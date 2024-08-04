import React, { useEffect, useState } from "react";

function UserInfo() {
  const [message, setMessage] = useState("Loading...");
  const [userAgent, setUserAgent] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:8080/api/index")
      .then((response) => response.json())
      .then((data) => {
        setMessage(data.message);
      })
      .catch((error) => {
        setError("Failed to load message.");
      });
  }, []);

  useEffect(() => {
    const userAgent = navigator.userAgent;
    setUserAgent(userAgent);
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (username && password) {
      fetch("http://127.0.0.1:8080/api/echo", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
          userAgent,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          setError("Error submitting the form.");
        });
    } else {
      setError("Please enter both username and password.");
    }
  };

  return (
    <div className="fade-in">
      <h1>{message}</h1>
      {error && <p className="error">{error}</p>}
      <p>User Agent: {userAgent}</p>

      <form onSubmit={handleSubmit} className="slide-in">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default UserInfo;
