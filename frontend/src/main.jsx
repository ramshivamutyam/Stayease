import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import Header from "./pages/header/Header.jsx";
import Footer from "./pages/footer/Footer.jsx";
import { BrowserRouter } from "react-router-dom";
import { AuthContext } from "./Contexts/AuthContext.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContext>
      <BrowserRouter>
        <Header />
        <App />
        <Footer />
      </BrowserRouter>
    </AuthContext>
  </React.StrictMode>
);