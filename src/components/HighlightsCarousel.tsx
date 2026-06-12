"use client";

import { useState, useEffect } from 'react';
import styles from './HighlightsCarousel.module.css';

const images = [
  { src: '/preview.png', alt: 'Dashboard Overview' },
  { src: '/Screenshot (33).png', alt: 'Smart Prioritization Board' },
  { src: '/Screenshot (34).png', alt: 'Deadline Tracking Panel' },
  { src: '/Screenshot (35).png', alt: 'Task Analytics View' },
];

export default function HighlightsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isHovered]);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <div 
      className={`${styles.carouselContainer} glass-panel`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label="Product screenshots showcase"
    >
      {/* Viewport for clipping slides */}
      <div className={styles.viewport}>
        <div 
          className={styles.slider} 
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((image, index) => (
            <div key={index} className={styles.slide}>
              <img 
                src={image.src} 
                alt={image.alt} 
                className={styles.image}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = `https://via.placeholder.com/1000x625/1e293b/6366f1?text=${encodeURIComponent(image.alt)}`;
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      <button 
        className={`${styles.navButton} ${styles.prevButton}`} 
        onClick={handlePrev}
        aria-label="Previous slide"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>

      <button 
        className={`${styles.navButton} ${styles.nextButton}`} 
        onClick={handleNext}
        aria-label="Next slide"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>

      {/* Pagination Indicators */}
      <div className={styles.pagination}>
        {images.map((_, index) => (
          <button
            key={index}
            className={`${styles.dot} ${index === currentIndex ? styles.activeDot : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              setCurrentIndex(index);
            }}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
