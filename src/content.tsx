import ReactDOM from "react-dom/client";
import App from "./App";

console.log("🚀 Content script injetado na página:", window.location.href);

const container = document.createElement("div");
document.body.appendChild(container);

const root = ReactDOM.createRoot(container);
root.render(<App />);
