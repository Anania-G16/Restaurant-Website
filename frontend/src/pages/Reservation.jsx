import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ReservationForm from "../components/ReservationForm";

function Reservation() {
  return (
    <>
      <Navbar />

      <div style={{ padding: "80px 20px", textAlign: "center" }}>
        <h1>Reserve a Table</h1>
        <p>Please fill the form below to make a reservation.</p>

        <ReservationForm />
      </div>

      <Footer />
    </>
  );
}

export default Reservation;
