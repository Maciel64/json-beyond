import ReactDOM from "react-dom/client";

export function Popup() {
  return <h1>Olá do React na extensão!</h1>;
}

ReactDOM.createRoot(document.getElementById("root")!).render(<Popup />);
