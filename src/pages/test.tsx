import React from "react";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import authStore from "../stores/features/auth/authStore";

const Test = observer(() => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => authStore.login(email, password);
  const handleLogout = () => authStore.logout();

  return (
    <div>
      {authStore.isAuthenticated ? (
        <div>
          <p>Welcome, {authStore.user?.email}!</p>
          <button onClick={handleLogout} disabled={authStore.loading}>
            Logout
          </button>
        </div>
      ) : (
        <div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin} disabled={authStore.loading}>
            Login
          </button>
          {authStore.error && <p style={{ color: "red" }}>{authStore.error}</p>}
        </div>
      )}
    </div>
  );
});

export default Test;
