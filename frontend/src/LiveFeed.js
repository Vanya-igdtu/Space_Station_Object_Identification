
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

function LiveFeed() {

  const navigate = useNavigate();
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const canvasRef = useRef(null);

  const [cameraOn, setCameraOn] = useState(false);
  
  async function startCamera() {

    const stream = await navigator.mediaDevices.getUserMedia({
        video: true
    });

    streamRef.current = stream;

    videoRef.current.srcObject = stream;

    setCameraOn(true);
  }
useEffect(() => {

    return () => {

        if (streamRef.current) {

            streamRef.current.getTracks().forEach(track => track.stop());

        }

    };

}, []);

  
  function stopCamera() {

    if (streamRef.current) {

        streamRef.current.getTracks().forEach(track => track.stop());

        streamRef.current = null;

        videoRef.current.srcObject = null;
    }

    setCameraOn(false);
  }

async function captureAndAnalyze() {

  console.log("Capture button clicked");
  const canvas = canvasRef.current;
  const video = videoRef.current;

  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  const ctx = canvas.getContext("2d");

  ctx.drawImage(video, 0, 0);

  canvas.toBlob(async (blob) => {
    console.log(blob);

    const formData = new FormData();

    formData.append(
      "image",
      blob,
      "camera_capture.jpg"
    );
	console.log("Sending image to backend...");
    const response = await fetch(
      "http://localhost:5000/upload",
      {
        method: "POST",
        body: formData,
      }
    );
	console.log(response);

    const data = await response.json();
    console.log(data);

    if (data.success) {

  	localStorage.setItem(
    	"latestPrediction",
    	JSON.stringify(data)
  	);

  	stopCamera();
	console.log("Navigating to Detection page...");

  	navigate("/detection", {
    	state: data,
  	});

}

  }, "image/jpeg");

}



  return (

    <div
      style={{
        padding: 40,
        color: "#d9f6ff",
        minHeight: "100vh",
        background: "#08111f",
      }}
    >

      <h1>Live Camera Feed</h1>

      <video
        ref={videoRef}
        autoPlay
        playsInline
        style={{
          width: "720px",
          borderRadius: "18px",
          border: "2px solid #00d9ff",
        }}
      />
	<canvas
  	ref={canvasRef}
  	style={{ display: "none" }}
	/>

      <br /><br />

      <div
  style={{
    display: "flex",
    gap: "20px",
    marginTop: "25px",
  }}
>
  <button
    onClick={startCamera}
    disabled={cameraOn}
    style={{
      padding: "14px 28px",
      border: "none",
      borderRadius: "10px",
      cursor: cameraOn ? "not-allowed" : "pointer",
      background: cameraOn ? "#374151" : "#00d9ff",
      color: "#08111f",
      fontWeight: "bold",
      fontSize: "15px",
    }}
  >
    📷 Start Camera
  </button>

  <button
    onClick={stopCamera}
    disabled={!cameraOn}
    style={{
      padding: "14px 28px",
      border: "none",
      borderRadius: "10px",
      cursor: !cameraOn ? "not-allowed" : "pointer",
      background: !cameraOn ? "#374151" : "#ef4444",
      color: "white",
      fontWeight: "bold",
      fontSize: "15px",
    }}
  >
    ⏹ Stop Camera
  </button>

  <button
  onClick={captureAndAnalyze}
  disabled={!cameraOn}
  style={{
    marginTop: "25px",
    padding: "14px 32px",
    borderRadius: "10px",
    border: "none",
    background: "#22c55e",
    color: "white",
    cursor: cameraOn ? "pointer" : "not-allowed",
    fontWeight: "bold",
    fontSize: "15px",
  }}
>
  📸 Capture & Analyze
</button>

</div>

    </div>

  );

}

export default LiveFeed;