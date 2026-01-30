import { Routes, Route, Link } from "react-router-dom";

// Page Imports
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import About from "./pages/About";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import AdminLogin from "./pages/AdminLogin";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Cart from "./pages/Cart"; // Ensure this path is correct
import Register from "./pages/Register";

// Reservation & Admin Imports
import Reservation from "./pages/Reservation";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminMenu from "./pages/admin/AdminMenu";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminReservations from "./pages/admin/AdminReservations";
import AdminMessages from "./pages/admin/AdminMessages";

import "./App.css";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        {/* Main Page routing */}
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/about" element={<About />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/AdminLogin" element={<AdminLogin />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Fixed Cart Route - Path is case-sensitive depending on your NavLink */}
        <Route path="/cart" element={<Cart />} />

        {/* Reservation Route */}
        <Route path="/reservation" element={<Reservation />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="menu" element={<AdminMenu />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="reservations" element={<AdminReservations />} />
          <Route path="messages" element={<AdminMessages />} />
        </Route>

        {/* Catch-all 404 Route */}
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

      <Footer />
    </>
  );
}

export default App;