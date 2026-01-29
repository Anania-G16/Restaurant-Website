import { useState, useEffect } from "react";
import "../styles/gallery.css";
import { MOCK_GALLERY_DATA } from "./MockData";

function Gallery() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // When you have a backend, you'll replace this with: 
    // fetch('/api/gallery').then(res => res.json()).then(data => setImages(data))
    setImages(MOCK_GALLERY_DATA);
    setLoading(false);
  }, []);

  // Logic to split images into 3 columns for the masonry look
  const col1 = images.filter((_, idx) => idx % 3 === 0);
  const col2 = images.filter((_, idx) => idx % 3 === 1);
  const col3 = images.filter((_, idx) => idx % 3 === 2);

  if (loading) return <div className="loader">Loading Gallery...</div>;

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