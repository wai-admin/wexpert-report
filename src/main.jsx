import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./style/globals.css";
import "./style/print.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
