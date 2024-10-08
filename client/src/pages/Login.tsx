import React, { useEffect } from "react";
import { useAuth } from "../providers/Auth";
import { Navigate } from "react-router-dom";

function Login() {
  const [user, setUser] = useAuth();
  if (user && user?.username && user?.authToken) {
    return <Navigate to="/home"></Navigate>;
  }

  useEffect(() => {
    if (!user || !user?.username || !user?.authToken) {
      setUser({
        username: "test",
        authToken: "ej6df45sex0xo",
      });
    }
  }, []);

  return <></>;
}

export default Login;
