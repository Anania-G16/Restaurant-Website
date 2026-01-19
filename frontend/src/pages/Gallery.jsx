import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/gallery.css";

// Asset Imports - Grouping them by column as per your HTML structure
import img1 from "../assets/images/image_1.webp";
import img2 from "../assets/images/image_2.webp";
import img3 from "../assets/images/image_3.webp";
import img4 from "../assets/images/image_4.webp";
import img5 from "../assets/images/image_5.jpg";
import img6 from "../assets/images/image_6.jpg";
import img7 from "../assets/images/image_7.jpg";
import img8 from "../assets/images/image_8.webp";
import img9 from "../assets/images/image_9.jpg";
import img10 from "../assets/images/image_10.jpg";
import img11 from "../assets/images/image_11.jpg";
import img12 from "../assets/images/image_12.jpg";
import img13 from "../assets/images/image_13.jpg";
import img14 from "../assets/images/image_14.jpg";
import img15 from "../assets/images/image_15.jpg";
import img16 from "../assets/images/image_16.jpg";
import img17 from "../assets/images/image_17.jpg";
import img18 from "../assets/images/image_18.jpg";
import img19 from "../assets/images/image_19.jpg";
import img20 from "../assets/images/image_20.jpg";

// 1. Define image columns (Matching your HTML structure)
const COLUMN_ONE = [img1, img3, img5, img4, img16, img19, img2];
const COLUMN_TWO = [img6, img7, img8, img9, img10, img17, img15];
const COLUMN_THREE = [img11, img12, img7, img13, img14, img18, img20];

function Gallery() {
  return (
    <>
      <main>
        <section className="main-container">
          {/* Column 1 */}
          <div className="gallery-column">
            {COLUMN_ONE.map((src, index) => (
              <div key={`col1-${index}`}>
                <img
                  src={src}
                  alt="Gallery food or interior"
                  className="gallery-image"
                />
              </div>
            ))}
          </div>

          {/* Column 2 */}
          <div className="gallery-column">
            {COLUMN_TWO.map((src, index) => (
              <div key={`col2-${index}`}>
                <img
                  src={src}
                  alt="Gallery food or interior"
                  className="gallery-image"
                />
              </div>
            ))}
          </div>

          {/* Column 3 */}
          <div className="gallery-column">
            {COLUMN_THREE.map((src, index) => (
              <div key={`col3-${index}`}>
                <img
                  src={src}
                  alt="Gallery food or interior"
                  className="gallery-image"
                />
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default Gallery;