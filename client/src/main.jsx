import React from "react";

import ReactDOM from "react-dom/client";

import { BrowserRouter } from "react-router-dom";

import { Toaster } from "react-hot-toast";

import App from "./App";

import { AuthProvider } from "./context/AuthContext";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>

      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#111",

            color: "#fff",

            border: "1px solid rgba(255,255,255,0.1)",
          },
        }}
      />
    </AuthProvider>
  </React.StrictMode>,
);
