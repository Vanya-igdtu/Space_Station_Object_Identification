function Detection() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0a1020",
        color: "#d9f6ff",
        padding: "40px",
        fontFamily: "Orbitron, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <h3
          style={{
            color: "#00d9ff",
            letterSpacing: "4px",
            marginBottom: "10px",
          }}
        >
          ORBITAL SENTINEL / DETECTION REPORT
        </h3>

        <h1
          style={{
            fontSize: "3rem",
            marginBottom: "30px",
          }}
        >
          Payload Analysis
        </h1>

        <div
          style={{
            border: "1px solid rgba(0,217,255,0.3)",
            borderRadius: "16px",
            padding: "30px",
            background: "rgba(15,20,35,0.8)",
            boxShadow: "0 0 20px rgba(0,217,255,0.1)",
          }}
        >
          <h2 style={{ color: "#00d9ff" }}>
            Detection Results
          </h2>

          <p>No analysis available yet.</p>

          <div
            style={{
              marginTop: "20px",
              padding: "15px",
              borderRadius: "10px",
              background: "#111827",
            }}
          >
            <strong>Status:</strong> Awaiting AI detection data
          </div>
        </div>
      </div>
    </div>
  );
}

export default Detection;