export function JsonWidget() {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        background: "#000",
        color: "#fff",
        textAlign: "center",
        padding: "10px",
        zIndex: 9999,
        fontFamily: "sans-serif",
      }}
    >
      Olá! Essa mensagem veio da extensão Chrome.
    </div>
  );
}
