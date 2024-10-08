import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { StyledEngineProvider } from "@mui/material/styles";
import App from "./Dashboard";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import ProtectedRoutes from "./layouts/ProtectedRoutes";
import Login from "./pages/Login";
import AuthProvider from "./providers/Auth";
import ManageSim from "./pages/ManageSim";
import Home from "./pages/Home";

ReactDOM.createRoot(document.querySelector("#root")!).render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route element={<ProtectedRoutes />}>
              <Route
                path="/"
                element={<Navigate to="/dashboard/home" replace={true} />}
              />
              <Route path="/dashboard" element={<App />}>
                <Route path="home" index element={<Home />} />
                <Route path="manage-sim" element={<ManageSim />} />
              </Route>
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Navigate to="/" replace={true} />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </StyledEngineProvider>
  </React.StrictMode>
);
