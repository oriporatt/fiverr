// ImageCarousel.jsx
import { useState } from 'react';


export function GigPreviewCarrousel({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="gig-preview-carrousel">
      <div
        className="carousel-card"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((img, idx) => (
          <img key={idx} src={img} alt={`Image ${idx + 1}`} className="carousel-image" />
        ))}
      </div>

      <button className="carousel-button left" onClick={goToPrevious}>{'<'}</button>
      <button className="carousel-button right" onClick={goToNext}>{'>'}</button>
    </div>
  );
}
    