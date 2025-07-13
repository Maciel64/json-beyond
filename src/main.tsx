import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { JsonHistoryProvider } from "./contexts/json-history-context";

const container = document.getElementById("root")!;
const root = ReactDOM.createRoot(container);
root.render(
  <React.StrictMode>
    <JsonHistoryProvider>
      <App />
    </JsonHistoryProvider>
  </React.StrictMode>
);
