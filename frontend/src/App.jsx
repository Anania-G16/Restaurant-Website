import { BrowserRouter, Routes, Route } from "react-router-dom";

// Page Imports
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import About from "./pages/About";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import "./App.css";

// Global Styles (Optional, if you have a main index.css)

function App() {
  return (
    <BrowserRouter>
      {/* Note: We removed Navbar/Footer from here because 
        we added them directly into each Page component 
        for more control over 'active' states and layouts.
      */}
      <Routes>
        {/* Main Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/gallery" element={<Gallery/>} />
        <Route path="/contact" element={<Contact/>} />

        {/* 404 Fallback - Optional but recommended */}
        <Route 
          path="*" 
          element={
            <div style={{ textAlign: 'center', padding: '100px' }}>
              <h1>404</h1>
              <p>Page Not Found - Return to YEA Restaurant</p>
              <a href="/">Go Home</a>
            </div>
          } 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;