import { Toaster } from "react-hot-toast";
import { CartProvider } from "./context/CartProvider";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import ErrorBoundary from "./ErrorBoundary";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ErrorBoundary>
        <CartProvider>
          <Toaster position="top-right" />
          <App />
        </CartProvider>
      </ErrorBoundary>
    </BrowserRouter>
  </React.StrictMode>
);