import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Navbar from "./components/navbar";
import Jobs from "./pages/jobs";
import Login from "./pages/login";


function App() {
  return (
    <div className="App bg-primary p-5 flex flex-col min-h-screen text-primary max-w-[100vw]">
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Jobs" element={<Jobs />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
