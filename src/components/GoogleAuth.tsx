import React, { useState } from "react";
import { loginWithGoogle, logout, } from "@/app/firebase";

const GoogleAuth: React.FC = () => {
  const [user, setUser] = useState<any>(null);

  const handleLogin = async () => {
    const loggedInUser = await loginWithGoogle();
    if (loggedInUser) {
      setUser(loggedInUser);
      localStorage.setItem("user", JSON.stringify(loggedInUser));
    }
  };

  const handleLogout = () => {
    logout();
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <div>
      {user ? (
        <div>
          <p>Welcome, {user.displayName}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <button onClick={handleLogin}>Login with Google</button>
      )}
    </div>
  );
};

export default GoogleAuth;
