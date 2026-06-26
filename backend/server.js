const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// LOGIN
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (email === "admin@gmail.com" && password === "1234") {
    return res.json({
      success: true,
      message: "Login successful",
    });
  }

  return res.json({
    success: false,
    message: "Invalid credentials",
  });
});

// UPLOAD
app.post("/upload", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.json({
      success: false,
      message: "No file uploaded",
    });
  }

  console.log("Uploaded:", req.file.filename);

  return res.json({
    success: true,
    filename: req.file.filename,
  });
});

app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});
app.get("/test", (req, res) => {
  res.send("UPLOAD SERVER VERSION");
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});