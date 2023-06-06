import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSuccessful, setIsSuccessful] = useState(false);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = () => {
    const basicAuth = btoa(`${username}:${password}`);

    axios
      .get("http://localhost:8080/v1/users", {
        headers: {
          Authorization: `Basic ${basicAuth}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setIsSuccessful(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (isSuccessful) {
    return (
      <div>
        <h2>Login</h2>
        <p>You have successfully logged in!</p>
        <Link to="/users">Go to Users</Link>
      </div>
    );
  }

  return (
    <div>
      <h2>Login</h2>
      <div>
        <label>Username:</label>
        <input type="text" value={username} onChange={handleUsernameChange} />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" value={password} onChange={handlePasswordChange} />
      </div>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default LoginPage;
