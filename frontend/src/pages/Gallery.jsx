import "../styles/gallery.css";

// Import assets
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

// Images as static array
const IMAGES = [
  { id: 1, src: img1, alt: "Gallery Image 1" },
  { id: 2, src: img2, alt: "Gallery Image 2" },
  { id: 3, src: img3, alt: "Gallery Image 3" },
  { id: 4, src: img4, alt: "Gallery Image 4" },
  { id: 5, src: img5, alt: "Gallery Image 5" },
  { id: 6, src: img6, alt: "Gallery Image 6" },
  { id: 7, src: img7, alt: "Gallery Image 7" },
  { id: 8, src: img8, alt: "Gallery Image 8" },
  { id: 9, src: img9, alt: "Gallery Image 9" },
  { id: 10, src: img10, alt: "Gallery Image 10" },
  { id: 11, src: img11, alt: "Gallery Image 11" },
  { id: 12, src: img12, alt: "Gallery Image 12" },
  { id: 13, src: img13, alt: "Gallery Image 13" },
  { id: 14, src: img14, alt: "Gallery Image 14" },
  { id: 15, src: img15, alt: "Gallery Image 15" },
  { id: 16, src: img16, alt: "Gallery Image 16" },
  { id: 17, src: img17, alt: "Gallery Image 17" },
  { id: 18, src: img18, alt: "Gallery Image 18" },
];

function Gallery() {
  // Logic to split images into 3 columns
  const col1 = IMAGES.filter((_, idx) => idx % 3 === 0);
  const col2 = IMAGES.filter((_, idx) => idx % 3 === 1);
  const col3 = IMAGES.filter((_, idx) => idx % 3 === 2);

  return (
    <>
      <main className="gallery-main">
        <section className="main-container">
          {/* Column 1 */}
          <div className="gallery-column">
            {col1.map((img) => (
              <div key={img.id}>
                <img src={img.src} alt={img.alt} className="gallery-image" />
              </div>
            ))}
          </div>

          {/* Column 2 */}
          <div className="gallery-column">
            {col2.map((img) => (
              <div key={img.id}>
                <img src={img.src} alt={img.alt} className="gallery-image" />
              </div>
            ))}
          </div>

          {/* Column 3 */}
          <div className="gallery-column">
            {col3.map((img) => (
              <div key={img.id}>
                <img src={img.src} alt={img.alt} className="gallery-image" />
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}

export default Gallery;
