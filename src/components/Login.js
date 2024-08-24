import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Login() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user is authenticated
    axios.get('/auth/discord').then(response => {
      if (response.data.user) {
        setUser(response.data.user);
      }
    });
  }, []);

  const handleDiscordLogin = () => {
    window.location.href = `https://discord.com/api/oauth2/authorize?client_id=YOUR_CLIENT_ID&redirect_uri=YOUR_REDIRECT_URI&response_type=code&scope=identify`;
  };

  return (
    <div className="login-container">
      {user ? (
        <div>
          <h2>Welcome, {user.username}</h2>
          <a href="/moderation-queue">Go to Moderation Queue</a>
        </div>
      ) : (
        <button onClick={handleDiscordLogin}>Login with Discord</button>
      )}
    </div>
  );
}

export default Login;
