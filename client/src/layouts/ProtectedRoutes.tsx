import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../providers/Auth";

function ProtectedRoutes() {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login"></Navigate>;
  }
  return <Outlet />;
}

export default ProtectedRoutes;
