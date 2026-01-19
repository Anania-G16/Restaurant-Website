import { Routes, Route, Link } from "react-router-dom";

// Page Imports
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import About from "./pages/About";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import Navbar from "./components/Navbar";
import "./App.css";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        // Main Page routing
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/about" element={<About />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contact" element={<Contact />} />
        //Page not found route
        <Route
          path="*"
          element={
            <div style={{ textAlign: "center", padding: "100px" }}>
              <h1>404</h1>
              <p>Page Not Found - Return to YEA Restaurant</p>
              <Link to="/">Go Home</Link>
            </div>
          }
        />
      </Routes>
    </>
  );
}

export default App;
