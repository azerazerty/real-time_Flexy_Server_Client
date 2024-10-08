import React from "react";
import { useEffect, useState } from "react";
import { createContext, useContext } from "react";

import { useProvideAuth } from "../hooks/useProvideAuth";

export const AuthContext = createContext(null);

function Auth({ children, ...props }) {
  const auth = useProvideAuth();
  const [user, setUser] = auth;
  useEffect(() => {
    if (!user) {
      const savedUser = JSON.parse(localStorage.getItem("user") || "{}");
      if (!savedUser || !savedUser?.username || !savedUser.authToken) {
        setUser({});
      } else {
        setUser(savedUser);
      }
    }
  }, [user]);
  if (!user) return <></>;
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
export default Auth;
