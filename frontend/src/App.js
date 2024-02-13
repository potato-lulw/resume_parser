import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Navbar from "./components/navbar";


function App() {
  return (
    <div className="App bg-primary p-5 flex flex-col min-h-screen text-primary max-w-[100vw]">
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
