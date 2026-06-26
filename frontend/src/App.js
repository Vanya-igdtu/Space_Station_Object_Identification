import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Upload from "./Upload";
import Home from "./Home";
import Detection from "./Detection";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/upload" element={<Upload />} />
	<Route path="/detection" element={<Detection />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;